import {
  START,
  END,
  StateGraph,
  MessagesAnnotation,
} from "@langchain/langgraph";

import { chatbotNode } from "../nodes/chatbot.node";

export const graph = new StateGraph(MessagesAnnotation)
  .addNode("chatbot", chatbotNode)
  .addEdge(START, "chatbot")
  .addEdge("chatbot", END)
  .compile();