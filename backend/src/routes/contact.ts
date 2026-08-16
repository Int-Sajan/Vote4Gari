import { Router, Request, Response } from 'express';
import { validateContact, ContactBody } from '../contactValidation';
import { sendContactEmail } from '../mailer';

const router = Router();

/**
 * POST /api/contact
 *
 * Body: { name, email, message }
 *
 * Responses:
 *   200  { success: true }
 *   400  { success: false, errors: ValidationError[] }
 *   500  { success: false, message: string }
 */
router.post('/', async (req: Request, res: Response): Promise<void> => {
  // ── 1. Validate ────────────────────────────────────────────────────────────
  const errors = validateContact(req.body);
  if (errors.length > 0) {
    res.status(400).json({ success: false, errors });
    return;
  }

  const body = req.body as ContactBody;

  // ── 2. Send email ──────────────────────────────────────────────────────────
  try {
    await sendContactEmail({
      name:    body.name.trim(),
      email:   body.email.trim(),
      message: body.message.trim(),
    });
  } catch (err) {
    const details =
      err instanceof Error
        ? {
            name: err.name,
            message: err.message,
            type: (err as { type?: unknown }).type,
            status: (err as { status?: unknown }).status,
            code: (err as { code?: unknown }).code,
            cause: (err as { cause?: unknown }).cause,
            stack: err.stack,
          }
        : { value: err };

    // Log raw operational error details for local debugging. This does not
    // include API keys/passwords because we only log the caught exception object.
    console.error('[POST /api/contact] Email error details:', details);
    res.status(500).json({ success: false, message: 'Failed to send message. Please try again.' });
    return;
  }

  res.status(200).json({ success: true });
});

export default router;
