import { FormEvent, useRef, useState } from 'react';
import { clearCustomValidity, setCustomValidity, validateEmail } from '../lib/forms';

type SubmitState = 'idle' | 'submitting' | 'success' | 'error';

export default function ContactPage() {
  const [submitState, setSubmitState] = useState<SubmitState>('idle');
  const didSubmit = useRef(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (didSubmit.current || submitState === 'submitting') return;

    const form = e.currentTarget;
    const fd = new FormData(form);

    const name = String(fd.get('name') || '').trim();
    const email = String(fd.get('email') || '').trim();
    const msg = String(fd.get('message') || '').trim();
    const nameInput = form.elements.namedItem('name') as HTMLInputElement;
    const emailInput = form.elements.namedItem('email') as HTMLInputElement;
    const messageInput = form.elements.namedItem('message') as HTMLTextAreaElement;

    clearCustomValidity(nameInput, emailInput, messageInput);

    if (!name) {
      setCustomValidity(nameInput, 'Name is required.');
    } else if (name.length < 2) {
      setCustomValidity(nameInput, 'Name must be at least 2 characters.');
    }

    if (!email) {
      setCustomValidity(emailInput, 'Email is required.');
    } else if (!validateEmail(email, true)) {
      setCustomValidity(emailInput, 'Enter a valid email address.');
    }

    if (!msg) {
      setCustomValidity(messageInput, 'Message is required.');
    } else if (msg.length < 10) {
      setCustomValidity(messageInput, 'Message must be at least 10 characters.');
    }

    if (!form.reportValidity()) {
      return;
    }

    didSubmit.current = true;
    setSubmitState('submitting');

    const BACKEND = import.meta.env.VITE_API_URL ?? 'http://localhost:3001';

    try {
      const res = await fetch(`${BACKEND}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message: msg }),
      });
      if (res.ok) {
        setSubmitState('success');
        form.reset();
      } else {
        didSubmit.current = false;
        setSubmitState('error');
      }
    } catch {
      didSubmit.current = false;
      setSubmitState('error');
    }
  }

  return (
    <>
      <section className="dark" style={{ paddingTop: 56 }}>
        <div className="wrap">
          <p className="eyebrow">Contact</p>
          <h2 className="section-title" style={{ color: '#fff' }}>Get in touch.</h2>
        </div>
      </section>
      <section>
        <div className="wrap">
          <div className="split">
            <div>
              <p className="eyebrow">Reach the campaign</p>
              <p style={{ fontSize: 22, fontWeight: 700, color: 'var(--ink)', margin: '10px 0 22px' }}>647-989-GARI (4274)</p>
              <p className="lede"><a href="mailto:vote4garishan@gmail.com" style={{ color: 'var(--signal)', textDecoration: 'underline' }}>vote4garishan@gmail.com</a></p>
              <p className="lede">@Vote4Garishan</p>
              <p className="lede">vote4garishan.ca</p>
              <hr className="rule-thin" style={{ margin: '28px 0' }} />
              <p className="fine">Authorized by the campaign of Garishan Ravishankar.</p>
            </div>
            <div className="form-card">
              <p className="eyebrow" style={{ marginBottom: 6 }}>Send a message</p>
              <h3 style={{ margin: '0 0 20px', fontSize: 20, color: 'var(--ink)' }}>Ask Gari a question</h3>
              <form id="contactForm" onSubmit={onSubmit}>
                <div className="field"><label htmlFor="c-name">Name</label><input id="c-name" name="name" type="text" autoComplete="name" minLength={2} required /></div>
                <div className="field"><label htmlFor="c-email">Email</label><input id="c-email" name="email" type="email" autoComplete="email" required /></div>
                <div className="field"><label htmlFor="c-msg">Message</label><textarea id="c-msg" name="message" rows={4} minLength={10} required /></div>
                <button type="submit" className="btn btn-solid" disabled={submitState === 'submitting'}>
                  {submitState === 'submitting' ? 'Sending\u2026' : 'Send message'}
                </button>
                {submitState === 'success' && (
                  <div className="confirm-msg" id="c-confirm" style={{ display: 'block' }}>
                    Message sent \u2014 thank you! Gari&apos;s team will be in touch soon.
                  </div>
                )}
                {submitState === 'error' && (
                  <div className="confirm-msg" id="c-confirm" style={{ display: 'block', borderColor: 'var(--signal)' }}>
                    Something went wrong \u2014 please try again or email{' '}
                    <a href="mailto:vote4garishan@gmail.com" style={{ color: 'var(--signal)' }}>vote4garishan@gmail.com</a> directly.
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
