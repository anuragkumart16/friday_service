import type { ToolDef } from "../../types/toolDefinition.types";
import z from "zod";

export const runCalendarAgentToolDef: ToolDef = {
  name: "run_calendar_agent",
  description: "Delegate tasks related to listing, creating, deleting, or updating calendar events to the specialized Calendar Agent. Input should be the exact user request or instruction regarding calendar events.",
  schema: z.object({
    request: z.string().describe("The user's query or instruction regarding calendar events to delegate to the Calendar Agent"),
  }),
};

export const runTasksAgentToolDef: ToolDef = {
  name: "run_tasks_agent",
  description: "Delegate tasks related to listing, creating, completing, or deleting todo tasks to the specialized Tasks Agent. Input should be the exact user request or instruction regarding todo tasks/items.",
  schema: z.object({
    request: z.string().describe("The user's query or instruction regarding todo tasks/items to delegate to the Tasks Agent"),
  }),
};
