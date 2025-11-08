// server/index.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pkg from "pg";

dotenv.config();
const { Pool } = pkg;

const app = express();
const PORT = process.env.PORT || 4000;

/* --------------------------- Middleware --------------------------- */
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://127.0.0.1:5173",
      "http://localhost:8080",
      "http://127.0.0.1:8080",
      "http://localhost:3000",
      "http://127.0.0.1:3000",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  })
);
app.use(express.json());

/* ------------------------ PostgreSQL Pool ------------------------- */
const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // e.g. postgres://user:pass@host:5432/db
  ssl: { rejectUnauthorized: false },        // keep true for Supabase/managed PG
});

/* --------------------------- Utilities --------------------------- */
function toIsoDateOrNull(d) {
  if (!d) return null;
  const parsed = new Date(d);
  if (isNaN(parsed.getTime())) return null;
  return parsed.toISOString().slice(0, 10); // YYYY-MM-DD
}

/* ---------------------------- Routes ----------------------------- */

// Root
app.get("/", (_req, res) => {
  res.send("✅ Watson Backend API is running. Try /health or /api/projects");
});

// Health check (also verifies DB)
app.get("/health", async (_req, res) => {
  try {
    const { rows } = await pool.query("SELECT NOW()");
    res.json({ ok: true, db: "connected", now: rows[0].now });
  } catch (err) {
    console.error("Health check failed:", err);
    res.status(500).json({ ok: false, error: "DB connection failed" });
  }
});

// Get all projects
app.get("/api/projects", async (_req, res) => {
  try {
    const { rows } = await pool.query(
      "SELECT * FROM projects ORDER BY id DESC"
    );
    res.json(rows);
  } catch (err) {
    console.error("GET /api/projects failed:", err);
    res.status(500).json({ ok: false, error: "Failed to load projects" });
  }
});

// Create a new project
app.post("/api/projects", async (req, res) => {
  try {
    const { title, description, skills, deadline } = req.body;

    if (!title || !description) {
      return res
        .status(400)
        .json({ ok: false, error: "Missing fields: title, description" });
    }

    const isoDeadline = toIsoDateOrNull(deadline);

    const query = `
      INSERT INTO projects (title, description, skills, deadline)
      VALUES ($1, $2, $3, $4::date)
      RETURNING *;
    `;
    const values = [title, description, skills ?? "", isoDeadline];

    const { rows } = await pool.query(query, values);
    res.json(rows[0]);
  } catch (err) {
    console.error("POST /api/projects failed:", err);
    res
      .status(500)
      .json({ ok: false, error: "Server error while saving project" });
  }
});

/* -------------------------- Start Server ------------------------- */
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});