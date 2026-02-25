import React from 'react';
import ServiceDetailTemplate from '../components/Servicedetailtemplate';

export default function CRMOptimization() {
  return (
    <ServiceDetailTemplate
      icon="⚙️"
      title="CRM Optimization"
      metric="2x"
      metricLabel="Conversion Rate"
      heroDesc="Turn your HubSpot or Salesforce into a revenue-generating machine. We build intelligent automation workflows, lead scoring systems, and pipeline structures that help your sales team close more deals with less effort."
      accentColor="#185EA7"
      features={[
        { icon: '🤖', title: 'Workflow Automation', desc: 'Build trigger-based automation sequences for lead nurturing, follow-up, and deal progression.' },
        { icon: '⭐', title: 'Lead Scoring', desc: 'Intelligent scoring models that rank leads by fit and engagement so reps focus on the highest-value opportunities.' },
        { icon: '🔗', title: 'Systems Integration', desc: 'Connect your CRM with marketing, support, and billing tools for a single source of truth.' },
        { icon: '📧', title: 'Email Sequences', desc: 'Personalized drip sequences triggered by behavior, lifecycle stage, and deal activity.' },
        { icon: '📉', title: 'Pipeline Management', desc: 'Custom pipeline stages, deal properties, and forecasting dashboards that reflect your actual sales process.' },
        { icon: '📋', title: 'Reporting & Insights', desc: 'Custom dashboards and reports that surface the metrics that actually matter to your team.' },
      ]}
      process={[
        { title: 'CRM Audit', desc: 'We map your current setup, identify data quality issues, automation gaps, and integration opportunities.' },
        { title: 'Architecture Design', desc: 'Design the optimal CRM structure: properties, pipelines, lifecycle stages, and automation logic.' },
        { title: 'Build & Configure', desc: 'Implement all workflows, sequences, integrations, and dashboards with full documentation.' },
        { title: 'Train & Optimize', desc: 'Onboard your team, monitor adoption, and iterate on the system based on real usage data.' },
      ]}
      results={[
        { value: '2x', label: 'Conversion Rate', sub: 'Average improvement' },
        { value: '35%', label: 'Faster Deals', sub: 'Sales cycle reduction' },
        { value: '90%', label: 'Data Quality', sub: 'Average score improvement' },
        { value: '4h', label: 'Saved Weekly', sub: 'Per sales rep' },
      ]}
    />
  );
}