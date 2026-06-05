import { ToolNode } from "@langchain/langgraph/prebuilt";
import { savePersonalMemoryTool, saveConversationMemoryTool } from "../../../tools/memory.tool";

const tools = [
    savePersonalMemoryTool,
    saveConversationMemoryTool
]

export const toolNode = new ToolNode(tools);