import { MessagesAnnotation } from "@langchain/langgraph";
import { SystemMessage } from "@langchain/core/messages";

import model from "./../../../services/llm.service";

const modelWithTools = model.bindTools([
    
])

export async function chatBotWithTools(state:typeof MessagesAnnotation.State) {
    const response = await modelWithTools.invoke([
    new SystemMessage("You are Friday, a helpful AI assistant. be concise in your responses"),
    ...state.messages,
  ]);

  return {
    messages: [response],
  };
}