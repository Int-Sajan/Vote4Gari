export interface ContactBody {
  name: string;
  email: string;
  message: string;
}

export interface ValidationError {
  field: string;
  message: string;
}

export function validateContact(body: unknown): ValidationError[] {
  const errors: ValidationError[] = [];

  if (typeof body !== 'object' || body === null) {
    return [{ field: 'body', message: 'Request body must be a JSON object.' }];
  }

  const b = body as Record<string, unknown>;

  // name
  const name = typeof b.name === 'string' ? b.name.trim() : '';
  if (!name) {
    errors.push({ field: 'name', message: 'Name is required.' });
  } else if (name.length < 2) {
    errors.push({ field: 'name', message: 'Name must be at least 2 characters.' });
  } else if (name.length > 100) {
    errors.push({ field: 'name', message: 'Name must be 100 characters or fewer.' });
  }

  // email
  const email = typeof b.email === 'string' ? b.email.trim() : '';
  if (!email) {
    errors.push({ field: 'email', message: 'Email is required.' });
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.push({ field: 'email', message: 'Enter a valid email address.' });
  }

  // message
  const message = typeof b.message === 'string' ? b.message.trim() : '';
  if (!message) {
    errors.push({ field: 'message', message: 'Message is required.' });
  } else if (message.length < 10) {
    errors.push({ field: 'message', message: 'Message must be at least 10 characters.' });
  } else if (message.length > 5000) {
    errors.push({ field: 'message', message: 'Message must be 5000 characters or fewer.' });
  }

  return errors;
}
