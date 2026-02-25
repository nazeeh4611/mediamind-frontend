import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Services from './pages/Services';
import About from './pages/About';
import Contact from './pages/Contact';
import PerformanceMarketing from './pages/Performancemarketing';
import CRMOptimization from './pages/Crmoptimization';
import HighConversionDesign from './pages/Highconversiondesign';
import ContentCreation from './pages/Contentcreation';

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/performance-marketing" element={<PerformanceMarketing />} />
        <Route path="/services/crm-optimization" element={<CRMOptimization />} />
        <Route path="/services/design" element={<HighConversionDesign />} />
        <Route path="/services/content" element={<ContentCreation />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}