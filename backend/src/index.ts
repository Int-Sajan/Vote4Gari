import path from 'node:path';
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import volunteerRouter from './routes/volunteer';
import involvedRouter from './routes/involved';
import contactRouter from './routes/contact';

// Always load backend/.env regardless of the process working directory.
dotenv.config({ path: path.resolve(__dirname, '..', '.env') });

const app  = express();
const PORT = process.env.PORT ?? 3001;

// ── CORS ──────────────────────────────────────────────────────────────────────
// Allow only the frontend origin. In production, restrict this to your real domain.
const allowedOrigins = (process.env.CORS_ORIGIN ?? 'http://localhost:5173,http://localhost:5174,http://localhost:5176')
  .split(',')
  .map(o => o.trim())
  .filter(Boolean);

const corsOptions: cors.CorsOptions = {
  origin: (origin, callback) => {
    // Allow server-to-server requests (no origin) and listed origins
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      // Reject quietly without throwing a 500 error.
      callback(null, false);
    }
  },
  methods: ['POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
};

app.use(cors(corsOptions));

// Explicit preflight handling for the contact endpoint.
app.options('/api/contact', cors(corsOptions));

// ── Body parsing ──────────────────────────────────────────────────────────────
app.use(express.json({ limit: '16kb' }));

// ── Routes ────────────────────────────────────────────────────────────────────
app.use('/api/volunteer', volunteerRouter);
app.use('/api/involved', involvedRouter);
app.use('/api/contact', contactRouter);

// ── Health check ──────────────────────────────────────────────────────────────
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ── 404 catch-all ─────────────────────────────────────────────────────────────
app.use((_req, res) => {
  res.status(404).json({ success: false, message: 'Not found.' });
});

// ── Start ─────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`[backend] Listening on http://localhost:${PORT}`);
});
