import { Router } from "express";
import { emailChatController } from "../controllers/email.controller";

/**
 * Email Agent Router
 * POST / — accepts { message, conversationId? }
 * Runs emailAgent and returns { conversationId, response }
 */
const router = Router();

router.post("/", emailChatController);

export default router;
