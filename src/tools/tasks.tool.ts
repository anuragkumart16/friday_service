import { tool } from "@langchain/core/tools";
import {
  listTasks,
  createTask,
  completeTask,
  deleteTask,
} from "../services/tasks.service";

import {
  listTasksToolDef,
  createTaskToolDef,
  completeTaskToolDef,
  deleteTaskToolDef,
} from "./definitions/tasksTool.definitions";

export const listTasksTool = tool(
  listTasks,
  listTasksToolDef
);

export const createTaskTool = tool(
  createTask,
  createTaskToolDef
);

export const completeTaskTool = tool(
  completeTask,
  completeTaskToolDef
);

export const deleteTaskTool = tool(
  deleteTask,
  deleteTaskToolDef
);
