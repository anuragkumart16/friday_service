import type { ToolDef } from "../../types/toolDefinition.types";
import z from "zod";

export const runEmailAgentToolDef: ToolDef = {
  name: "run_email_agent",
  description: "Delegate tasks related to listing, reading, drafting, sending, or replying to emails to the specialized Email Agent. Input should be the exact user request or instruction regarding emails.",
  schema: z.object({
    request: z.string().describe("The user's query or instruction regarding emails to delegate to the Email Agent"),
  }),
};
