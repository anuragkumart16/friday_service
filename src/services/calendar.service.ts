import { google } from "googleapis";
import { oauth2Client } from "./gmail.service";

const calendar = google.calendar({ version: "v3", auth: oauth2Client });

/**
 * Lists calendar events on the primary calendar.
 */
export async function listEvents({
  timeMin,
  timeMax,
  maxResults = 25,
}: {
  timeMin?: string;
  timeMax?: string;
  maxResults?: number;
} = {}): Promise<string> {
  try {
    const response = await calendar.events.list({
      calendarId: "primary",
      timeMin: timeMin || new Date().toISOString(),
      timeMax,
      maxResults,
      singleEvents: true,
      orderBy: "startTime",
    });

    const events = response.data.items || [];
    const formattedEvents = events.map((event) => ({
      id: event.id,
      summary: event.summary || "(No Title)",
      description: event.description || "",
      start: event.start?.dateTime || event.start?.date || "",
      end: event.end?.dateTime || event.end?.date || "",
      location: event.location || "",
    }));

    return JSON.stringify(formattedEvents, null, 2);
  } catch (error: any) {
    console.error("Error in listEvents service:", error);
    throw new Error(`Failed to list calendar events: ${error.message}`);
  }
}

/**
 * Creates a new event in the primary calendar.
 */
export async function createEvent({
  summary,
  startTime,
  endTime,
  description,
  location,
}: {
  summary: string;
  startTime: string;
  endTime: string;
  description?: string;
  location?: string;
}): Promise<string> {
  try {
    const response = await calendar.events.insert({
      calendarId: "primary",
      requestBody: {
        summary,
        description,
        location,
        start: {
          dateTime: startTime, // Expects ISO string: YYYY-MM-DDTHH:MM:SSZ
        },
        end: {
          dateTime: endTime, // Expects ISO string: YYYY-MM-DDTHH:MM:SSZ
        },
      },
    });

    return `Event created successfully: "${response.data.summary}" (ID: ${response.data.id})`;
  } catch (error: any) {
    console.error("Error in createEvent service:", error);
    throw new Error(`Failed to create calendar event: ${error.message}`);
  }
}

/**
 * Deletes a primary calendar event by its ID.
 */
export async function deleteEvent({
  eventId,
}: {
  eventId: string;
}): Promise<string> {
  try {
    await calendar.events.delete({
      calendarId: "primary",
      eventId,
    });

    return `Event with ID ${eventId} deleted successfully.`;
  } catch (error: any) {
    console.error("Error in deleteEvent service:", error);
    throw new Error(`Failed to delete calendar event: ${error.message}`);
  }
}

/**
 * Updates an existing calendar event by its ID.
 */
export async function updateEvent({
  eventId,
  summary,
  startTime,
  endTime,
}: {
  eventId: string;
  summary?: string;
  startTime?: string;
  endTime?: string;
}): Promise<string> {
  try {
    // Fetch original event first
    const originalEvent = await calendar.events.get({
      calendarId: "primary",
      eventId,
    });

    const requestBody: any = {
      summary: summary ?? originalEvent.data.summary,
    };

    if (startTime) {
      requestBody.start = { dateTime: startTime };
    }
    if (endTime) {
      requestBody.end = { dateTime: endTime };
    }

    const response = await calendar.events.patch({
      calendarId: "primary",
      eventId,
      requestBody,
    });

    return `Event updated successfully: "${response.data.summary}" (ID: ${response.data.id})`;
  } catch (error: any) {
    console.error("Error in updateEvent service:", error);
    throw new Error(`Failed to update calendar event: ${error.message}`);
  }
}
