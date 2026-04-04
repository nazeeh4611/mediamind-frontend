import React from "react";
import {
  BarChart2,
  Globe,
  Zap,
  Sparkles,
  MousePointer2,
  Layers,
  Code2,
  Search,
  Share2
} from "lucide-react";

export const WHITE = '#ffffff';
export const OFF_WHITE = '#f8f9fc';
export const INK = '#111111';
export const INK60 = 'rgba(17,17,17,.6)';
export const INK30 = 'rgba(17,17,17,.3)';
export const INK20 = 'rgba(17,17,17,.2)';
export const INK10 = 'rgba(17,17,17,.08)';
export const BLUE_DARK = '#1a3a6b';
export const GRAD_HERO = 'linear-gradient(135deg, #e8f4ff 0%, #f0f8ff 40%, #fef6ee 100%)';
export const ORANGE = '#f97316';
export const PURPLE = '#8b5cf6';
export const GREEN = '#22c55e';
export const PINK = '#ec4899';
export const YELLOW = '#eab308';
export const TEAL = '#14b8a6';
export const LAVENDER = '#e8e4f8';
export const SOFT_BLUE = '#dbeafe';
export const SOFT_GREEN = '#dcfce7';
export const SOFT_ORANGE = '#fff7ed';
export const SOFT_PINK = '#fce7f3';
export const SOFT_YELLOW = '#fefce8';
export const SOFT_TEAL = '#ccfbf1';

export const heroWords = ['Digital Marketing', 'Web Development', 'SEO', 'Branding', 'Performance Marketing', 'Social Media'];

export const services = [
  { title: 'Social Media Marketing', tag: 'Social', bg: SOFT_BLUE, accent: '#3b82f6', img: '/social.avif', stat: '400%', statLabel: 'Engagement Growth', icon: <BarChart2 size={20} /> },
  { title: 'Website Development', tag: 'Development', bg: SOFT_ORANGE, accent: ORANGE, img: '/web.avif', stat: '2.4s', statLabel: 'Avg Load Time', icon: <Globe size={20} /> },
  { title: 'SEO & Google Ads', tag: 'SEO / PPC', bg: SOFT_GREEN, accent: '#16a34a', img: '/seo.avif', stat: '8×', statLabel: 'Avg ROAS', icon: <Zap size={20} /> },
  { title: 'Branding & Identity', tag: 'Branding', bg: SOFT_YELLOW, accent: YELLOW, img: '/brand.avif', stat: '150+', statLabel: 'Brands Built', icon: <Sparkles size={20} /> },
  { title: 'NFC Smart Cards', tag: 'Technology', bg: SOFT_TEAL, accent: TEAL, img: '/nfchom.avif', stat: '1 Tap', statLabel: 'Instant Sharing', icon: <MousePointer2 size={20} /> },
  // { title: 'Performance Marketing', tag: 'Paid Ads', bg: SOFT_PINK, accent: PINK, img: '/logo.avif', stat: '$50M+', statLabel: 'Revenue Generated', icon: <Layers size={20} /> },
];

export const serviceCategories = [
  { label: 'Digital Marketing', icon: <BarChart2 size={22} />, color: '#3b82f6', bg: SOFT_BLUE },
  { label: 'Web Development', icon: <Code2 size={22} />, color: ORANGE, bg: SOFT_ORANGE },
  { label: 'SEO Optimisation', icon: <Search size={22} />, color: '#16a34a', bg: SOFT_GREEN },
  { label: 'Performance Marketing', icon: <Zap size={22} />, color: YELLOW, bg: SOFT_YELLOW },
  { label: 'Social Media', icon: <Share2 size={22} />, color: PURPLE, bg: LAVENDER },
];

