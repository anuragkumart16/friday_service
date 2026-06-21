import {
  START,
  MessagesAnnotation,
  StateGraph,
} from "@langchain/langgraph";

import { tasksChatBotWithTools } from "./nodes/chatbot.node";
import { toolNode } from "./nodes/tool.node";
import { toolsCondition } from "@langchain/langgraph/prebuilt";

export const tasksAgentGraph = new StateGraph(MessagesAnnotation)
  .addNode("chatbot", tasksChatBotWithTools)
  .addNode("tools", toolNode)
  .addEdge(START, "chatbot")
  .addConditionalEdges(
    "chatbot",
    toolsCondition
  )
  .addEdge("tools", "chatbot");

export const tasksAgent = tasksAgentGraph.compile();
