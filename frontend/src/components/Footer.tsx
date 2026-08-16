import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="site">
      <div className="wrap">
        <div className="foot-grid">
          <div>
            <h4>Register to vote</h4>
            <p style={{ maxWidth: 420 }}>
              Not on the Markham voters' list? You can't vote for a trustee. It takes two minutes on your phone.
            </p>
            <Link className="btn btn-solid" style={{ marginTop: 14 }} to="/register">
              Register now
            </Link>
          </div>
          <div>
            <h4>Contact</h4>
            <p>647-989-GARI (4274)</p>
            <p>
              <a href="mailto:vote4garishan@gmail.com">vote4garishan@gmail.com</a>
            </p>
            <p>@Vote4Garishan</p>
          </div>
          <div>
            <h4>Election</h4>
            <p>Voting: Oct 16–26, 2026</p>
            <p>Markham wards 5 &amp; 7</p>
            <p>
              <a href="https://electionsmarkham.ca" target="_blank" rel="noopener noreferrer">
                electionsmarkham.ca
              </a>
            </p>
          </div>
        </div>
        <div className="foot-bottom">
          <span>Authorized by the campaign of Garishan Ravishankar.</span>
          <span>vote4garishan.ca</span>
        </div>
      </div>
    </footer>
  );
}
