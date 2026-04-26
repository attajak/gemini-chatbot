import { SignJWT, jwtVerify } from "jose";
import type { Request, Response, NextFunction } from "express";

const SECRET_KEY = new TextEncoder().encode(
  process.env.AUTH_SECRET || "changeme-set-auth-secret"
);

export interface SessionUser {
  id: string;
  email: string;
}

export async function createSession(user: SessionUser): Promise<string> {
  return await new SignJWT({ id: user.id, email: user.email })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("30d")
    .sign(SECRET_KEY);
}

export async function verifySession(token: string): Promise<SessionUser | null> {
  try {
    const { payload } = await jwtVerify(token, SECRET_KEY);
    return { id: payload.id as string, email: payload.email as string };
  } catch {
    return null;
  }
}

export function getTokenFromRequest(req: Request): string | null {
  const authHeader = req.headers.authorization;
  if (authHeader?.startsWith("Bearer ")) {
    return authHeader.slice(7);
  }
  const cookie = req.headers.cookie;
  if (cookie) {
    const match = cookie.match(/auth-token=([^;]+)/);
    if (match) return decodeURIComponent(match[1]);
  }
  return null;
}

export async function requireAuth(req: Request & { user?: SessionUser }, res: Response, next: NextFunction) {
  const token = getTokenFromRequest(req);
  if (!token) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  const user = await verifySession(token);
  if (!user) {
    res.status(401).json({ error: "Invalid or expired session" });
    return;
  }
  req.user = user;
  next();
}
