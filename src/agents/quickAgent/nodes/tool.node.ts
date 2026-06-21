import { ToolNode } from "@langchain/langgraph/prebuilt";
import { savePersonalMemoryTool, saveConversationMemoryTool, deletePersonalMemoryTool, deleteConversationMemoryTool } from "../../../tools/memory.tool";
import { runEmailAgentTool } from "../../../tools/emailAgent.tool";
import { runCalendarAgentTool, runTasksAgentTool } from "../../../tools/subAgents.tool";

const tools = [
    savePersonalMemoryTool,
    saveConversationMemoryTool,
    deletePersonalMemoryTool,
    deleteConversationMemoryTool,
    runEmailAgentTool,
    runCalendarAgentTool,
    runTasksAgentTool
]

export const toolNode = new ToolNode(tools);