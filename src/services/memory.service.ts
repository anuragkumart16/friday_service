import prisma from "../db/prismaClient"

// TODO : write comments for this method
export async function savePersonalMemories({content}: {content : string}){
    const personalMemory = await prisma.personalMemories.create({
        data : {
            content : content
        }
    })

    return `Personal Memory is saved successfully with id ${personalMemory.id}`
}

// TODO : write comments for this method
export async function saveConversationMemory({ conversationId, content } : {conversationId : string , content : string}) : Promise<string> {
    const memory = await prisma.conversationMemories.create({
      data: {
        conversationId:conversationId,
        content:content,
      },
    });

    return `Conversation Memory is saved successfully with id ${memory.id}`;
}