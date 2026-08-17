import { Link } from 'react-router-dom';
import VolunteerCalendar from '../components/VolunteerCalendar';

export default function VolunteerPage() {
  return (
    <>
      <section className="dark page-hero">
        <div className="wrap">
          <p className="eyebrow">Volunteer</p>
          <h2 className="section-title">Help make this campaign happen.</h2>
          <p className="lede">Browse upcoming volunteer opportunities across wards 5 and 7. Select a date to see details and sign up.</p>
        </div>
      </section>

      <section>
        <div className="wrap">
          <p className="eyebrow">Campaign schedule</p>
          <h2 className="section-title">Upcoming opportunities.</h2>
          <hr className="rule" />
          <VolunteerCalendar />
        </div>
      </section>

      <div className="callout">
        <div className="wrap">
          <h3>Ready to get involved? Sign up and we&apos;ll be in touch.</h3>
          <Link className="btn btn-outline" to="/get-involved">Get Involved</Link>
        </div>
      </div>
    </>
  );
}
