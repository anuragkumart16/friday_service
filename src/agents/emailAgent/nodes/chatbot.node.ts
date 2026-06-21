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

export async function emailChatBotWithTools(state: typeof MessagesAnnotation.State) {
  const response = await modelWithTools.invoke(state.messages);
  console.log("Email Agent Tool Calls:", response.tool_calls);
  
  return {
    messages: [response],
  };
}
