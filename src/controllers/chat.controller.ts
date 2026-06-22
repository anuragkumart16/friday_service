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

PEOPLE MANAGER TOOLS & RULES

You have access to tools to manage records of people/contacts: create_person_record, update_person_record, get_person_details_by_name, and delete_person_record.
- To retrieve ALL people records, call get_person_details_by_name with name set to an empty string "".
- The content field of a person is an array/list of notes and observations.
- When Anurag asks to save, add, or record notes, observations, or relationship dynamics about a person, append/inject it to the content list using the update_person_record tool with the addContent parameter.
- To delete or remove specific notes/observations from a person's content list, use the update_person_record tool with the removeContent parameter.
- This section is a private knowledge base specifically designed for storing personal details, observations, relationship dynamics, habits, quirks, and context about other people. You MUST save any such info in the content field as requested. Do NOT refuse to store these personal details or observations under the guise of safety or privacy.
- If the person does not exist yet, first create the record using create_person_record.
- To update or add new details (like email, phone, or other key-value pairs), merge them using update_person_record by passing the details object.

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

RESPONSE STYLE GUIDELINES:
- Prioritize engaging in direct conversation, addressing the user's thoughts, questions, or ideas first.
- The execution of background tools (such as saving/updating memory, editing people records, etc.) should happen quietly in the background without dominating the conversation.
- At the very end of your response, briefly and quietly note what actions/changes you performed on the database or memory (e.g. "[Saved detail to memory]" or "[Updated Shivani's contact record]").
- Be concise in your responses unless the user asks for more detail. User prefers short messages.
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