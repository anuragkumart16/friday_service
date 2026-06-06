import prisma from "../db/prismaClient"

/** Persists a personal memory entry (cross-conversation) and returns its id */
export async function savePersonalMemories({content}: {content : string}){
    const personalMemory = await prisma.personalMemories.create({
        data : {
            content : content
        }
    })

    return `Personal Memory is saved successfully with id ${personalMemory.id}`
}

/** Persists a memory scoped to a specific conversation and returns its id */
export async function saveConversationMemory({ conversationId, content } : {conversationId : string , content : string}) : Promise<string> {
    const memory = await prisma.conversationMemories.create({
      data: {
        conversationId:conversationId,
        content:content,
      },
    });

    return `Conversation Memory is saved successfully with id ${memory.id}`;
}