import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="wrap">
          <div className="hero-grid">
            <div>
              <p className="eyebrow">Elect</p>
              <h1>Garishan<br />Ravishankar</h1>
              <p className="subtitle">
                Candidate for public school trustee, York Region District School Board — Markham wards 5 and 7.
              </p>
              <p className="dates mono">OCT 16 – 26, 2026</p>
              <div className="cta-row">
                <Link className="btn btn-solid" to="/register">Register to vote</Link>
                <Link className="btn btn-outline" to="/platform">See the platform</Link>
              </div>
            </div>
            <div className="hero-photo">
              <img src="/Resources/image-1.jpg" alt="Garishan Ravishankar, candidate for YRDSB public school trustee, wards 5 and 7" />
            </div>
          </div>
          <div className="hero-tags">
            <span>Students first</span>
            <span>Born and raised</span>
            <span>Proud Canadian</span>
          </div>
        </div>
      </section>

      <div className="stat-strip">
        <div className="wrap">
          <div className="stat"><div className="num">16</div><div className="label">Elementary schools</div></div>
          <div className="stat"><div className="num">2</div><div className="label">Secondary schools</div></div>
          <div className="stat"><div className="num">2</div><div className="label">Wards — M5 + M7</div></div>
          <div className="stat"><div className="num">11</div><div className="label">Days of voting</div></div>
        </div>
      </div>

      <section>
        <div className="wrap">
          <div className="split">
            <div>
              <img src="/Resources/image-2.jpg" alt="Garishan Ravishankar with community members" />
            </div>
            <div>
              <p className="eyebrow">Meet Gari</p>
              <h2 className="section-title">A trustee who listens first.</h2>
              <p className="lede">
                My journey has been rooted in public service, community leadership, and education. I&apos;ve worked with the Ministry of the Attorney General and the Government of Canada, and spent years mentoring young people through educational and public-speaking programs.
              </p>
              <p className="lede">
                I&apos;m running because our schools need trustees who listen to parents, students, and educators — and bring people together to find practical solutions.
              </p>
              <Link className="btn btn-outline on-light" style={{ marginTop: 8 }} to="/about">Read Gari&apos;s full story</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="ash">
        <div className="wrap">
          <p className="eyebrow">What I will work on</p>
          <h2 className="section-title">Five priorities.</h2>
          <div className="teaser-grid">
            <div className="cell"><span className="num">01</span><span className="t">Student mental health</span></div>
            <div className="cell"><span className="num">02</span><span className="t">Cyberbullying</span></div>
            <div className="cell"><span className="num">03</span><span className="t">Spending you can read</span></div>
            <div className="cell"><span className="num">04</span><span className="t">Clear rules for AI</span></div>
            <div className="cell"><span className="num">05</span><span className="t">Drug use &amp; prevention</span></div>
          </div>
          <Link className="btn btn-outline on-light" style={{ marginTop: 28 }} to="/platform">See the full platform</Link>
        </div>
      </section>

      <div className="callout">
        <div className="wrap">
          <h3>Know someone in ward 5 or 7? Share this page with them.</h3>
          <Link className="btn btn-outline" to="/contact">Get in touch</Link>
        </div>
      </div>
    </>
  );
}
