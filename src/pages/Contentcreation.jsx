import React from 'react';
import ServiceDetailTemplate from '../components/Servicedetailtemplate';

export default function ContentCreation() {
  return (
    <ServiceDetailTemplate
      icon="🎬"
      title="Content Creation"
      metric="10M+"
      metricLabel="Views Generated"
      heroDesc="Video editing, social media content, and brand storytelling that captures attention and drives engagement at scale. We create content that doesn't just look good — it converts viewers into customers."
      accentColor="#B2278C"
      features={[
        { icon: '🎬', title: 'Video Editing', desc: 'Professional short-form and long-form video editing optimized for each platform\'s algorithm and audience.' },
        { icon: '📱', title: 'Social Media Content', desc: 'Platform-native content for Instagram, TikTok, YouTube, and LinkedIn that drives engagement and follower growth.' },
        { icon: '📖', title: 'Brand Storytelling', desc: 'Strategic narrative frameworks that communicate your brand\'s mission, values, and differentiation compellingly.' },
        { icon: '🎭', title: 'UGC & Influencer', desc: 'User-generated content campaigns and influencer collaboration management for authentic social proof.' },
        { icon: '✍️', title: 'Copywriting', desc: 'Conversion-focused copy for ads, emails, landing pages, and social content that speaks directly to your audience.' },
        { icon: '📅', title: 'Content Calendar', desc: 'Strategic content planning and scheduling with seasonal campaigns, product launches, and trend capitalization.' },
      ]}
      process={[
        { title: 'Brand Discovery', desc: 'Deep dive into your brand voice, target audience, competitive landscape, and content performance history.' },
        { title: 'Content Strategy', desc: 'Develop a comprehensive content strategy with content pillars, formats, frequencies, and distribution plan.' },
        { title: 'Production', desc: 'Create a batch of content across formats with our team of editors, designers, and copywriters.' },
        { title: 'Publish & Analyze', desc: 'Schedule and publish content, monitor performance, and optimize the strategy based on what resonates.' },
      ]}
      results={[
        { value: '10M+', label: 'Views Generated', sub: 'Across client accounts' },
        { value: '8.4%', label: 'Avg Engagement', sub: 'Industry avg is 1.2%' },
        { value: '4x', label: 'Follower Growth', sub: 'Average in 6 months' },
        { value: '65%', label: 'Content → Revenue', sub: 'Attribution rate' },
      ]}
    />
  );
}