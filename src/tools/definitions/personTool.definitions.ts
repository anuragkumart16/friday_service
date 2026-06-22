import type { ToolDef } from "../../types/toolDefinition.types";
import z from "zod";

export const getPersonByNameToolDef: ToolDef = {
  name: "get_person_details_by_name",
  description: "Search and retrieve details about a person by searching their name. To retrieve ALL people records in the database, pass an empty string \"\" as the name parameter.",
  schema: z.object({
    name: z.string().describe("The name or part of the name of the person to search for (pass empty string \"\" to get all records)"),
  }),
};

export const createPersonToolDef: ToolDef = {
  name: "create_person_record",
  description: "Create a new person entry with their name, relationship/what they are to me, optional content list, and additional details.",
  schema: z.object({
    name: z.string().describe("The name of the person"),
    relationship: z.string().describe("What they are to me (e.g. friend, family, boss, colleague, mentor)"),
    content: z.union([z.string(), z.array(z.string())]).optional().describe("A single content note string, or an array of content notes about this person"),
    details: z.record(z.string(), z.any()).optional().describe("Any key-value details known about them (e.g. email, phone, birthday) as a JSON object"),
  }),
};

export const updatePersonToolDef: ToolDef = {
  name: "update_person_record",
  description: "Update details, relationship, or content list about a person. Can also be used to add new details, change details, or modify the content notes array (by appending, removing, clearing, or replacing). When details are provided, they will be merged with existing details.",
  schema: z.object({
    name: z.string().describe("The name of the person to update (exact or substring search)"),
    relationship: z.string().optional().describe("Updated relationship/what they are to me"),
    content: z.union([z.string(), z.array(z.string())]).nullable().optional().describe("Completely replace/override the content notes list with new notes. Pass null to clear."),
    addContent: z.union([z.string(), z.array(z.string())]).nullable().optional().describe("Append one or more new notes/observations to the content list"),
    removeContent: z.union([z.string(), z.array(z.string())]).nullable().optional().describe("Delete one or more matching notes from the content list"),
    clearContent: z.boolean().nullable().optional().describe("Set to true to delete/clear all content notes"),
    details: z.record(z.string(), z.any()).nullable().optional().describe("Details to merge. To delete a specific detail key, set its value to null. To clear all details, pass null."),
  }),
};

export const deletePersonToolDef: ToolDef = {
  name: "delete_person_record",
  description: "Delete a person's entire record from the database by name.",
  schema: z.object({
    name: z.string().describe("The name of the person to delete"),
  }),
};
