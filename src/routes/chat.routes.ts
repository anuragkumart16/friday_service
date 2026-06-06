import { Router } from "express";

import { chatController } from "../controllers/chat.controller";

// TODO : write comments explaining what this router does
const router = Router();

router.post("/", chatController);

export default router;