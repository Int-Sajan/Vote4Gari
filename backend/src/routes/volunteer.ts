import { Router, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { validateRegistration, RegistrationBody } from '../validation';
import { appendRegistration, SheetRow } from '../sheets';

const router = Router();

/**
 * POST /api/volunteer
 *
 * Body: RegistrationBody (see validation.ts)
 *
 * Responses:
 *   201  { success: true, registrationId }
 *   400  { success: false, errors: ValidationError[] }
 *   500  { success: false, message: string }
 */
router.post('/', async (req: Request, res: Response): Promise<void> => {
  // ── 1. Validate ────────────────────────────────────────────────────────────
  const errors = validateRegistration(req.body);
  if (errors.length > 0) {
    res.status(400).json({ success: false, errors });
    return;
  }

  const body = req.body as RegistrationBody;

  // ── 2. Build row ───────────────────────────────────────────────────────────
  const row: SheetRow = {
    registrationId: uuidv4(),
    campaign:       body.campaign.trim(),
    eventId:        body.eventId.trim(),
    date:           body.date.trim(),
    startTime:      body.startTime.trim(),
    endTime:        body.endTime.trim(),
    location:       body.location.trim(),
    name:           body.name.trim(),
    phone:          body.phone.trim(),
    email:          body.email.trim(),
    registeredAt:   new Date().toISOString(),
  };

  // ── 3. Write to Google Sheets ──────────────────────────────────────────────
  try {
    await appendRegistration(row);
  } catch (err) {
    const message =
      err instanceof Error ? err.message : 'Failed to save registration.';
    console.error('[POST /api/volunteer] Google Sheets error:', message);
    res.status(500).json({ success: false, message: 'Failed to save registration. Please try again.' });
    return;
  }

  // ── 4. Respond ─────────────────────────────────────────────────────────────
  res.status(201).json({ success: true, registrationId: row.registrationId });
});

export default router;
