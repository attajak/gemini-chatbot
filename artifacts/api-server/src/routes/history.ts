import { Router } from "express";
import { getChatsByUserId, getChatById, deleteChatById } from "../lib/db-queries";
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

router.delete("/history", requireAuth, async (req: AuthRequest, res) => {
  const { id } = req.query;
  if (!id || typeof id !== "string") {
    res.status(400).json({ error: "Missing id" });
    return;
  }
  const chatRecord = await getChatById({ id });
  if (!chatRecord) {
    res.status(404).json({ error: "Not found" });
    return;
  }
  if (chatRecord.userId !== req.user!.id) {
    res.status(403).json({ error: "Forbidden" });
    return;
  }
  await deleteChatById({ id });
  res.json({ status: "deleted" });
});

export default router;
