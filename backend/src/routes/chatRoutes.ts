import { Router } from "express";
import { getChats, getOrCreateChat } from "../controllers/chatController";
import { authenticateToken } from "../middleware/auth";

const router = Router();

router.use(authenticateToken);

router.get("/", getChats);
router.post("/with/:participantId", getOrCreateChat);

export default router;
