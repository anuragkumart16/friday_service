import type { ToolDef } from "../../types/toolDefinition.types";
import z from "zod";

export const listEmailsToolDef: ToolDef = {
  name: "list_emails",
  description: "List email messages matching an optional search query.",
  schema: z.object({
    query: z.string().optional().describe("Optional search query (e.g., 'label:INBOX', 'is:unread', 'from:sender@example.com')"),
    maxResults: z.number().optional().describe("Maximum number of emails to return (defaults to 10)"),
  }),
};

export const readEmailToolDef: ToolDef = {
  name: "read_email",
  description: "Read details of a single email message by its ID, including subject, sender, date, and full body content.",
  schema: z.object({
    id: z.string().describe("The ID of the email message to fetch"),
  }),
};

export const draftEmailToolDef: ToolDef = {
  name: "draft_email",
  description: "Create a draft email in Gmail without sending it immediately.",
  schema: z.object({
    to: z.string().describe("Recipient's email address"),
    subject: z.string().describe("Subject of the email"),
    body: z.string().describe("HTML or plain text body of the email"),
  }),
};

export const sendEmailToolDef: ToolDef = {
  name: "send_email",
  description: "Create and send an email directly through Gmail.",
  schema: z.object({
    to: z.string().describe("Recipient's email address"),
    subject: z.string().describe("Subject of the email"),
    body: z.string().describe("HTML or plain text body of the email"),
  }),
};

export const replyEmailToolDef: ToolDef = {
  name: "reply_to_email",
  description: "Reply to an existing email thread.",
  schema: z.object({
    threadId: z.string().describe("The ID of the thread or parent message to reply to"),
    replyTo: z.string().describe("The email address of the person we are replying to"),
    subject: z.string().describe("Fallback subject of the email (the parent subject will automatically be prefixed with 'Re:')"),
    body: z.string().describe("The content of the reply message"),
  }),
};
