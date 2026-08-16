import { Router, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { appendInvolvedRegistration, InvolvedSheetRow } from '../sheets';
import { InvolvedRegistrationBody, validateInvolvedRegistration } from '../involvedValidation';

const router = Router();

router.post('/', async (req: Request, res: Response): Promise<void> => {
  const errors = validateInvolvedRegistration(req.body);
  if (errors.length > 0) {
    res.status(400).json({ success: false, errors });
    return;
  }

  const body = req.body as InvolvedRegistrationBody;
  const row: InvolvedSheetRow = {
    registrationId: uuidv4(),
    name: body.name.trim(),
    email: body.email.trim(),
    mobile: body.mobile.trim(),
    postal: body.postal.trim().toUpperCase(),
    lang: body.lang.trim(),
    remind: body.remind === 'Yes' ? 'Yes' : 'No',
    sign: body.sign === 'Yes' ? 'Yes' : 'No',
    volunteer: body.volunteer === 'Yes' ? 'Yes' : 'No',
    registeredAt: new Date().toISOString(),
  };

  try {
    await appendInvolvedRegistration(row);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to save registration.';
    console.error('[POST /api/involved] Google Sheets error:', message);
    res.status(500).json({ success: false, message: 'Failed to save registration. Please try again.' });
    return;
  }

  res.status(201).json({ success: true, registrationId: row.registrationId });
});

export default router;
