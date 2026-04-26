import { Router } from "express";
import multer from "multer";
import { requireAuth } from "../lib/auth";
import type { SessionUser } from "../lib/auth";

const router = Router();
type AuthRequest = Parameters<typeof requireAuth>[0] & { user?: SessionUser };

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    const allowed = ["image/jpeg", "image/png", "application/pdf"];
    if (allowed.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("File type should be JPEG, PNG, or PDF"));
    }
  },
});

router.post("/files/upload", requireAuth, upload.single("file"), async (req: AuthRequest & { file?: Express.Multer.File }, res) => {
  if (!req.file) {
    res.status(400).json({ error: "No file uploaded" });
    return;
  }
  const base64 = req.file.buffer.toString("base64");
  const dataUrl = `data:${req.file.mimetype};base64,${base64}`;
  res.json({
    url: dataUrl,
    pathname: req.file.originalname,
    contentType: req.file.mimetype,
  });
});

export default router;
