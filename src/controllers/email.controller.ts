import { Request, Response } from "express";
import prisma from "../db/prismaClient";
import { emailAgent } from "../agents/emailAgent/graph";
import { SystemMessage } from "@langchain/core/messages";

export async function emailChatController(
  req: Request,
  res: Response
) {
  const { message, conversationId } = req.body;

  let conversation;
  if (!conversationId) {
    conversation = await prisma.conversation.create({
      data: {
        title: message || "Email Query",
        lastMessageAt: new Date(),
        messages: {
          create: {
            role: "USER",
            content: message,
          },
        },
      },
      include: {
        messages: true,
        memories: true,
      },
    });
  } else {
    conversation = await prisma.conversation.update({
      where: {
        id: conversationId,
      },
      data: {
        lastMessageAt: new Date(),
        messages: {
          create: {
            role: "USER",
            content: message,
          },
        },
      },
      include: {
        messages: {
          orderBy: {
            createdAt: "asc",
          },
        },
        memories: true,
      },
    });
  }

  if (!conversation) throw new Error("Error finding or creating conversation!");

  const history = conversation.messages
    .filter((msg) => msg.content.trim() !== "")
    .map((msg) => ({
      role: msg.role.toLowerCase(),
      content: msg.content,
    }));

  const systemPrompt = `You are Friday's Email Agent, specialized in managing Anurag's emails.

You have access to the following Gmail API tools:
1. list_emails: Lists emails from the inbox. Use search queries like 'label:INBOX', 'is:unread', or 'from:someone@example.com'.
2. read_email: Fetches the subject, sender, date, snippet, and body content for a specific email ID.
3. draft_email: Creates drafts.
4. send_email: Sends new emails.
5. reply_to_email: Sends replies to an existing thread.

Guidelines:
- When listing emails, show the user a concise summary of the emails retrieved (Sender, Subject, Date, Snippet, and ID).
- When drafting/sending/replying, confirm the actions and key details (e.g., recipient, subject) to the user once completed.
- If email body is in HTML, extract the important points to make it readable for the user.
- Be helpful, polite, and brief.
`;

  const result = await emailAgent.invoke({
    messages: [
      new SystemMessage(systemPrompt),
      ...history
    ],
  });

  const lastMessage = [...result.messages]
    .reverse()
    .find((m) => m._getType() === "ai" && typeof m.content === "string" && m.content.trim() !== "")
    ?? result.messages[result.messages.length - 1];

  await prisma.conversation.update({
    where: {
      id: conversation.id,
    },
    data: {
      lastMessageAt: new Date(),
      messages: {
        create: {
          role: "ASSISTANT",
          content: lastMessage.content as string,
        },
      },
    },
  });

  res.json({
    conversationId: conversation.id,
    response: lastMessage?.content,
  });
}
