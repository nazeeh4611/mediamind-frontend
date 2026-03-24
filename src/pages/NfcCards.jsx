import React from 'react';
import ServiceDetailTemplate from '../components/Servicedetailtemplate';

export default function NfcCards() {
  return (
    <ServiceDetailTemplate
      icon="📲"
      title="NFC Digital Business Cards"
      metric="100+"
      metricLabel="Cards Delivered"
      heroDesc="Smart NFC business cards that share your contact, website, social media, and portfolio instantly with just one tap. Custom designed, premium printed, and fully programmed."
      accentColor="#814B97"
      image="https://images.pexels.com/photos/3760069/pexels-photo-3760069.jpeg?auto=compress&cs=tinysrgb&w=800"
      features={[
        { icon: '🎴', title: 'Custom Card Design', desc: 'Premium card designs tailored to your brand with your logo, colors, and preferred layout.' },
        { icon: '🖨️', title: 'Premium Printing', desc: 'High-quality printing on premium materials including matte, gloss, and metal finishes.' },
        { icon: '🔗', title: 'NFC Chip Programming', desc: 'Chip programmed with your contact details, website, portfolio, and social media links.' },
        { icon: '🌐', title: 'Digital Profile Page', desc: 'Personalized landing page that opens when tapped — fully customizable with your brand.' },
        { icon: '💬', title: 'WhatsApp Integration', desc: 'One-tap WhatsApp chat direct from your digital profile.' },
        { icon: '📱', title: 'Social Media Links', desc: 'All your social platforms in one place — Instagram, LinkedIn, TikTok, and more.' },
      ]}
      process={[
        { title: 'Design Consultation', desc: 'We discuss your brand, preferences, and what information you want to share on your NFC card.' },
        { title: 'Card Design', desc: 'Custom card design created with your logo, colors, and branding elements.' },
        { title: 'Digital Profile Setup', desc: 'Build your personalized digital landing page with all your links and information.' },
        { title: 'Programming & Delivery', desc: 'NFC chip programmed and cards printed, then delivered to your door ready to use.' },
      ]}
      results={[
        { value: '100+', label: 'Cards Delivered', sub: 'To UAE professionals' },
        { value: '1 Tap', label: 'Share Everything', sub: 'Contact + portfolio + social' },
        { value: 'No App', label: 'Required', sub: 'Works with any smartphone' },
        { value: 'Instant', label: 'Connection', sub: 'Tap and share instantly' },
      ]}
    />
  );
}