import { Router } from "express";

import {
    getAllCoversations,
    loadMessages
} from "./../controllers/conversation.controller"

/**
 * Conversation Router
 * GET /               — paginated list of all conversations
 * GET /:conversationId — messages for a specific conversation
 */
const conversationRouter = Router()

conversationRouter.route("/").get(getAllCoversations)
conversationRouter.route("/:conversationId").get(loadMessages)

export default conversationRouter