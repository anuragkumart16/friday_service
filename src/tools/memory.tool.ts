import {tool} from "@langchain/core/tools"
import {
  savePersonalMemories,
  saveConversationMemory,
  deletePersonalMemory,
  deleteConversationMemory
} from "../services/memory.service"

import {
  savePersonalMemoryToolDef,
  saveConversationMemoryToolDef,
  deletePersonalMemoryToolDef,
  deleteConversationMemoryToolDef
} from "./definitions/memoryTool.definitions"


export const savePersonalMemoryTool = tool(
  savePersonalMemories,
  savePersonalMemoryToolDef
)

export const saveConversationMemoryTool = tool(
  saveConversationMemory,
  saveConversationMemoryToolDef
)

export const deletePersonalMemoryTool = tool(
  deletePersonalMemory,
  deletePersonalMemoryToolDef
)

export const deleteConversationMemoryTool = tool(
  deleteConversationMemory,
  deleteConversationMemoryToolDef
)