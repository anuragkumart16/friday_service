import type { ToolDef } from "../../types/toolDefinition.types";
import z from "zod";

export const listEventsToolDef: ToolDef = {
  name: "list_calendar_events",
  description: "List calendar events for a given time range.",
  schema: z.object({
    timeMin: z.string().optional().describe("ISO datetime string starting from which to list events (e.g., '2026-06-22T00:00:00Z'). Defaults to current time."),
    timeMax: z.string().optional().describe("ISO datetime string up to which to list events (e.g., '2026-06-23T23:59:59Z')."),
    maxResults: z.number().optional().describe("Maximum number of events to return (defaults to 25)."),
  }),
};

export const createEventToolDef: ToolDef = {
  name: "create_calendar_event",
  description: "Create a new event in the user's primary calendar.",
  schema: z.object({
    summary: z.string().describe("Title of the calendar event"),
    startTime: z.string().describe("ISO datetime string for the start of the event (e.g., '2026-06-22T09:00:00Z')"),
    endTime: z.string().describe("ISO datetime string for the end of the event (e.g., '2026-06-22T10:00:00Z')"),
    description: z.string().optional().describe("Optional description details for the event"),
    location: z.string().optional().describe("Optional physical or virtual location details"),
  }),
};

export const deleteEventToolDef: ToolDef = {
  name: "delete_calendar_event",
  description: "Delete an event from the user's calendar using the event ID.",
  schema: z.object({
    eventId: z.string().describe("The unique ID of the event to delete"),
  }),
};

export const updateEventToolDef: ToolDef = {
  name: "update_calendar_event",
  description: "Update details of an existing calendar event.",
  schema: z.object({
    eventId: z.string().describe("The unique ID of the event to update"),
    summary: z.string().optional().describe("New title of the event"),
    startTime: z.string().optional().describe("New ISO datetime string for the start of the event"),
    endTime: z.string().optional().describe("New ISO datetime string for the end of the event"),
  }),
};
