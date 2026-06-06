import type {ToolDef} from "../../types/toolDefinition.types"
import z from "zod"

export const savePersonalMemoryToolDef : ToolDef = {
    name: "save_personal_memory",
    description:
      "Save a fact about the user that should be remembered across all conversations.",
    schema: z.object({
      content: z.string(),
    }),
}

export const saveConversationMemoryToolDef : ToolDef = {
    name: "save_conversation_memory",
    description:
      "Save information relevant to the current conversation.",
    schema: z.object({
      conversationId: z.string(),
      content: z.string(),
    })
}