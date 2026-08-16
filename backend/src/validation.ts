// Server-side validation — mirrors the same rules as the frontend but lives
// entirely on the backend so clients can never bypass them.

export interface RegistrationBody {
  eventId: string;
  campaign: string;
  date: string;       // 'YYYY-MM-DD'
  startTime: string;  // 'HH:MM'
  endTime: string;    // 'HH:MM'
  location: string;
  name: string;
  phone: string;
  email: string;
}

export interface ValidationError {
  field: string;
  message: string;
}

// ── Individual field validators ──────────────────────────────────────────────

const CA_PHONE_RE = /^(\+?1[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;
const ISO_DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const TIME_RE     = /^\d{2}:\d{2}$/;

function isNonEmptyString(v: unknown): v is string {
  return typeof v === 'string' && v.trim().length > 0;
}

// ── Main validator ───────────────────────────────────────────────────────────

export function validateRegistration(body: unknown): ValidationError[] {
  const errors: ValidationError[] = [];

  if (typeof body !== 'object' || body === null) {
    return [{ field: 'body', message: 'Request body must be a JSON object.' }];
  }

  const b = body as Record<string, unknown>;

  // eventId
  if (!isNonEmptyString(b.eventId)) {
    errors.push({ field: 'eventId', message: 'eventId is required.' });
  }

  // campaign
  if (!isNonEmptyString(b.campaign)) {
    errors.push({ field: 'campaign', message: 'campaign is required.' });
  }

  // date
  if (!isNonEmptyString(b.date) || !ISO_DATE_RE.test((b.date as string).trim())) {
    errors.push({ field: 'date', message: 'date must be in YYYY-MM-DD format.' });
  }

  // startTime / endTime
  if (!isNonEmptyString(b.startTime) || !TIME_RE.test((b.startTime as string).trim())) {
    errors.push({ field: 'startTime', message: 'startTime must be in HH:MM format.' });
  }
  if (!isNonEmptyString(b.endTime) || !TIME_RE.test((b.endTime as string).trim())) {
    errors.push({ field: 'endTime', message: 'endTime must be in HH:MM format.' });
  }

  // location
  if (!isNonEmptyString(b.location)) {
    errors.push({ field: 'location', message: 'location is required.' });
  }

  // name
  const name = typeof b.name === 'string' ? b.name.trim() : '';
  if (!name) {
    errors.push({ field: 'name', message: 'Full name is required.' });
  } else if (name.length < 2) {
    errors.push({ field: 'name', message: 'Name must be at least 2 characters.' });
  } else if (name.length > 100) {
    errors.push({ field: 'name', message: 'Name must be 100 characters or fewer.' });
  }

  // phone
  const phone = typeof b.phone === 'string' ? b.phone.replace(/\s+/g, '') : '';
  if (!phone) {
    errors.push({ field: 'phone', message: 'Phone number is required.' });
  } else if (!CA_PHONE_RE.test(phone)) {
    errors.push({ field: 'phone', message: 'Enter a valid Canadian phone number (e.g. 416-555-0100).' });
  }

  // email
  const email = typeof b.email === 'string' ? b.email.trim() : '';
  if (!email) {
    errors.push({ field: 'email', message: 'Email address is required.' });
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.push({ field: 'email', message: 'Enter a valid email address.' });
  }

  return errors;
}
