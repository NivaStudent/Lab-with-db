import express from "express";
import bcrypt from "bcrypt";
import { pool } from "./db.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  const { email, password } = req.body;
  const db = await pool;

  const existing = await db.request()
    .input("email", email)
    .query("SELECT * FROM Users WHERE Email=@email");

  if (existing.recordset.length)
    return res.status(400).json({ error: "User exists" });

  const hash = await bcrypt.hash(password, 10);

  await db.request()
    .input("email", email)
    .input("password", hash)
    .query("INSERT INTO Users (Email, PasswordHash) VALUES (@email,@password)");

  res.json({ message: "Registered" });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const db = await pool;

  const result = await db.request()
    .input("email", email)
    .query("SELECT * FROM Users WHERE Email=@email");

  const user = result.recordset[0];

  if (!user) return res.status(400).json({ error: "Not found" });

  const valid = await bcrypt.compare(password, user.PasswordHash);

  if (!valid) return res.status(400).json({ error: "Wrong password" });

  res.json({ message: "OK", userId: user.Id });
});

export default router;