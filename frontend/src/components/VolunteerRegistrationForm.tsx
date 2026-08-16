import { useState, FormEvent } from 'react';
import { VolunteerEvent } from '../data/volunteerEvents';

// ── Validators ──────────────────────────────────────────────────────────────

// Accepts: 4165551234, 416-555-1234, (416) 555-1234, +14165551234, 416.555.1234
const CA_PHONE_RE = /^(\+?1[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;

function validateName(v: string): string {
  const t = v.trim();
  if (!t) return 'Full name is required.';
  if (t.length < 2) return 'Name must be at least 2 characters.';
  if (t.length > 100) return 'Name must be 100 characters or fewer.';
  return '';
}

function validatePhone(v: string): string {
  const stripped = v.replace(/\s+/g, '');
  if (!stripped) return 'Phone number is required.';
  if (!CA_PHONE_RE.test(stripped)) return 'Enter a valid Canadian phone number (e.g. 416-555-0100).';
  return '';
}

function validateEmail(v: string): string {
  const t = v.trim();
  if (!t) return 'Email address is required.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t)) return 'Enter a valid email address.';
  return '';
}

// ── Date / time helpers (self-contained so the component is portable) ────────

function formatTime(t: string): string {
  const [hStr, mStr] = t.split(':');
  const h = Number(hStr);
  const suffix = h >= 12 ? 'pm' : 'am';
  const hour = h % 12 || 12;
  return `${hour}:${mStr} ${suffix}`;
}

function formatDisplayDate(isoDate: string): string {
  const [y, mo, d] = isoDate.split('-').map(Number);
  return new Date(y, mo - 1, d).toLocaleDateString('en-CA', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

// ── Component ────────────────────────────────────────────────────────────────

interface Props {
  event: VolunteerEvent;
  /** Close the detail panel entirely (used by success "Close" button). */
  onClose: () => void;
  /** Cancel back to the event detail view without closing the panel. */
  onCancel: () => void;
}

type SubmitState = 'idle' | 'submitting' | 'success' | 'error';

export default function VolunteerRegistrationForm({ event, onClose, onCancel }: Props) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({ name: '', phone: '', email: '' });
  const [touched, setTouched] = useState({ name: false, phone: false, email: false });
  const [submitState, setSubmitState] = useState<SubmitState>('idle');
  const [didSubmit, setDidSubmit] = useState(false);

  function currentErrors(n = name, p = phone, e = email) {
    return { name: validateName(n), phone: validatePhone(p), email: validateEmail(e) };
  }

  function handleBlur(field: 'name' | 'phone' | 'email') {
    setTouched(t => ({ ...t, [field]: true }));
    setErrors(ex => ({ ...ex, [field]: currentErrors()[field] }));
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (didSubmit || submitState === 'submitting') return;

    const errs = currentErrors();
    setErrors(errs);
    setTouched({ name: true, phone: true, email: true });
    if (errs.name || errs.phone || errs.email) return;

    setDidSubmit(true);
    setSubmitState('submitting');

    const BACKEND = import.meta.env.VITE_API_URL ?? 'http://localhost:3001';

    fetch(`${BACKEND}/api/volunteer`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        eventId:   event.id,
        campaign:  event.name,
        date:      event.date,
        startTime: event.startTime,
        endTime:   event.endTime,
        location:  event.location,
        name:      name.trim(),
        phone:     phone.trim(),
        email:     email.trim(),
      }),
    })
      .then(async res => {
        if (res.ok) {
          setSubmitState('success');
        } else {
          setDidSubmit(false);
          setSubmitState('error');
        }
      })
      .catch(() => {
        setDidSubmit(false);
        setSubmitState('error');
      });
  }

  // ── Success state ──────────────────────────────────────────────────────────

  if (submitState === 'success') {
    return (
      <div className="vreg-success">
        <p className="eyebrow" style={{ marginBottom: 10 }}>You&apos;re registered!</p>
        <p style={{ margin: '0 0 8px', fontSize: 18, fontWeight: 700, color: 'var(--ink)' }}>
          {event.name}
        </p>
        <p style={{ color: 'var(--slate)', lineHeight: 1.65, fontSize: 15 }}>
          Thanks for signing up to volunteer. We&apos;ll be in touch with final details
          closer to <strong>{formatDisplayDate(event.date)}</strong>.
        </p>
        <button
          className="btn btn-outline on-light"
          style={{ marginTop: 24 }}
          onClick={onClose}
        >
          Close
        </button>
      </div>
    );
  }

  // ── Form state ─────────────────────────────────────────────────────────────

  const isSubmitting = submitState === 'submitting';

  return (
    <form className="vreg-form" onSubmit={handleSubmit} noValidate>
      <p className="eyebrow" style={{ marginBottom: 10 }}>Register to volunteer</p>

      {/* ── Event summary ── */}
      <div className="vreg-event-info">
        <div className="vreg-info-row">
          <span className="vreg-info-label">Campaign</span>
          <span>{event.name}</span>
        </div>
        <div className="vreg-info-row">
          <span className="vreg-info-label">Date</span>
          <span>{formatDisplayDate(event.date)}</span>
        </div>
        <div className="vreg-info-row">
          <span className="vreg-info-label">Time</span>
          <span>{formatTime(event.startTime)}&thinsp;&ndash;&thinsp;{formatTime(event.endTime)}</span>
        </div>
        <div className="vreg-info-row">
          <span className="vreg-info-label">Location</span>
          <span>{event.location}</span>
        </div>
      </div>

      {/* ── Fields ── */}
      <div className="vreg-fields">
        <div className={`field${touched.name && errors.name ? ' vreg-field-err' : ''}`}>
          <label htmlFor="vreg-name">
            Full Name <span aria-hidden="true">*</span>
          </label>
          <input
            id="vreg-name"
            type="text"
            value={name}
            autoComplete="name"
            aria-required="true"
            aria-invalid={touched.name && !!errors.name}
            aria-describedby={touched.name && errors.name ? 'vreg-name-err' : undefined}
            onChange={e => {
              setName(e.target.value);
              if (touched.name) setErrors(ex => ({ ...ex, name: validateName(e.target.value) }));
            }}
            onBlur={() => handleBlur('name')}
          />
          {touched.name && errors.name && (
            <span id="vreg-name-err" className="vreg-err-msg" role="alert">
              {errors.name}
            </span>
          )}
        </div>

        <div className={`field${touched.phone && errors.phone ? ' vreg-field-err' : ''}`}>
          <label htmlFor="vreg-phone">
            Phone Number <span aria-hidden="true">*</span>
          </label>
          <input
            id="vreg-phone"
            type="tel"
            value={phone}
            autoComplete="tel"
            placeholder="416-555-0100"
            aria-required="true"
            aria-invalid={touched.phone && !!errors.phone}
            aria-describedby={touched.phone && errors.phone ? 'vreg-phone-err' : undefined}
            onChange={e => {
              setPhone(e.target.value);
              if (touched.phone) setErrors(ex => ({ ...ex, phone: validatePhone(e.target.value) }));
            }}
            onBlur={() => handleBlur('phone')}
          />
          {touched.phone && errors.phone && (
            <span id="vreg-phone-err" className="vreg-err-msg" role="alert">
              {errors.phone}
            </span>
          )}
        </div>

        <div className={`field${touched.email && errors.email ? ' vreg-field-err' : ''}`}>
          <label htmlFor="vreg-email">
            Email Address <span aria-hidden="true">*</span>
          </label>
          <input
            id="vreg-email"
            type="email"
            value={email}
            autoComplete="email"
            aria-required="true"
            aria-invalid={touched.email && !!errors.email}
            aria-describedby={touched.email && errors.email ? 'vreg-email-err' : undefined}
            onChange={e => {
              setEmail(e.target.value);
              if (touched.email) setErrors(ex => ({ ...ex, email: validateEmail(e.target.value) }));
            }}
            onBlur={() => handleBlur('email')}
          />
          {touched.email && errors.email && (
            <span id="vreg-email-err" className="vreg-err-msg" role="alert">
              {errors.email}
            </span>
          )}
        </div>
      </div>

      {submitState === 'error' && (
        <p className="vreg-submit-err" role="alert">
          Something went wrong — please try again.
        </p>
      )}

      <div className="cta-row" style={{ marginTop: 24 }}>
        <button type="submit" className="btn btn-solid" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting\u2026' : 'Submit registration'}
        </button>
        <button
          type="button"
          className="btn btn-outline on-light"
          disabled={isSubmitting}
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
