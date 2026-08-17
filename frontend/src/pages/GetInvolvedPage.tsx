import { FormEvent, useState } from 'react';
import { clearCustomValidity, setCustomValidity, validateEmail, validatePhone, validatePostalCode } from '../lib/forms';
import { API_URL } from '../config';

type SubmitState = 'idle' | 'submitting' | 'success' | 'error';

type BackendValidationError = {
  field: string;
  message: string;
};

export default function GetInvolvedPage() {
  const [submitState, setSubmitState] = useState<SubmitState>('idle');
  const [feedback, setFeedback] = useState('');

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);

    const name = String(fd.get('name') || '').trim();
    const email = String(fd.get('email') || '').trim();
    const mobile = String(fd.get('mobile') || '').trim();
    const postal = String(fd.get('postal') || '').trim();
    const postalUpper = postal.toUpperCase();
    const lang = String(fd.get('lang') || 'English');
    const remind = fd.get('remind') ? 'Yes' : 'No';
    const sign = fd.get('sign') ? 'Yes' : 'No';
    const volunteer = fd.get('volunteer') ? 'Yes' : 'No';
    const nameInput = form.elements.namedItem('name') as HTMLInputElement;
    const emailInput = form.elements.namedItem('email') as HTMLInputElement;
    const mobileInput = form.elements.namedItem('mobile') as HTMLInputElement;
    const postalInput = form.elements.namedItem('postal') as HTMLInputElement;
    const langInput = form.elements.namedItem('lang') as HTMLSelectElement;

    clearCustomValidity(nameInput, emailInput, mobileInput, postalInput);

    if (!name) {
      setCustomValidity(nameInput, 'Name is required.');
    } else if (name.length < 2) {
      setCustomValidity(nameInput, 'Name must be at least 2 characters.');
    }

    if (!email && !mobile) {
      setCustomValidity(emailInput, 'Provide at least an email or mobile number.');
      setCustomValidity(mobileInput, 'Provide at least an email or mobile number.');
    }

    if (!validateEmail(email)) {
      setCustomValidity(emailInput, 'Enter a valid email address.');
    }

    if (!validatePhone(mobile)) {
      setCustomValidity(mobileInput, 'Enter a valid phone number with at least 10 digits.');
    }

    if (!validatePostalCode(postal)) {
      setCustomValidity(postalInput, 'Enter a valid postal code, for example L3S 0A0.');
    }

    if (!form.reportValidity()) {
      setSubmitState('idle');
      setFeedback('');
      return;
    }

    setSubmitState('submitting');
    setFeedback('');

    try {
      const response = await fetch(`${API_URL}/api/involved`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          mobile,
          postal: postalUpper,
          lang,
          remind,
          sign,
          volunteer,
        }),
      });

      const payload: { errors?: BackendValidationError[]; message?: string } = await response.json().catch(() => ({}));

      if (response.ok) {
        setSubmitState('success');
        setFeedback('Thanks — your details have been sent to Gari\'s team.');
        return;
      }

      if (response.status === 400 && Array.isArray(payload.errors)) {
        clearCustomValidity(nameInput, emailInput, mobileInput, postalInput, langInput);

        const fieldMap: Record<string, HTMLInputElement | HTMLSelectElement | null> = {
          name: nameInput,
          email: emailInput,
          mobile: mobileInput,
          postal: postalInput,
          lang: langInput,
        };

        payload.errors.forEach((error) => {
          const input = fieldMap[error.field];
          input?.setCustomValidity(error.message);
        });

        form.reportValidity();
        setSubmitState('idle');
        return;
      }

      setSubmitState('error');
      setFeedback(payload.message ?? 'Sorry — we could not save your request. Please try again.');
    } catch {
      setSubmitState('error');
      setFeedback('Sorry — we could not save your request. Please try again.');
    }
  }

  return (
    <>
      <section className="dark" style={{ paddingTop: 56 }}>
        <div className="wrap">
          <p className="eyebrow">Get involved</p>
          <h2 className="section-title" style={{ color: '#fff' }}>Keep me posted.</h2>
          <p className="lede" style={{ marginTop: 14 }}>Volunteer, take a lawn sign, or hear about school-by-school town halls throughout the year.</p>
        </div>
      </section>
      <section>
        <div className="wrap">
          <div className="split">
            <div className="form-card">
              <p className="eyebrow" style={{ marginBottom: 6 }}>Sign up</p>
              <h3 style={{ margin: '0 0 20px', fontSize: 20, color: 'var(--ink)' }}>Tell us how to reach you</h3>
              <form id="involvedForm" onSubmit={onSubmit}>
                <div className="field-row">
                  <div className="field"><label htmlFor="i-name">Name</label><input id="i-name" name="name" type="text" autoComplete="name" minLength={2} required /></div>
                  <div className="field"><label htmlFor="i-email">Email</label><input id="i-email" name="email" type="email" autoComplete="email" /></div>
                </div>
                <div className="field-row">
                  <div className="field"><label htmlFor="i-mobile">Mobile</label><input id="i-mobile" name="mobile" type="tel" autoComplete="tel" /></div>
                  <div className="field"><label htmlFor="i-postal">Postal code</label><input id="i-postal" name="postal" type="text" autoComplete="postal-code" /></div>
                </div>
                <div className="field">
                  <label htmlFor="i-lang">Best language</label>
                  <select id="i-lang" name="lang">
                    <option>English</option><option>中文 (Chinese)</option><option>தமிழ் (Tamil)</option><option>ਪੰਜਾਬੀ (Punjabi)</option><option>Other</option>
                  </select>
                </div>
                <div className="checks">
                  <label><input id="i-remind" name="remind" type="checkbox" /> Remind me on Oct 16</label>
                  <label><input id="i-sign" name="sign" type="checkbox" /> I&apos;ll take a lawn sign</label>
                  <label><input id="i-volunteer" name="volunteer" type="checkbox" /> I can volunteer</label>
                </div>
                <button className="btn btn-solid" type="submit" disabled={submitState === 'submitting'}>
                  {submitState === 'submitting' ? 'Sending…' : 'Send'}
                </button>
                <p className="fine">Giving your email or number means the campaign may contact you about this election. Ask us to stop at any time or text STOP to end contact. Collected under the Municipal Elections Act, 1996.</p>
                {submitState !== 'idle' ? (
                  <div className="confirm-msg" id="i-confirm" style={{ display: 'block' }}>
                    {feedback}
                  </div>
                ) : (
                  <div className="confirm-msg" id="i-confirm">
                    Thanks — this opens your email app with your details filled in so Gari&apos;s team can add you to the list.
                  </div>
                )}
              </form>
            </div>

            <div>
              <p className="eyebrow">School town halls</p>
              <h3 style={{ fontSize: 24, color: 'var(--ink)', margin: '8px 0 14px' }}>Online town halls, school by school.</h3>
              <p className="lede">Gari is planning a series of online town hall meetings through the year, organized by school community, so parents, students, and educators across wards 5 and 7 can ask questions directly. Dates are being scheduled. Sign up on the left to be notified as they&apos;re confirmed.</p>
              <hr className="rule-thin" style={{ margin: '28px 0' }} />
              <p className="eyebrow">Canvassing</p>
              <h3 style={{ fontSize: 24, color: 'var(--ink)', margin: '8px 0 14px' }}>Two minutes. One question.</h3>
              <p className="lede">Volunteers ask one thing at the door: are you on the Markham voters&apos; list? If not, it takes two minutes on a phone. If you&apos;d like to canvass, check &quot;I can volunteer&quot; and Gari&apos;s team will follow up with a script and a route.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
