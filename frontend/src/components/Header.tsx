import { Link, NavLink } from 'react-router-dom';
import { useState } from 'react';

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/platform', label: 'Platform' },
  { to: '/ward', label: 'The Ward' },
  { to: '/get-involved', label: 'Get Involved' },
  { to: '/volunteer', label: 'Volunteer' },
  { to: '/donate', label: 'Donate' },
  { to: '/contact', label: 'Contact' }
] as const;

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site">
      <div className="nav-row">
        <Link to="/" className="logo" onClick={() => setOpen(false)}>
          <span className="script">Garishan</span>
          <span className="caps">RAVISHANKAR</span>
        </Link>

        <button
          className="burger"
          id="burger"
          aria-label="Open menu"
          aria-expanded={open}
          onClick={() => setOpen((prev) => !prev)}
        >
          MENU
        </button>

        <nav className={`tabs ${open ? 'open' : ''}`} id="tabs">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              onClick={() => setOpen(false)}
              className={({ isActive }) => (isActive ? 'active nav-link' : 'nav-link')}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <Link to="/register" className="nav-cta" onClick={() => setOpen(false)}>
          Register to vote
        </Link>
      </div>
    </header>
  );
}
