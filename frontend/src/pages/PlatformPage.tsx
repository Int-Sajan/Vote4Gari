import { Link } from 'react-router-dom';

export default function PlatformPage() {
  return (
    <>
      <section className="dark page-hero">
        <div className="wrap">
          <p className="eyebrow">What I will work on</p>
          <h2 className="section-title">Five priorities.</h2>
          <p className="lede">In his own words.</p>
        </div>
      </section>
      <section>
        <div className="wrap">
          <div className="priority-list">
            <div className="priority">
              <div className="num">01</div>
              <div><h3>Accessible Student Mental Health Support</h3><p>Measured counsellor caseloads and wait times the board has to publish.</p></div>
            </div>
            <div className="priority">
              <div className="num">02</div>
              <div><h3>Cyberbullying</h3><p>One reporting path across all 18 schools, with an answer inside five school days.</p></div>
            </div>
            <div className="priority">
              <div className="num">03</div>
              <div><h3>Clear rules for AI</h3><p>Written limits on what AI may do with your child&apos;s work and your child&apos;s data.</p></div>
            </div>
            <div className="priority">
              <div className="num">04</div>
              <div><h3>Drug use, prevention, and harm reduction</h3><p>Prevention through the lens of awareness, education, and accessible support services.</p></div>
            </div>
            <div className="priority">
              <div className="num">05</div>
              <div><h3>Equitable Feedback Platforms</h3><p>Create future channels for students and guardians to correspond with feedback.</p></div>
            </div>
          </div>
        </div>
      </section>

      <div className="callout">
        <div className="wrap">
          <h3>Have a question about the platform?</h3>
          <Link className="btn btn-outline" to="/contact">Ask Gari directly</Link>
        </div>
      </div>
    </>
  );
}