export const scrollingServices = [
  {
    tag: 'Search Engine Optimization',
    title: 'Rank #1 On\nSearch Engine',
    desc: 'Your business deserves organic growth...',
    bg: '#c2d9e5',
    accent: '#0d9488',
    img: '/seocard.avif',
    color: '#0d9488',
    decorColor: 'rgba(13,148,136,0.15)',
    route: '/services/seo'
  },
  {
    tag: 'Social Media Marketing',
    title: 'Build Brands That People Follow',
    desc: 'Unlock the full potential...',
    bg: 'linear-gradient(135deg,#d8b4fe,#a78bfa)',
    accent: '#7c3aed',
    img: '/social.avif',
    color: '#7c3aed',
    decorColor: 'rgba(124,58,237,0.15)',
    route: '/services/social-media-marketing'
  },
  {
    tag: 'Web Development',
    title: 'Websites That Work Wonders',
    desc: 'From concept to launch...',
    bg: 'linear-gradient(135deg,#fed7aa,#fb923c)',
    accent: '#ea580c',
    img: '/webcard.avif',
    color: '#ea580c',
    decorColor: 'rgba(234,88,12,0.15)',
    route: '/services/website-development'
  },
  {
    tag: 'Branding',
    title: 'Create Captivating Experiences',
    desc: 'We are a creative agency...',
    bg: 'linear-gradient(135deg,#bbf7d0,#4ade80)',
    accent: '#15803d',
    img: '/brandcard.avif',
    color: '#15803d',
    decorColor: 'rgba(21,128,61,0.15)',
    route: '/services/branding-graphic-design'
  },
];

export const testimonials = [
  {
    company: 'Kido Protect',
    logo: null,
    quote: 'Socio is hands on one of the best digital marketing companies I have worked in dubai. They successfully accomplished my tasks, thanks to an incredible project management workflow and a communicative approach that help me maintain a solid partnership with them. Their professionalism also fosters ongoing collaboration.',
    rating: 5,
    platform: 'Clutch',
  },
  {
    company: 'REACH',
    logo: null,
    quote: 'We partnered with Socio when we took a complete business center in Media City. Their innovative marketing strategies have helped us scale our business to another level. They work as part of a cohesive team, where everyone contributes equally to accomplish each task.',
    rating: 5,
    platform: 'Clutch',
  },
  {
    company: 'AKG Contracting',
    logo: null,
    quote: "We worked with them on two projects and both were delivered on time and as per our expectations. Thanks to Socio's effort, we enjoy an increase in engagement, followers, and website traffic. Their innovative approach, collaborative process, and adaptability are hallmarks of customer satisfaction.",
    rating: 5,
    platform: 'Clutch',
  },
  {
    company: 'Pink Bling',
    logo: null,
    quote: 'I worked with their team on my homegrown jewelry brand, and they helped me create complete branding for my company. The experience was nothing short of amazing, as they were highly communicative and helped bring my vision to life. They also designed a beautiful Shopify website for my brand.',
    rating: 5,
    platform: 'Clutch',
  },
];

export const clients = [
  'Sesamead', 'REVIBE', 'ZENZ', 'MOAI Connect', 'Ferrari World',
  'Signature Collection Realty', 'Connection Chauffeur Limo', 'day cleaner°',
  'GEMY MAALOUF', 'HRG Investment Group', 'AKG Contracting', 'AB Distribution',
  'REACH', 'Maple & Rose', 'Exotic Chair',
];

export const blogs = [
  { category: 'DIGITAL MARKETING', title: "Boost Sales Fast: Secrets from Dubai's Social Media Pros", date: 'Feb 12, 2026', img: '/social.avif' },
  { category: 'DIGITAL MARKETING', title: 'Best Free Tools for AI Ad Variations', date: 'Feb 6, 2026', img: '/seo.avif' },
  { category: 'SEO', title: 'What Are Content Clusters and Why They Boost Rankings', date: 'Jan 26, 2026', img: '/brand.avif' },
];

export const stats = [
  { v: '200+', l: 'Clients Served' },
  { v: '98%', l: 'Client Retention' },
  { v: '8×', l: 'Avg. ROAS' },
  { v: '$50M+', l: 'Revenue Generated' },
];

export const marqItems = [
  'Social Media Marketing', 'Logo & Brand Identity', 'Website Development',
  'Google & Meta Ads', 'NFC Business Cards', 'SEO Optimisation',
  'Graphic Design', 'Email Marketing', 'Performance Marketing',
];