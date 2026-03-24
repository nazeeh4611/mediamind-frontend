import React from 'react';
import ServiceDetailTemplate from '../components/Servicedetailtemplate';

export default function CRMOptimization() {
  return (
    <ServiceDetailTemplate
      icon="📧"
      title="Email Marketing"
      metric="2x"
      metricLabel="Conversion Rate"
      heroDesc="Turn your customer list into a revenue engine. We build intelligent email automation workflows, follow-up sequences, and lead nurturing systems that help UAE businesses close more deals with less manual effort."
      accentColor="#185EA7"
      features={[
        { icon: '🤖', title: 'Workflow Automation', desc: 'Build trigger-based automation sequences for lead nurturing, follow-up, and customer re-engagement.' },
        { icon: '⭐', title: 'Lead Nurturing', desc: 'Intelligent sequences that guide leads from first contact to purchase, tailored to their behaviour and stage.' },
        { icon: '🔗', title: 'CRM Integration', desc: 'Connect your email platform with your CRM, website, and WhatsApp for a seamless customer journey.' },
        { icon: '📧', title: 'Email Sequences', desc: 'Personalised drip sequences triggered by behaviour, lifecycle stage, and purchase activity.' },
        { icon: '📉', title: 'Funnel Optimisation', desc: 'Map and optimise every stage of your email funnel to reduce drop-off and increase conversions.' },
        { icon: '📋', title: 'Reporting & Insights', desc: 'Custom dashboards and reports surfacing open rates, click rates, and revenue attribution.' },
      ]}
      process={[
        { title: 'Audit & Strategy', desc: 'We review your current email setup, list quality, and automation gaps to build an improvement roadmap.' },
        { title: 'Sequence Design', desc: 'Design the optimal email flows: welcome series, nurture sequences, cart abandonment, and re-engagement.' },
        { title: 'Build & Configure', desc: 'Implement all automations, templates, and integrations with full tracking and testing.' },
        { title: 'Optimise & Grow', desc: 'Monitor performance, A/B test subject lines and content, and iterate to maximise revenue per subscriber.' },
      ]}
      results={[
        { value: '2x', label: 'Conversion Rate', sub: 'Average improvement' },
        { value: '35%', label: 'Faster Sales', sub: 'Sales cycle reduction' },
        { value: '4h', label: 'Saved Weekly', sub: 'Per team member' },
        { value: '50+', label: 'UAE Brands', sub: 'Active automations running' },
      ]}
    />
  );
}