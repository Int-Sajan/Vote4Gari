import { FormEvent, useState } from 'react';
import { buildMailto, clearCustomValidity, setCustomValidity, validateEmail, validatePhone, validatePostalCode } from '../lib/forms';

export default function RegisterPage() {
  const [showConfirm, setShowConfirm] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);

    const name = String(fd.get('name') || '').trim();
    const email = String(fd.get('email') || '').trim();
    const mobile = String(fd.get('mobile') || '').trim();
    const postal = String(fd.get('postal') || '').trim();
    const postalUpper = postal.toUpperCase();
    const lang = String(fd.get('lang') || 'English');
    const contact = fd.get('contact') ? 'Yes' : 'No';
    const nameInput = form.elements.namedItem('name') as HTMLInputElement;
    const emailInput = form.elements.namedItem('email') as HTMLInputElement;
    const mobileInput = form.elements.namedItem('mobile') as HTMLInputElement;
    const postalInput = form.elements.namedItem('postal') as HTMLInputElement;

    clearCustomValidity(nameInput, emailInput, mobileInput, postalInput);

    if (!name) {
      setCustomValidity(nameInput, 'Full legal name is required.');
    } else if (name.length < 2) {
      setCustomValidity(nameInput, 'Full legal name must be at least 2 characters.');
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

    if (!validatePostalCode(postal, true)) {
      setCustomValidity(postalInput, postal ? 'Enter a valid postal code, for example L3S 0A0.' : 'Postal code is required.');
    }

    if (!form.reportValidity()) {
      setShowConfirm(false);
      return;
    }

    const body = `Full legal name: ${name}\nEmail: ${email}\nMobile: ${mobile}\nPostal code: ${postalUpper}\nLanguage: ${lang}\nOK to contact: ${contact}`;
    setShowConfirm(true);
    window.location.href = buildMailto('Voter registration interest', body);
  }

  return (
    <>
      <section className="dark" style={{ paddingTop: 56, paddingBottom: 40 }}>
        <div className="wrap">
          <p className="eyebrow">Register to vote</p>
          <h2 className="section-title" style={{ color: '#fff' }}>Two minutes, and you're on the voters' list.</h2>
          <p className="lede" style={{ marginTop: 14, maxWidth: 640 }}>
            If you're not on the list, you can't vote for a trustee — even if you've lived in Markham your whole life.
            Tell us where to find you, and we'll point you straight to the official registration page.
          </p>
          <div className="ward-stats" style={{ marginTop: 32, borderColor: 'var(--hair)' }}>
            <div className="cell" style={{ borderColor: 'var(--hair)' }}><div className="num" style={{ color: '#fff' }}>18</div><div className="lab">Days to register online</div></div>
            <div className="cell" style={{ borderColor: 'var(--hair)' }}><div className="num red">Oct 26</div><div className="lab">Voting closes</div></div>
          </div>
        </div>
      </section>

      <section className="dark" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="form-card on-dark">
            <form id="registerForm" onSubmit={onSubmit}>
              <div className="field"><label htmlFor="r-name">Full legal name</label><input id="r-name" name="name" type="text" placeholder="As it appears on your ID" autoComplete="name" minLength={2} required /></div>
              <div className="field"><label htmlFor="r-email">Email</label><input id="r-email" name="email" type="email" placeholder="you@example.com" autoComplete="email" /></div>
              <div className="field-row">
                <div className="field"><label htmlFor="r-mobile">Mobile</label><input id="r-mobile" name="mobile" type="tel" placeholder="647-000-0000" autoComplete="tel" /></div>
                <div className="field"><label htmlFor="r-postal">Postal code</label><input id="r-postal" name="postal" type="text" placeholder="L3S 0A0" autoComplete="postal-code" required /></div>
              </div>
              <div className="field">
                <label htmlFor="r-lang">Language you'd rather hear from us in</label>
                <select id="r-lang" name="lang"><option>English</option><option>中文 (Chinese)</option><option>தமிழ் (Tamil)</option><option>ਪੰਜਾਬੀ (Punjabi)</option></select>
              </div>
              <div className="checks">
                <label><input id="r-contact" name="contact" type="checkbox" /> The campaign may contact me about this election. I can ask them to stop at any time.</label>
              </div>
              <div className="cta-row">
                <button type="submit" className="btn btn-solid">Continue to registration</button>
              </div>
              <p className="fine">Registration itself happens on the official government site. This campaign never sees your ID.</p>
              {showConfirm ? <div className="confirm-msg" id="r-confirm" style={{ display: 'block' }}>Thanks — this opens your email app with your details for the campaign, and electionsmarkham.ca opens in a new tab for the official registration.</div> : <div className="confirm-msg" id="r-confirm">Thanks — this opens your email app with your details for the campaign, and electionsmarkham.ca opens in a new tab for the official registration.</div>}
            </form>
          </div>

          <div className="register-block" style={{ marginTop: 48 }}>
            <div>
              <p className="eyebrow">Scan to get on the voters' list</p>
              <p className="lede" style={{ marginTop: 10 }}>vote4garishan.ca/register</p>
              <p className="register-lang">登記投票<br />வாக்காளர் பதிவு<br />ਵੋਟ ਲਈ ਰਜਿਸਟਰ ਕਰੋ</p>
            </div>
            <div className="qr-box"><img src="/Resources/image-5.png" alt="QR code linking to the voter registration page" /></div>
          </div>
        </div>
      </section>
    </>
  );
}
