import { ToolNode } from "@langchain/langgraph/prebuilt";
import {
  listEventsTool,
  createEventTool,
  deleteEventTool,
  updateEventTool,
} from "../../../tools/calendar.tool";

const tools = [
  listEventsTool,
  createEventTool,
  deleteEventTool,
  updateEventTool,
];

export const toolNode = new ToolNode(tools);
