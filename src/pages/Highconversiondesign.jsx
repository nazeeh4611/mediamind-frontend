import React from 'react';
import ServiceDetailTemplate from '../components/Servicedetailtemplate';

export default function HighConversionDesign() {
  return (
    <ServiceDetailTemplate
      icon="🎨"
      title="High-Conversion Design"
      metric="85%"
      metricLabel="Mobile Optimized"
      heroDesc="Landing pages and funnels designed to maximize ROI. Every pixel is intentional. Every CTA is tested. We combine data-driven design principles with stunning aesthetics to build pages that convert visitors into customers."
      accentColor="#814B97"
      features={[
        { icon: '🚀', title: 'Landing Page Design', desc: 'High-converting landing pages built around your offer, audience psychology, and conversion goals.' },
        { icon: '🔀', title: 'Sales Funnels', desc: 'Multi-step funnels with upsells, downsells, and order bumps designed to maximize average order value.' },
        { icon: '📱', title: 'Mobile-First Design', desc: 'Every design starts mobile, ensuring flawless experience across all devices and screen sizes.' },
        { icon: '🧪', title: 'A/B Testing', desc: 'Systematic split testing of headlines, CTAs, layouts, and offers to continuously improve conversion rate.' },
        { icon: '⚡', title: 'Performance Optimization', desc: 'Lightning-fast load times with Core Web Vitals optimization for both UX and SEO.' },
        { icon: '🎯', title: 'CRO Consulting', desc: 'In-depth conversion rate audits with prioritized recommendations backed by heatmap and session data.' },
      ]}
      process={[
        { title: 'Research & Strategy', desc: 'We study your audience, competitors, and existing data to identify the highest-impact design opportunities.' },
        { title: 'Wireframe & Design', desc: 'Create conversion-focused wireframes, then develop pixel-perfect designs with your brand guidelines.' },
        { title: 'Develop & Launch', desc: 'Build responsive, performance-optimized pages and set up tracking and analytics before launch.' },
        { title: 'Test & Iterate', desc: 'Run A/B tests, analyze results, and continuously refine the design to maximize conversion rate.' },
      ]}
      results={[
        { value: '85%', label: 'Mobile Optimized', sub: 'All pages we build' },
        { value: '+62%', label: 'Conversion Lift', sub: 'Average improvement' },
        { value: '<2s', label: 'Load Time', sub: 'Average page speed' },
        { value: '3.5x', label: 'ROI on Design', sub: 'Average client return' },
      ]}
    />
  );
}