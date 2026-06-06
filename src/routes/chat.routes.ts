import { Router } from "express";

import { chatController } from "../controllers/chat.controller";

/**
 * Chat Router
 * POST / — accepts { message, conversationId? }
 * Runs quickAgent and returns { conversationId, response }
 */
const router = Router();

router.post("/", chatController);

export default router;