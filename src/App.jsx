import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Services from './pages/Services';
import About from './pages/About';
import Contact from './pages/Contact';
import PerformanceMarketing from './pages/Performancemarketing';
import NfcCards from './pages/NfcCards';
import WorkDetail from './pages/Workdetail';
import Works from './pages/Works';
import AdminApp from './components/Adminapp';
import SEO from './pages/Seo';
import WebDesign from './pages/WebsiteDevelopment';
import Branding from './pages/Highconversiondesign';
import EmailMarketing from './pages/Email';
import NFCSolutions from './pages/Nfc';
import LogoDesigning from './pages/LogoDesign';
import SocialMediaMarketing from './pages/Contentcreation';

// ScrollToTop component to scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function AppRoutes() {
  const { pathname } = useLocation();
  const isAdmin = pathname.startsWith('/admin');

  return (
    <>
      <ScrollToTop />
      {!isAdmin && <Navbar />}

      <Routes>
        {/* Main Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/works" element={<Works />} />
        <Route path="/works/:id" element={<WorkDetail />} />

        {/* Service Detail Pages */}
        <Route path="/services/social-media-marketing" element={<SocialMediaMarketing />} />
        <Route path="/services/website-development" element={<WebDesign />} />
        <Route path="/services/seo-google-ads" element={<PerformanceMarketing />} />
        <Route path="/services/branding-graphic-design" element={<Branding/>} />
        <Route path="/services/logo-design" element={<LogoDesigning />} />
        <Route path="/services/nfc-cards" element={<NfcCards />} />
        <Route path="/services/seo" element={<SEO />} />
        <Route path="/services/email-marketing" element={<EmailMarketing />} />
        <Route path="/services/nfc-solutions" element={<NFCSolutions />} />
   
        {/* Admin */}
        <Route path="/admin/*" element={<AdminApp />} />
      </Routes>

      {!isAdmin && <Footer />}
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}