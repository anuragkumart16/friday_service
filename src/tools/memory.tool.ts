import {tool} from "@langchain/core/tools"
import {z} from "zod"

import { savePersonalMemories,saveConversationMemory } from "../services/memory.service"


// TODO : move this to types folder
interface ToolDef{
    name : string
    description : string
    schema : z.ZodType<any>
}


const savePersonalMemoryToolDef : ToolDef = {
    name: "save_personal_memory",
    description:
      "Save a fact about the user that should be remembered across all conversations.",
    schema: z.object({
      content: z.string(),
    }),
}
export const savePersonalMemoryTool = tool(savePersonalMemories,savePersonalMemoryToolDef)


const saveConversationMemoryToolDef : ToolDef = {
    name: "save_conversation_memory",
    description:
      "Save information relevant to the current conversation.",
    schema: z.object({
      conversationId: z.string(),
      content: z.string(),
    })
}
export const saveConversationMemoryTool = tool(saveConversationMemory,saveConversationMemoryToolDef)