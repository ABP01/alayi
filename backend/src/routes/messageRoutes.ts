import { Router } from "express";
import { getMessages } from "../controllers/messageController";
import { authenticateToken } from "../middleware/auth";

const router = Router();

router.get("/chat/:chatId", authenticateToken, getMessages);

export default router;
