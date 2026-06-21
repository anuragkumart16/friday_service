import { tool } from "@langchain/core/tools";
import { calendarAgent } from "../agents/calendarAgent/graph";
import { tasksAgent } from "../agents/tasksAgent/graph";
import {
  runCalendarAgentToolDef,
  runTasksAgentToolDef,
} from "./definitions/subAgentsTool.definitions";
import { HumanMessage } from "@langchain/core/messages";

export async function runCalendarAgent({ request }: { request: string }): Promise<string> {
  try {
    const result = await calendarAgent.invoke({
      messages: [new HumanMessage(request)],
    });

    const lastMessage = [...result.messages]
      .reverse()
      .find((m) => m._getType() === "ai" && typeof m.content === "string" && m.content.trim() !== "");

    return (lastMessage?.content as string) || "Calendar agent executed successfully.";
  } catch (error: any) {
    console.error("Error executing Calendar Agent:", error);
    return `Error executing Calendar Agent: ${error.message}`;
  }
}

export async function runTasksAgent({ request }: { request: string }): Promise<string> {
  try {
    const result = await tasksAgent.invoke({
      messages: [new HumanMessage(request)],
    });

    const lastMessage = [...result.messages]
      .reverse()
      .find((m) => m._getType() === "ai" && typeof m.content === "string" && m.content.trim() !== "");

    return (lastMessage?.content as string) || "Tasks agent executed successfully.";
  } catch (error: any) {
    console.error("Error executing Tasks Agent:", error);
    return `Error executing Tasks Agent: ${error.message}`;
  }
}

export const runCalendarAgentTool = tool(
  runCalendarAgent,
  runCalendarAgentToolDef
);

export const runTasksAgentTool = tool(
  runTasksAgent,
  runTasksAgentToolDef
);
