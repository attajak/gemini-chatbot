import { Router } from "express";
import { getChatsByUserId } from "../lib/db-queries";
import { requireAuth } from "../lib/auth";
import type { SessionUser } from "../lib/auth";

const router = Router();
type AuthRequest = Parameters<typeof requireAuth>[0] & { user?: SessionUser };

router.get("/history", requireAuth, async (req: AuthRequest, res) => {
  try {
    const chats = await getChatsByUserId({ id: req.user!.id });
    res.json(chats);
  } catch (err) {
    req.log?.error({ err }, "History error");
    res.status(500).json({ error: "Failed to fetch history" });
  }
});

export default router;
