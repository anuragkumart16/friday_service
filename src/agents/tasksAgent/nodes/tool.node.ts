import { ToolNode } from "@langchain/langgraph/prebuilt";
import {
  listTasksTool,
  createTaskTool,
  completeTaskTool,
  deleteTaskTool,
} from "../../../tools/tasks.tool";

const tools = [
  listTasksTool,
  createTaskTool,
  completeTaskTool,
  deleteTaskTool,
];

export const toolNode = new ToolNode(tools);
