import { MessagesAnnotation } from "@langchain/langgraph";

import model from "./../../../services/llm.service";
import { savePersonalMemoryTool,saveConversationMemoryTool, deletePersonalMemoryTool, deleteConversationMemoryTool } from "../../../tools/memory.tool";
import { runEmailAgentTool } from "../../../tools/emailAgent.tool";
import { runCalendarAgentTool, runTasksAgentTool } from "../../../tools/subAgents.tool";

const modelWithTools = model.bindTools([
    savePersonalMemoryTool,
    saveConversationMemoryTool,
    deletePersonalMemoryTool,
    deleteConversationMemoryTool,
    runEmailAgentTool,
    runCalendarAgentTool,
    runTasksAgentTool
])

export async function chatBotWithTools(state:typeof MessagesAnnotation.State) {
    const response = await modelWithTools.invoke(state.messages);

  console.log(response.tool_calls);

  return {
    messages: [response],
  };
}