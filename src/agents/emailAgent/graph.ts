import {
  START,
  MessagesAnnotation,
  StateGraph,
} from "@langchain/langgraph";

import { emailChatBotWithTools } from "./nodes/chatbot.node";
import { toolNode } from "./nodes/tool.node";
import { toolsCondition } from "@langchain/langgraph/prebuilt";

export const emailAgentGraph = new StateGraph(MessagesAnnotation)
  .addNode("chatbot", emailChatBotWithTools)
  .addNode("tools", toolNode)
  .addEdge(START, "chatbot")
  .addConditionalEdges(
    "chatbot",
    toolsCondition
  )
  .addEdge("tools", "chatbot");

export const emailAgent = emailAgentGraph.compile();
