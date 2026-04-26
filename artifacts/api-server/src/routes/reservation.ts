import { Router } from "express";
import { getReservationById, updateReservationPayment } from "../lib/db-queries";
import { requireAuth } from "../lib/auth";
import type { SessionUser } from "../lib/auth";

const router = Router();
type AuthRequest = Parameters<typeof requireAuth>[0] & { user?: SessionUser };

router.get("/reservation", requireAuth, async (req: AuthRequest, res) => {
  const { id } = req.query;
  if (!id || typeof id !== "string") {
    res.status(400).json({ error: "Missing id" });
    return;
  }
  const reserv = await getReservationById({ id });
  if (!reserv) {
    res.status(404).json({ error: "Not found" });
    return;
  }
  res.json(reserv);
});

router.patch("/reservation", requireAuth, async (req: AuthRequest, res) => {
  const { id } = req.query;
  const { magicWord } = req.body;
  if (!id || typeof id !== "string") {
    res.status(400).json({ error: "Missing id" });
    return;
  }
  const MAGIC_WORD = "vercel";
  if (!magicWord || magicWord.toLowerCase() !== MAGIC_WORD) {
    res.status(400).send("Invalid magic word");
    return;
  }
  await updateReservationPayment({ id, hasCompletedPayment: true });
  const updated = await getReservationById({ id });
  res.json(updated);
});

export default router;
