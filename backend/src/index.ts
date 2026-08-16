import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import volunteerRouter from './routes/volunteer';
import involvedRouter from './routes/involved';
import contactRouter from './routes/contact';

const app  = express();
const PORT = process.env.PORT ?? 3001;

// ── CORS ──────────────────────────────────────────────────────────────────────
// Allow only the frontend origin. In production, restrict this to your real domain.
const allowedOrigins = (process.env.CORS_ORIGIN ?? 'http://localhost:5173,http://localhost:5174')
  .split(',')
  .map(o => o.trim());

app.use(cors({
  origin: (origin, callback) => {
    // Allow server-to-server requests (no origin) and listed origins
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`CORS: origin '${origin}' not allowed`));
    }
  },
  methods: ['POST', 'OPTIONS'],
}));

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
