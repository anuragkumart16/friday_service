import { ToolNode } from "@langchain/langgraph/prebuilt";
import { savePersonalMemoryTool, saveConversationMemoryTool, deletePersonalMemoryTool, deleteConversationMemoryTool } from "../../../tools/memory.tool";
import { runEmailAgentTool } from "../../../tools/emailAgent.tool";
import { runCalendarAgentTool, runTasksAgentTool } from "../../../tools/subAgents.tool";
import { getPersonByNameTool, createPersonTool, updatePersonTool, deletePersonTool } from "../../../tools/person.tool";

const tools = [
    savePersonalMemoryTool,
    saveConversationMemoryTool,
    deletePersonalMemoryTool,
    deleteConversationMemoryTool,
    runEmailAgentTool,
    runCalendarAgentTool,
    runTasksAgentTool,
    getPersonByNameTool,
    createPersonTool,
    updatePersonTool,
    deletePersonTool
]


export const toolNode = new ToolNode(tools);