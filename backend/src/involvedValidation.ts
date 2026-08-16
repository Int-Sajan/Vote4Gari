export interface InvolvedRegistrationBody {
  name: string;
  email: string;
  mobile: string;
  postal: string;
  lang: string;
  remind: string;
  sign: string;
  volunteer: string;
}

export interface ValidationError {
  field: string;
  message: string;
}

const CA_PHONE_RE = /^(\+?1[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;
const POSTAL_RE = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/;

function isNonEmptyString(v: unknown): v is string {
  return typeof v === 'string' && v.trim().length > 0;
}

function normalizeYesNo(value: unknown): string {
  if (typeof value === 'boolean') return value ? 'Yes' : 'No';
  if (typeof value === 'string') {
    const trimmed = value.trim();
    if (trimmed === 'Yes' || trimmed === 'No') return trimmed;
  }
  return 'No';
}

export function validateInvolvedRegistration(body: unknown): ValidationError[] {
  const errors: ValidationError[] = [];

  if (typeof body !== 'object' || body === null) {
    return [{ field: 'body', message: 'Request body must be a JSON object.' }];
  }

  const b = body as Record<string, unknown>;

  const name = typeof b.name === 'string' ? b.name.trim() : '';
  if (!name) {
    errors.push({ field: 'name', message: 'Name is required.' });
  } else if (name.length < 2) {
    errors.push({ field: 'name', message: 'Name must be at least 2 characters.' });
  } else if (name.length > 100) {
    errors.push({ field: 'name', message: 'Name must be 100 characters or fewer.' });
  }

  const email = typeof b.email === 'string' ? b.email.trim() : '';
  const mobile = typeof b.mobile === 'string' ? b.mobile.replace(/\s+/g, '') : '';
  if (!email && !mobile) {
    errors.push({ field: 'email', message: 'Provide at least an email or mobile number.' });
    errors.push({ field: 'mobile', message: 'Provide at least an email or mobile number.' });
  }

  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.push({ field: 'email', message: 'Enter a valid email address.' });
  }

  if (mobile && !CA_PHONE_RE.test(mobile)) {
    errors.push({ field: 'mobile', message: 'Enter a valid phone number with at least 10 digits.' });
  }

  const postal = typeof b.postal === 'string' ? b.postal.trim() : '';
  if (postal && !POSTAL_RE.test(postal)) {
    errors.push({ field: 'postal', message: 'Enter a valid postal code, for example L3S 0A0.' });
  }

  if (!isNonEmptyString(b.lang)) {
    errors.push({ field: 'lang', message: 'Best language is required.' });
  }

  // Normalize/validate optional yes-no values if supplied.
  const remind = normalizeYesNo(b.remind);
  const sign = normalizeYesNo(b.sign);
  const volunteer = normalizeYesNo(b.volunteer);
  void remind;
  void sign;
  void volunteer;

  return errors;
}
