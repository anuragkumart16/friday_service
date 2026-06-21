import { google } from "googleapis";
import { oauth2Client } from "./gmail.service";

const tasks = google.tasks({ version: "v1", auth: oauth2Client });

/**
 * Lists tasks in the user's default task list.
 */
export async function listTasks({
  maxResults = 25,
  showCompleted = false,
}: {
  maxResults?: number;
  showCompleted?: boolean;
} = {}): Promise<string> {
  try {
    const response = await tasks.tasks.list({
      tasklist: "@default",
      maxResults,
      showCompleted,
      showHidden: showCompleted,
    });

    const items = response.data.items || [];
    const formattedTasks = items.map((task) => ({
      id: task.id,
      title: task.title || "(No Title)",
      notes: task.notes || "",
      status: task.status || "needsAction",
      due: task.due || "",
      updated: task.updated || "",
    }));

    return JSON.stringify(formattedTasks, null, 2);
  } catch (error: any) {
    console.error("Error in listTasks service:", error);
    throw new Error(`Failed to list tasks: ${error.message}`);
  }
}

/**
 * Creates a new task in the user's default task list.
 */
export async function createTask({
  title,
  notes,
  due,
}: {
  title: string;
  notes?: string;
  due?: string;
}): Promise<string> {
  try {
    const response = await tasks.tasks.insert({
      tasklist: "@default",
      requestBody: {
        title,
        notes,
        due, // Expects RFC 3339 timestamp string
      },
    });

    return `Task created successfully: "${response.data.title}" (ID: ${response.data.id})`;
  } catch (error: any) {
    console.error("Error in createTask service:", error);
    throw new Error(`Failed to create task: ${error.message}`);
  }
}

/**
 * Marks a task as completed in the user's default task list.
 */
export async function completeTask({
  taskId,
}: {
  taskId: string;
}): Promise<string> {
  try {
    const response = await tasks.tasks.patch({
      tasklist: "@default",
      task: taskId,
      requestBody: {
        status: "completed",
      },
    });

    return `Task "${response.data.title}" marked as completed.`;
  } catch (error: any) {
    console.error("Error in completeTask service:", error);
    throw new Error(`Failed to complete task: ${error.message}`);
  }
}

/**
 * Deletes a task from the user's default task list.
 */
export async function deleteTask({
  taskId,
}: {
  taskId: string;
}): Promise<string> {
  try {
    await tasks.tasks.delete({
      tasklist: "@default",
      task: taskId,
    });

    return `Task with ID ${taskId} deleted successfully.`;
  } catch (error: any) {
    console.error("Error in deleteTask service:", error);
    throw new Error(`Failed to delete task: ${error.message}`);
  }
}
