import React from 'react';
import ServiceDetailTemplate from '../components/Servicedetailtemplate';

export default function PerformanceMarketing() {
  return (
    <ServiceDetailTemplate
      icon="📈"
      title="Performance Marketing"
      metric="300%"
      metricLabel="Average ROI"
      heroDesc="Meta Ads, Google Ads, and data-driven campaigns that actually convert. We build full-funnel paid media strategies that maximize every marketing dollar through rigorous testing and optimization."
      accentColor="#B2278C"
      features={[
        { icon: '🎯', title: 'Meta Ads Management', desc: 'End-to-end Facebook and Instagram campaigns including audience research, creative testing, and budget optimization.' },
        { icon: '🔍', title: 'Google Ads', desc: 'Search, Shopping, Display, and YouTube campaigns optimized for maximum conversion at minimum CPA.' },
        { icon: '🔄', title: 'Retargeting Funnels', desc: 'Multi-touch retargeting sequences that bring back lost visitors and move them toward conversion.' },
        { icon: '📊', title: 'Analytics & Attribution', desc: 'Full-funnel tracking with cross-channel attribution so you know exactly which campaigns drive revenue.' },
        { icon: '🧪', title: 'Creative Testing', desc: 'Systematic A/B testing of ad creatives, headlines, and CTAs to continuously improve performance.' },
        { icon: '⚡', title: 'Conversion Rate Optimization', desc: 'Landing page and offer optimization to maximize the conversion rate of your paid traffic.' },
      ]}
      process={[
        { title: 'Account Audit', desc: 'We review your existing ad accounts, landing pages, and tracking setup to identify quick wins and structural issues.' },
        { title: 'Strategy & Setup', desc: 'Build campaign structure, audience segments, creative briefs, and conversion tracking from the ground up.' },
        { title: 'Launch & Learn', desc: 'Deploy campaigns with controlled budgets while our system collects performance data across all variables.' },
        { title: 'Optimize & Scale', desc: 'Double down on winning combinations, cut losers fast, and scale budgets methodically with performance guardrails.' },
      ]}
      results={[
        { value: '300%', label: 'Avg ROI', sub: 'Across all clients' },
        { value: '-45%', label: 'Cost Per Lead', sub: 'Average reduction' },
        { value: '3.2x', label: 'ROAS', sub: 'Average return on ad spend' },
        { value: '60d', label: 'Break Even', sub: 'Average time to profitability' },
      ]}
    />
  );
}