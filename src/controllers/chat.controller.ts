import { Request, Response } from "express";
import prisma from "../db/prismaClient";
import { quickAgent } from "../agents/quickAgent/graph";

export async function chatController(
    req: Request,
    res: Response
) {
    const { message, conversationId } = req.body;

    let conversation

    if (!conversationId) {
        conversation = await prisma.conversation.create({
            data: {
                messages: {
                    create: {
                        role: "USER",
                        content: message,
                    }
                }
            },
            include: {
                messages: true
            }
        })
    } else {
        conversation = await prisma.conversation.update({
            where: {
                id: conversationId
            },
            data: {
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
                }
            }
        });
    }

    if (!conversation) throw new Error("Error finding conversation!")

    const history = conversation.messages.map((msg) => ({
        role: msg.role.toLowerCase(),
        content: msg.content,
    }));


    const result = await quickAgent.invoke({
        messages: [
            ...history
        ],
    });

    const lastMessage = result.messages[result.messages.length - 1];

    await prisma.conversation.update({
        where: {
            id: conversation.id
        },
        data: {
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