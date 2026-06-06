import {tool} from "@langchain/core/tools"
import {
  savePersonalMemories,
  saveConversationMemory
} from "../services/memory.service"

import {
  savePersonalMemoryToolDef,
  saveConversationMemoryToolDef
} from "./definitions/memoryTool.definitions"


export const savePersonalMemoryTool = tool(
  savePersonalMemories,
  savePersonalMemoryToolDef
)

export const saveConversationMemoryTool = tool(
  saveConversationMemory,
  saveConversationMemoryToolDef
)