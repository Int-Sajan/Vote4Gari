import { Link } from 'react-router-dom';

export default function AboutPage() {
  return (
    <>
      <section className="dark page-hero">
        <div className="wrap">
          <p className="eyebrow">About</p>
          <h2 className="section-title">Gari Ravishankar</h2>
          <p className="lede">Candidate for YRDSB Public School Board Trustee - Ward 5 &amp; 7, Markham</p>
        </div>
      </section>
      <section>
        <div className="wrap">
          <div className="split">
            <div>
              <img src="/Resources/image-3.jpg" alt="Garishan Ravishankar with residents" />
            </div>
            <div>
              <p className="lede">
                My journey has been rooted in public service, community leadership, and education. I have a legal background and have worked with the Ministry of the Attorney General, the Government of Canada, and community organizations, while also spending time mentoring and working with young people through educational and public-speaking programs.
              </p>
              <p className="lede">Through these experiences, I&apos;ve seen firsthand how important strong leadership, advocacy, and access to opportunity are for our communities and for our students.</p>
              <p className="lede">I&apos;m running because I believe our schools need trustees who will listen to parents, students and educators, advocate for our schools, and bring people together to find practical solutions.</p>
              <p className="lede">This campaign is about putting students first, strengthening our schools, and building a school system where every student has the opportunity to succeed.</p>
              <p className="lede">I would be incredibly grateful for your support, encouragement, and help spreading the word. If you know someone in Ward 5 &amp; 7, please feel free to share this page with them.</p>
              <hr className="rule" />
              <p style={{ fontWeight: 700, color: 'var(--ink)', margin: 0 }}>Gari Ravishankar</p>
              <p className="mono" style={{ fontSize: 13, color: 'var(--mist)', margin: '4px 0 0' }}>Candidate for YRDSB Public School Board Trustee - Ward 5 &amp; 7 · Markham</p>
              <div className="cta-row" style={{ marginTop: 26 }}>
                <Link className="btn btn-solid" to="/platform">See the platform</Link>
                <Link className="btn btn-outline on-light" to="/get-involved">Volunteer</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
