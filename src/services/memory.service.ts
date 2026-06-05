import prisma from "../db/prismaClient"

export async function savePersonalMemories({content}: {content : string}){
    console.log("SAVE PERSONAL MEMORY CALLED");
    console.log(content);
    const personalMemory = await prisma.personalMemories.create({
        data : {
            content : content
        }
    })

    return `Personal Memory is saved successfully with id ${personalMemory.id}`
}

export async function saveConversationMemory({ conversationId, content } : {conversationId : string , content : string}) : Promise<string> {
    const memory = await prisma.conversationMemories.create({
      data: {
        conversationId:conversationId,
        content:content,
      },
    });

    return `Conversation Memory is saved successfully with id ${memory.id}`;
}