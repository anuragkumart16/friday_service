import { MessagesAnnotation } from "@langchain/langgraph";
import { SystemMessage } from "@langchain/core/messages";

import model from "../services/llm.service";

export async function chatbotNode(
  state: typeof MessagesAnnotation.State
) {
  const response = await model.invoke([
    new SystemMessage("You are Friday, a helpful AI assistant."),
    ...state.messages,
  ]);

  return {
    messages: [response],
  };
}