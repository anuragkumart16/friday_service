import {
  START,
  END,
  MessagesAnnotation,
  StateGraph,
} from "@langchain/langgraph";

import { chatbotNode } from "./nodes/chatbot.node";

export const quickAgentGraph = new StateGraph(MessagesAnnotation)
  .addNode("chatbot", chatbotNode)
  .addEdge(START, "chatbot")
  .addEdge("chatbot", END);

export const quickAgent = quickAgentGraph.compile();