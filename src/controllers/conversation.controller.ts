import ApiResponse from "./../utils/response.util"
import { Request, Response } from "express"
import prisma from "../db/prismaClient"

export async function getAllCoversations(req: Request, res: Response) {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;
    const conversations = await prisma.conversation.findMany({
        orderBy: {
            updatedAt: "desc",
        },
        skip: (page - 1) * limit,
        take: limit,
    })
    return ApiResponse(res, 200, "Conversations fetched successfully!", conversations);
}

export async function loadMessages(req: Request, res: Response) {
    const conversationId = req.params.conversationId as string
    if (!conversationId) return ApiResponse(res,400,"ConversationID is required!")
    const messages = await prisma.message.findMany({
        where: {
            conversationId
        },
        orderBy: {
            createdAt: "asc"
        }
    })
    return ApiResponse(res, 200, "Messages fetched successfully!",messages);
}