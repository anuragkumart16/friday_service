import { MessagesAnnotation } from "@langchain/langgraph";
import model from "./../../../services/llm.service";
import {
  listEmailsTool,
  readEmailTool,
  draftEmailTool,
  sendEmailTool,
  replyEmailTool,
} from "../../../tools/email.tool";

const modelWithTools = model.bindTools([
  listEmailsTool,
  readEmailTool,
  draftEmailTool,
  sendEmailTool,
  replyEmailTool,
]);

import { SystemMessage } from "@langchain/core/messages";

export async function emailChatBotWithTools(state: typeof MessagesAnnotation.State) {
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

  const systemPrompt = `You are Friday's Email Agent, specialized in managing Anurag's emails.
Today is ${formattedDate} at ${formattedTime} (Indian Standard Time).

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
- Be helpful, polite, and brief.`;

  const response = await modelWithTools.invoke([
    new SystemMessage(systemPrompt),
    ...state.messages
  ]);
  console.log("Email Agent Tool Calls:", response.tool_calls);
  
  return {
    messages: [response],
  };
}
