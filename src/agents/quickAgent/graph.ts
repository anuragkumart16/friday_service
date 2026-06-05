import {
  START,
  END,
  MessagesAnnotation,
  StateGraph,
} from "@langchain/langgraph";

import { chatBotWithTools } from "./nodes/chatbot.node";

export const quickAgentGraph = new StateGraph(MessagesAnnotation)
  .addNode("chatbot", chatBotWithTools)
  .addEdge(START, "chatbot")
  .addEdge("chatbot", END);

export const quickAgent = quickAgentGraph.compile();