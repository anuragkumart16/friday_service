import { ToolNode } from "@langchain/langgraph/prebuilt";
import { savePersonalMemoryTool, saveConversationMemoryTool, deletePersonalMemoryTool, deleteConversationMemoryTool } from "../../../tools/memory.tool";
import { runEmailAgentTool } from "../../../tools/emailAgent.tool";

const tools = [
    savePersonalMemoryTool,
    saveConversationMemoryTool,
    deletePersonalMemoryTool,
    deleteConversationMemoryTool,
    runEmailAgentTool
]

export const toolNode = new ToolNode(tools);