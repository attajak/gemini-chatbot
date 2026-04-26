import { Router } from "express";
import { z } from "zod";
import { createUser, getUser, verifyUser } from "../lib/db-queries";
import { createSession, requireAuth, getTokenFromRequest, verifySession } from "../lib/auth";

const router = Router();

const authSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

router.post("/login", async (req, res) => {
  try {
    const parsed = authSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ status: "invalid_data" });
      return;
    }
    const user = await verifyUser(parsed.data.email, parsed.data.password);
    if (!user) {
      res.status(401).json({ status: "failed" });
      return;
    }
    const token = await createSession({ id: user.id, email: user.email });
    res.json({ status: "success", token, user: { id: user.id, email: user.email } });
  } catch {
    res.status(500).json({ status: "failed" });
  }
});

router.post("/register", async (req, res) => {
  try {
    const parsed = authSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ status: "invalid_data" });
      return;
    }
    const existing = await getUser(parsed.data.email);
    if (existing.length > 0) {
      res.status(409).json({ status: "user_exists" });
      return;
    }
    await createUser(parsed.data.email, parsed.data.password);
    const users = await getUser(parsed.data.email);
    const token = await createSession({ id: users[0].id, email: users[0].email });
    res.json({ status: "success", token, user: { id: users[0].id, email: users[0].email } });
  } catch {
    res.status(500).json({ status: "failed" });
  }
});

router.get("/session", async (req, res) => {
  const token = getTokenFromRequest(req);
  if (!token) {
    res.json({ user: null });
    return;
  }
  const user = await verifySession(token);
  if (!user) {
    res.json({ user: null });
    return;
  }
  res.json({ user });
});

router.post("/logout", (_req, res) => {
  res.json({ status: "success" });
});

export default router;
