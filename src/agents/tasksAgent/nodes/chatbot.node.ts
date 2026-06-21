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

export async function tasksChatBotWithTools(state: typeof MessagesAnnotation.State) {
  const response = await modelWithTools.invoke(state.messages);
  console.log("Tasks Agent Tool Calls:", response.tool_calls);
  
  return {
    messages: [response],
  };
}
