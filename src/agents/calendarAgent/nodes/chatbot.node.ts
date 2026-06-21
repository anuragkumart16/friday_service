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

import { SystemMessage } from "@langchain/core/messages";

export async function calendarChatBotWithTools(state: typeof MessagesAnnotation.State) {
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

  const systemPrompt = `You are Friday's Calendar Agent, specialized in managing Anurag's primary calendar events.
Today is ${formattedDate} at ${formattedTime} (Indian Standard Time).

You have access to Google Calendar API tools:
1. list_calendar_events: List events for a given time range.
2. create_calendar_event: Create a new calendar event.
3. delete_calendar_event: Delete an event by ID.
4. update_calendar_event: Update an existing event.

Guidelines:
- When listing events, present a clear, chronological agenda with titles, times, and details.
- When creating or updating events, always confirm the scheduled start and end times to the user once completed.
- Be precise, helpful, and concise.`;

  const response = await modelWithTools.invoke([
    new SystemMessage(systemPrompt),
    ...state.messages
  ]);
  console.log("Calendar Agent Tool Calls:", response.tool_calls);
  
  return {
    messages: [response],
  };
}
