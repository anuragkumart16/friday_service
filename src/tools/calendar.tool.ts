import { tool } from "@langchain/core/tools";
import {
  listEvents,
  createEvent,
  deleteEvent,
  updateEvent,
} from "../services/calendar.service";

import {
  listEventsToolDef,
  createEventToolDef,
  deleteEventToolDef,
  updateEventToolDef,
} from "./definitions/calendarTool.definitions";

export const listEventsTool = tool(
  listEvents,
  listEventsToolDef
);

export const createEventTool = tool(
  createEvent,
  createEventToolDef
);

export const deleteEventTool = tool(
  deleteEvent,
  deleteEventToolDef
);

export const updateEventTool = tool(
  updateEvent,
  updateEventToolDef
);
