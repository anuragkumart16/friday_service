import { MessagesAnnotation } from "@langchain/langgraph";

import model from "./../../../services/llm.service";
import { savePersonalMemoryTool,saveConversationMemoryTool } from "../../../tools/memory.tool";

const modelWithTools = model.bindTools([
    savePersonalMemoryTool,
    saveConversationMemoryTool
])

export async function chatBotWithTools(state:typeof MessagesAnnotation.State) {
    const response = await modelWithTools.invoke(state.messages);

  console.log(response.tool_calls);

  return {
    messages: [response],
  };
}