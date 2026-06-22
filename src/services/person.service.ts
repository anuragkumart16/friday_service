import prisma from "../db/prismaClient";

/**
 * Searches for a person by name (case-insensitive substring match).
 * If name is empty string "", matches all records.
 */
export async function getPersonByName({ name }: { name: string }): Promise<string> {
  try {
    const people = await prisma.person.findMany({
      where: {
        name: {
          contains: name,
          mode: "insensitive",
        },
      },
    });

    if (people.length === 0) {
      return `No person found matching name "${name}".`;
    }

    return people
      .map((p) => {
        const contentList = p.content && p.content.length > 0
          ? p.content.map((c, idx) => `  ${idx + 1}. ${c}`).join("\n")
          : "  None";

        return `Person Details:
- ID: ${p.id}
- Name: ${p.name}
- What they are to me (Relationship): ${p.relationship}
- Content notes about them:
${contentList}
- Additional Details: ${p.details ? JSON.stringify(p.details, null, 2) : "N/A"}
- Created At: ${p.createdAt}
- Updated At: ${p.updatedAt}`;
      })
      .join("\n\n====================\n\n");
  } catch (error: any) {
    console.error("Error in getPersonByName:", error);
    return `Error reading person details: ${error.message}`;
  }
}

/**
 * Adds a new person.
 */
export async function createPerson({
  name,
  relationship,
  content,
  details,
}: {
  name: string;
  relationship: string;
  content?: string | string[];
  details?: Record<string, any>;
}): Promise<string> {
  try {
    let contentArray: string[] = [];
    if (content) {
      contentArray = Array.isArray(content) ? content : [content];
    }

    const person = await prisma.person.create({
      data: {
        name,
        relationship,
        content: contentArray,
        details: details || null,
      },
    });

    return `Successfully created a new person entry for "${person.name}" with ID ${person.id}.`;
  } catch (error: any) {
    console.error("Error in createPerson:", error);
    return `Error creating person: ${error.message}`;
  }
}

/**
 * Updates an existing person's details, relationship, or content.
 * Supports:
 * - addContent: Append string(s) to content array.
 * - removeContent: Filter out string(s) from content array.
 * - clearContent: Reset content array to empty.
 * - content: Completely replace content array.
 * - details: Merge new JSON details, remove keys where value is null.
 */
export async function updatePerson({
  name,
  relationship,
  content,
  addContent,
  removeContent,
  clearContent,
  details,
}: {
  name: string;
  relationship?: string;
  content?: string | string[] | null;
  addContent?: string | string[] | null;
  removeContent?: string | string[] | null;
  clearContent?: boolean | null;
  details?: Record<string, any> | null;
}): Promise<string> {
  try {
    // Try exact match first
    let person = await prisma.person.findFirst({
      where: {
        name: {
          equals: name,
          mode: "insensitive",
        },
      },
    });

    // Fallback to substring match
    if (!person) {
      person = await prisma.person.findFirst({
        where: {
          name: {
            contains: name,
            mode: "insensitive",
          },
        },
      });
    }

    if (!person) {
      return `Could not find any person matching name "${name}" to update.`;
    }

    const updateData: any = {};
    if (relationship !== undefined) {
      updateData.relationship = relationship;
    }

    // Handle array content updates
    let updatedContent = [...person.content];

    if (clearContent === true) {
      updatedContent = [];
    }

    if (content !== undefined && content !== null) {
      updatedContent = Array.isArray(content) ? content : [content];
    }

    if (addContent !== undefined && addContent !== null) {
      const itemsToAdd = Array.isArray(addContent) ? addContent : [addContent];
      updatedContent.push(...itemsToAdd);
    }

    if (removeContent !== undefined && removeContent !== null) {
      const itemsToRemove = Array.isArray(removeContent) ? removeContent : [removeContent];
      updatedContent = updatedContent.filter(item => !itemsToRemove.includes(item));
    }

    updateData.content = updatedContent;

    // Handle details JSON merging
    if (details !== undefined) {
      if (details === null) {
        updateData.details = null;
      } else {
        const existingDetails =
          person.details && typeof person.details === "object" && !Array.isArray(person.details)
            ? (person.details as Record<string, any>)
            : {};
        
        // Merge the details
        const mergedDetails = { ...existingDetails, ...details };
        
        // Remove keys where value is explicitly null or undefined
        for (const key in mergedDetails) {
          if (mergedDetails[key] === null || mergedDetails[key] === undefined) {
            delete mergedDetails[key];
          }
        }
        updateData.details = mergedDetails;
      }
    }

    const updatedPerson = await prisma.person.update({
      where: { id: person.id },
      data: updateData,
    });

    return `Successfully updated person "${updatedPerson.name}" (ID: ${updatedPerson.id}).`;
  } catch (error: any) {
    console.error("Error in updatePerson:", error);
    return `Error updating person: ${error.message}`;
  }
}

/**
 * Deletes a person record.
 */
export async function deletePerson({ name }: { name: string }): Promise<string> {
  try {
    // Try exact match first
    let person = await prisma.person.findFirst({
      where: {
        name: {
          equals: name,
          mode: "insensitive",
        },
      },
    });

    // Fallback to substring match
    if (!person) {
      person = await prisma.person.findFirst({
        where: {
          name: {
            contains: name,
            mode: "insensitive",
          },
        },
      });
    }

    if (!person) {
      return `Could not find any person matching name "${name}" to delete.`;
    }

    await prisma.person.delete({
      where: { id: person.id },
    });

    return `Successfully deleted person "${person.name}" (ID: ${person.id}) from the database.`;
  } catch (error: any) {
    console.error("Error in deletePerson:", error);
    return `Error deleting person: ${error.message}`;
  }
}
