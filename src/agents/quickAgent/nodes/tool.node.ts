import { ToolNode } from "@langchain/langgraph/prebuilt";
import { savePersonalMemoryTool, saveConversationMemoryTool, deletePersonalMemoryTool, deleteConversationMemoryTool } from "../../../tools/memory.tool";

const tools = [
    savePersonalMemoryTool,
    saveConversationMemoryTool,
    deletePersonalMemoryTool,
    deleteConversationMemoryTool
]

export const toolNode = new ToolNode(tools);