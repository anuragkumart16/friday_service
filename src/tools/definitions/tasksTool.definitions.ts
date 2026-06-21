import type { ToolDef } from "../../types/toolDefinition.types";
import z from "zod";

export const listTasksToolDef: ToolDef = {
  name: "list_todo_tasks",
  description: "List todo tasks in the user's default task list.",
  schema: z.object({
    maxResults: z.number().optional().describe("Maximum number of tasks to return (defaults to 25)."),
    showCompleted: z.boolean().optional().describe("Whether to include completed tasks in the results (defaults to false)."),
  }),
};

export const createTaskToolDef: ToolDef = {
  name: "create_todo_task",
  description: "Create a new todo task in the default list.",
  schema: z.object({
    title: z.string().describe("The summary or title of the todo task"),
    notes: z.string().optional().describe("Detailed notes or descriptions for the task"),
    due: z.string().optional().describe("RFC 3339 timestamp for when the task is due (e.g., '2026-06-22T17:00:00Z')"),
  }),
};

export const completeTaskToolDef: ToolDef = {
  name: "complete_todo_task",
  description: "Mark a todo task as completed.",
  schema: z.object({
    taskId: z.string().describe("The unique ID of the task to mark as completed"),
  }),
};

export const deleteTaskToolDef: ToolDef = {
  name: "delete_todo_task",
  description: "Delete a task from the default list.",
  schema: z.object({
    taskId: z.string().describe("The unique ID of the task to delete"),
  }),
};
