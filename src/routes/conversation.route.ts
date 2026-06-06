import { Router } from "express";

import {
    getAllCoversations,
    loadMessages
} from "./../controllers/conversation.controller"

//TODO : write comments explaining what this router does
const conversationRouter = Router()

conversationRouter.route("/").get(getAllCoversations)
conversationRouter.route("/:conversationId").get(loadMessages)

export default conversationRouter