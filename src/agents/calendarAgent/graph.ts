import {
  START,
  MessagesAnnotation,
  StateGraph,
} from "@langchain/langgraph";

import { calendarChatBotWithTools } from "./nodes/chatbot.node";
import { toolNode } from "./nodes/tool.node";
import { toolsCondition } from "@langchain/langgraph/prebuilt";

export const calendarAgentGraph = new StateGraph(MessagesAnnotation)
  .addNode("chatbot", calendarChatBotWithTools)
  .addNode("tools", toolNode)
  .addEdge(START, "chatbot")
  .addConditionalEdges(
    "chatbot",
    toolsCondition
  )
  .addEdge("tools", "chatbot");

export const calendarAgent = calendarAgentGraph.compile();
