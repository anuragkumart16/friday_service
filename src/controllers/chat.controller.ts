import { Request, Response } from "express";
import prisma from "../db/prismaClient";
import { quickAgent } from "../agents/quickAgent/graph";
import { SystemMessage } from "@langchain/core/messages";

export async function chatController(
    req: Request,
    res: Response
) {
    const { message, conversationId } = req.body;

    let conversation
    if (!conversationId) {
        conversation = await prisma.conversation.create({
            data: {
                title: message,
                lastMessageAt: new Date(),
                messages: {
                    create: {
                        role: "USER",
                        content: message,
                    }
                }
            },
            include: {
                messages: true,
                memories: true
            }
        })
    } else {
        conversation = await prisma.conversation.update({
            where: {
                id: conversationId
            },
            data: {
                lastMessageAt: new Date(),
                messages: {
                    create: {
                        role: "USER",
                        content: message
                    }
                }
            },
            include: {
                messages: {
                    orderBy: {
                        createdAt: "asc"
                    }
                },
                memories: true
            }
        });
    }

    if (!conversation) throw new Error("Error finding conversation!")

    const history = conversation.messages
        .filter(msg => msg.content.trim() !== "")
        .map((msg) => ({
            role: msg.role.toLowerCase(),
            content: msg.content,
        }));

    const userMemory = await prisma.personalMemories.findMany();
    const userMemoryStrings = userMemory.map((memory) => `- [ID: ${memory.id}] ${memory.content}`);

    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timeZone: 'Asia/Kolkata'
    });
    const formattedTime = currentDate.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: true,
        timeZone: 'Asia/Kolkata'
    });

    const systemPrompt = `You are Friday, Anurag's personal AI assistant.

Current Date and Day (IST):
${formattedDate}
Current Time (IST):
${formattedTime}

Conversation ID:
${conversation.id}

PERSONAL MEMORIES:
${userMemoryStrings.join("\n")}

CONVERSATION MEMORIES:
${conversation.memories.map(m => `- [ID: ${m.id}] ${m.content}`).join("\n")}

You have access to memory tools.

Use delete_personal_memory to delete cross-conversation personal memories when the user asks to forget, delete, or correct a personal memory. Use the specific ID listed in the PERSONAL MEMORIES list (e.g. delete_personal_memory({ id: "..." })).

Use delete_conversation_memory to delete memories scoped to the current conversation when the user asks to forget, delete, or correct a conversation memory. Use the specific ID listed in the CONVERSATION MEMORIES list (e.g. delete_conversation_memory({ id: "..." })).

MEMORY CLASSIFICATION RULES

Use save_personal_memory when the information is about Anurag and should be remembered across all future conversations.

Examples:

* User's name is Anurag.
* User prefers to be called Boss.
* User wants to become a tech founder.
* User is building Friday.
* User prefers React Native.
* User uses a MacBook M3.

Use save_conversation_memory when the information is specific to the current conversation, project, or discussion and may be useful later in this conversation.

Examples:

* Friday uses MongoDB for memory storage.
* Email agent uses Resend.
* Project will use LangGraph.
* Memory architecture contains PersonalMemories and ConversationMemories.

Do NOT save:

* Greetings.
* Small talk.
* Questions by themselves.
* Temporary discussion points.
* Information with little future value.

Bad memories:

* User said hello.
* User asked about their name.
* Introduction.
* User asked what tools are available.

Memory Saving Checklist
1. Is this explicitly stated by the user?
2. Will this matter in a month?
3. Is this a fact rather than an opinion?
4. Does a similar memory already exist?

When information clearly qualifies as a memory, save it immediately using the appropriate tool. Do not ask for confirmation before saving.
Only save information explicitly provided by the user.

Do not infer new facts about the user.

Do not save compliments, opinions, observations,
or conclusions unless explicitly stated by the user.

Be concise in your responses unless the user asks for more detail. User prefers short messages.
`;

    const result = await quickAgent.invoke({
        messages: [
            new SystemMessage(systemPrompt),
            ...history
        ],
    });

    const lastMessage = [...result.messages]
        .reverse()
        .find(m => m._getType() === "ai" && typeof m.content === "string" && m.content.trim() !== "")
        ?? result.messages[result.messages.length - 1];

    await prisma.conversation.update({
        where: {
            id: conversation.id
        },
        data: {
            lastMessageAt: new Date(),
            messages: {
                create: {
                    role: "ASSISTANT",
                    content: lastMessage.content as string
                }
            }
        }
    })

    res.json({
        conversationId: conversation.id,
        response: lastMessage?.content,
    });
}