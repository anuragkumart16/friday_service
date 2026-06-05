import {
  START,
  END,
  MessagesAnnotation,
  StateGraph,
} from "@langchain/langgraph";

import { chatBotWithTools } from "./nodes/chatbot.node";
import { toolNode } from "./nodes/tool.node";
import { toolsCondition } from "@langchain/langgraph/prebuilt";

export const quickAgentGraph = new StateGraph(MessagesAnnotation)
  .addNode("chatbot", chatBotWithTools)
  .addNode("tools", toolNode)
  .addEdge(START, "chatbot")
    .addConditionalEdges(
    "chatbot",
    toolsCondition
  )
  .addEdge("tools", "chatbot");

export const quickAgent = quickAgentGraph.compile();