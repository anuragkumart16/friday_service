import { Request, Response } from "express";

import { quickAgent } from "../agents/quickAgent/graph";

export async function chatController(
    req: Request,
    res: Response
) {
    const { message } = req.body;

    const result = await quickAgent.invoke({
        messages: [
            {
                role: "user",
                content: message,
            },
        ],
    });

    const lastMessage = result.messages[result.messages.length - 1];

    res.json({
        response: lastMessage?.content ?? "",
    });
}