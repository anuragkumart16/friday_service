import { MessagesAnnotation } from "@langchain/langgraph";
import model from "./../../../services/llm.service";
import {
  listEventsTool,
  createEventTool,
  deleteEventTool,
  updateEventTool,
} from "../../../tools/calendar.tool";

const modelWithTools = model.bindTools([
  listEventsTool,
  createEventTool,
  deleteEventTool,
  updateEventTool,
]);

export async function calendarChatBotWithTools(state: typeof MessagesAnnotation.State) {
  const response = await modelWithTools.invoke(state.messages);
  console.log("Calendar Agent Tool Calls:", response.tool_calls);
  
  return {
    messages: [response],
  };
}
