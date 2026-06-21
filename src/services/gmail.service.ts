import { google } from "googleapis";

// Initialize OAuth2 client
export const oauth2Client = new google.auth.OAuth2(
  process.env.GMAIL_CLIENT_ID,
  process.env.GMAIL_CLIENT_SECRET,
  process.env.GMAIL_REDIRECT_URI
);

if (process.env.GMAIL_REFRESH_TOKEN) {
  oauth2Client.setCredentials({
    refresh_token: process.env.GMAIL_REFRESH_TOKEN,
  });
}

const gmail = google.gmail({ version: "v1", auth: oauth2Client });

/**
 * Decodes base64url encoded string from Gmail API.
 */
function decodeBase64Url(data: string): string {
  const base64 = data.replace(/-/g, "+").replace(/_/g, "/");
  return Buffer.from(base64, "base64").toString("utf-8");
}

/**
 * Recursively extracts plain text or HTML body from Gmail message payload parts.
 */
function getEmailBody(payload: any): string {
  if (!payload) return "";
  if (payload.body && payload.body.data) {
    return decodeBase64Url(payload.body.data);
  }
  if (payload.parts) {
    // Look for plain text first, then HTML
    for (const part of payload.parts) {
      if (part.mimeType === "text/plain" && part.body && part.body.data) {
        return decodeBase64Url(part.body.data);
      }
    }
    for (const part of payload.parts) {
      const body = getEmailBody(part);
      if (body) return body;
    }
  }
  return "";
}

/**
 * Formats a message as raw RFC 2822 email format.
 */
function buildRawEmail({
  to,
  subject,
  body,
  threadId,
  messageId,
}: {
  to: string;
  subject: string;
  body: string;
  threadId?: string;
  messageId?: string;
}): string {
  const headers = [
    `To: ${to}`,
    `Subject: ${subject}`,
    'MIME-Version: 1.0',
    'Content-Type: text/html; charset="UTF-8"',
  ];

  if (messageId) {
    headers.push(`In-Reply-To: ${messageId}`);
    headers.push(`References: ${messageId}`);
  }

  const emailLines = [
    ...headers,
    "",
    body
  ];

  const emailStr = emailLines.join("\r\n");

  return Buffer.from(emailStr)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

/**
 * Lists messages matching a query.
 */
export async function listMessages({
  query = "label:INBOX",
  maxResults = 10,
}: {
  query?: string;
  maxResults?: number;
} = {}): Promise<string> {
  try {
    const response = await gmail.users.messages.list({
      userId: "me",
      q: query,
      maxResults,
    });

    const messages = response.data.messages || [];
    const detailedMessages = await Promise.all(
      messages.map(async (msg) => {
        try {
          const detail = await gmail.users.messages.get({
            userId: "me",
            id: msg.id!,
            format: "metadata",
            metadataHeaders: ["Subject", "From", "Date"],
          });

          const headers = detail.data.payload?.headers || [];
          const subject = headers.find((h) => h.name === "Subject")?.value || "(No Subject)";
          const from = headers.find((h) => h.name === "From")?.value || "(Unknown)";
          const date = headers.find((h) => h.name === "Date")?.value || "";

          return {
            id: msg.id,
            threadId: msg.threadId,
            from,
            subject,
            date,
            snippet: detail.data.snippet || "",
          };
        } catch (err: any) {
          console.error("Error fetching message metadata for ID:", msg.id, err);
          return {
            id: msg.id,
            threadId: msg.threadId,
            error: err.message,
          };
        }
      })
    );

    return JSON.stringify(detailedMessages, null, 2);
  } catch (error: any) {
    console.error("Error in listMessages service:", error);
    throw new Error(`Failed to list Gmail messages: ${error.message}`);
  }
}

/**
 * Retrieves a detailed message by ID.
 */
export async function getMessage({ id }: { id: string }): Promise<string> {
  try {
    const response = await gmail.users.messages.get({
      userId: "me",
      id,
    });

    const headers = response.data.payload?.headers || [];
    const subject = headers.find((h) => h.name?.toLowerCase() === "subject")?.value || "(No Subject)";
    const from = headers.find((h) => h.name?.toLowerCase() === "from")?.value || "(Unknown)";
    const to = headers.find((h) => h.name?.toLowerCase() === "to")?.value || "";
    const date = headers.find((h) => h.name?.toLowerCase() === "date")?.value || "";
    const messageId = headers.find((h) => h.name?.toLowerCase() === "message-id")?.value || "";

    const body = getEmailBody(response.data.payload);

    return JSON.stringify({
      id: response.data.id,
      threadId: response.data.threadId,
      messageId,
      from,
      to,
      subject,
      date,
      snippet: response.data.snippet || "",
      body,
    }, null, 2);
  } catch (error: any) {
    console.error("Error in getMessage service:", error);
    throw new Error(`Failed to retrieve message ${id}: ${error.message}`);
  }
}

/**
 * Creates an email draft.
 */
export async function createDraft({
  to,
  subject,
  body,
}: {
  to: string;
  subject: string;
  body: string;
}): Promise<string> {
  try {
    const raw = buildRawEmail({ to, subject, body });
    const response = await gmail.users.drafts.create({
      userId: "me",
      requestBody: {
        message: {
          raw,
        },
      },
    });

    return `Draft created successfully with ID: ${response.data.id}`;
  } catch (error: any) {
    console.error("Error in createDraft service:", error);
    throw new Error(`Failed to create draft: ${error.message}`);
  }
}

/**
 * Sends a new email.
 */
export async function sendMessage({
  to,
  subject,
  body,
}: {
  to: string;
  subject: string;
  body: string;
}): Promise<string> {
  try {
    const raw = buildRawEmail({ to, subject, body });
    const response = await gmail.users.messages.send({
      userId: "me",
      requestBody: {
        raw,
      },
    });

    return `Email sent successfully with message ID: ${response.data.id} and thread ID: ${response.data.threadId}`;
  } catch (error: any) {
    console.error("Error in sendMessage service:", error);
    throw new Error(`Failed to send email: ${error.message}`);
  }
}

/**
 * Replies to an existing email thread.
 */
export async function replyToMessage({
  threadId,
  replyTo,
  subject,
  body,
}: {
  threadId: string;
  replyTo: string;
  subject: string;
  body: string;
}): Promise<string> {
  try {
    // Retrieve parent message to extract Message-ID header
    const parentMsg = await gmail.users.messages.get({
      userId: "me",
      id: threadId, // threadId is also usually the ID of the initial message
    });

    const headers = parentMsg.data.payload?.headers || [];
    const parentMessageId = headers.find((h) => h.name?.toLowerCase() === "message-id")?.value || "";
    const parentSubject = headers.find((h) => h.name?.toLowerCase() === "subject")?.value || "";
    
    // Ensure subject is prefixed with Re: if it's not already
    const replySubject = parentSubject.toLowerCase().startsWith("re:")
      ? parentSubject
      : `Re: ${parentSubject}`;

    const raw = buildRawEmail({
      to: replyTo,
      subject: replySubject || subject,
      body,
      threadId,
      messageId: parentMessageId,
    });

    const response = await gmail.users.messages.send({
      userId: "me",
      requestBody: {
        raw,
        threadId,
      },
    });

    return `Reply sent successfully with message ID: ${response.data.id} under thread ID: ${response.data.threadId}`;
  } catch (error: any) {
    console.error("Error in replyToMessage service:", error);
    throw new Error(`Failed to reply to message: ${error.message}`);
  }
}
