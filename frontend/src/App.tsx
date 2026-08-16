import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import PlatformPage from './pages/PlatformPage';
import WardPage from './pages/WardPage';
import GetInvolvedPage from './pages/GetInvolvedPage';
import DonatePage from './pages/DonatePage';
import ContactPage from './pages/ContactPage';
import RegisterPage from './pages/RegisterPage';
import VolunteerPage from './pages/VolunteerPage';

const hashToRoute: Record<string, string> = {
  '#home': '/',
  '#about': '/about',
  '#platform': '/platform',
  '#ward': '/ward',
  '#involved': '/get-involved',
  '#donate': '/donate',
  '#contact': '/contact',
  '#register': '/register'
};

function HashCompat() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const hash = window.location.hash;
    if (hash && hashToRoute[hash] && location.pathname !== hashToRoute[hash]) {
      navigate(hashToRoute[hash], { replace: true });
    }
  }, [location.pathname, navigate]);

  return null;
}

export default function App() {
  return (
    <Layout>
      <HashCompat />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/platform" element={<PlatformPage />} />
        <Route path="/ward" element={<WardPage />} />
        <Route path="/get-involved" element={<GetInvolvedPage />} />
        <Route path="/donate" element={<DonatePage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/volunteer" element={<VolunteerPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
}
