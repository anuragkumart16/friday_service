import { MessagesAnnotation } from "@langchain/langgraph";
import model from "./../../../services/llm.service";
import {
  listTasksTool,
  createTaskTool,
  completeTaskTool,
  deleteTaskTool,
} from "../../../tools/tasks.tool";

const modelWithTools = model.bindTools([
  listTasksTool,
  createTaskTool,
  completeTaskTool,
  deleteTaskTool,
]);

import { SystemMessage } from "@langchain/core/messages";

export async function tasksChatBotWithTools(state: typeof MessagesAnnotation.State) {
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: 'Asia/Kolkata'
  });
  const formattedTime = currentDate.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: true,
      timeZone: 'Asia/Kolkata'
  });

  const systemPrompt = `You are Friday's Tasks Agent, specialized in managing Anurag's todo tasks/items.
Today is ${formattedDate} at ${formattedTime} (Indian Standard Time).

You have access to Google Tasks API tools:
1. list_todo_tasks: List todo tasks from the default list.
2. create_todo_task: Create a new todo task.
3. complete_todo_task: Mark a task as completed.
4. delete_todo_task: Delete a task from the list.

Guidelines:
- When listing tasks, display them in a clear, formatted list showing task titles, notes, status, and due dates.
- When creating or completing tasks, confirm the task name and action back to the user once completed.
- Be precise, helpful, and concise.`;

  const response = await modelWithTools.invoke([
    new SystemMessage(systemPrompt),
    ...state.messages
  ]);
  console.log("Tasks Agent Tool Calls:", response.tool_calls);
  
  return {
    messages: [response],
  };
}
