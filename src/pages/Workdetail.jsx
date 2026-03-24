import React, { useEffect, useRef, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { gsap } from 'gsap';
import FloatingOrbs from '../components/Floatingorbs';
import CTABanner from '../components/Ctabanner';
import baseurl from '../../base/Base';

const api = axios.create({
  baseURL: baseurl,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.response.use(
  res => res.data,
  err => Promise.reject(new Error(err.response?.data?.message || err.message || 'Request failed'))
);

const FALLBACK_WORKS = [
  {
    _id: 'social-brand-launch',
    id: 'social-brand-launch',
    slug: 'social-brand-launch',
    category: 'Social Media Creatives',
    title: 'Multi-Platform Brand Launch',
    subtitle: 'Instagram · Facebook · TikTok',
    desc: 'Built an end-to-end social presence for a Dubai lifestyle brand — content strategy, reels, paid promotion and community management.',
    featuredImage: { url: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&q=80' },
    image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&q=80',
    result: '3.2x',
    resultLabel: 'Return on Ad Spend',
    color: '#B2278C',
    icon: '📱',
    tags: ['Strategy', 'Content', 'Paid Social'],
    fullDesc: `This project involved building a complete social media presence from scratch for a Dubai-based lifestyle brand entering a competitive market. We developed a comprehensive strategy covering platform selection, content pillars, posting cadence, and paid amplification.\n\nOur team produced weekly content calendars, shot-list briefs, Reels scripts and carousel templates — all aligned with the brand's visual identity. Paid campaigns ran simultaneously on Instagram and Facebook targeting key UAE demographics.\n\nThe result was a cohesive brand voice across all platforms, significant organic growth, and a measurable return on ad spend from day one.`,
    metrics: [{ value: '3.2x', label: 'ROAS' }, { value: '18K', label: 'New Followers' }, { value: '4.2%', label: 'Engagement Rate' }, { value: '120+', label: 'Posts Created' }],
    services: ['Content Strategy', 'Reel Production', 'Paid Social Ads', 'Community Management'],
    deliverables: ['Monthly Content Calendar', 'Ad Creatives', 'Caption Copywriting', 'Analytics Reports'],
    relatedIds: ['restaurant-social', 'ecommerce-social', 'meta-lead-gen'],
    gallery: ['https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=1200&q=85', 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=800&q=80', 'https://images.unsplash.com/photo-1562577309-4932fdd64cd1?w=800&q=80'],
  },
  {
    _id: 'restaurant-social',
    id: 'restaurant-social',
    slug: 'restaurant-social',
    category: 'Social Media Creatives',
    title: 'F&B Restaurant Social Growth',
    subtitle: 'Instagram · Facebook',
    desc: 'Grew a Dubai restaurant from 800 to 18,000 followers in 4 months through consistent creative content and targeted paid boosting.',
    featuredImage: { url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80' },
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80',
    result: '22x',
    resultLabel: 'Follower Growth',
    color: '#B2278C',
    icon: '🍽️',
    tags: ['Content', 'Community', 'Growth'],
    fullDesc: `A well-established Dubai restaurant approached us with a dormant social media presence — 800 followers, inconsistent posting and zero paid strategy. We rebuilt everything from the ground up.\n\nWe started with a full audit of their brand identity, competitors and target audience. Then we developed a content system around their food photography, behind-the-scenes stories and promotional offers — posting 5-7 times per week across Instagram and Facebook.\n\nSmall-budget boosting on top of strong organic content drove exponential growth. Within 4 months the account reached 18,000 engaged followers, with significant uplift in foot traffic and table reservations.`,
    metrics: [{ value: '22x', label: 'Follower Growth' }, { value: '4 Months', label: 'Timeline' }, { value: '18K', label: 'Followers Reached' }, { value: '6.1%', label: 'Engagement Rate' }],
    services: ['Content Creation', 'Paid Boosting', 'Community Management', 'Strategy'],
    deliverables: ['Weekly Content', 'Photography Briefs', 'Ad Creatives', 'Monthly Reports'],
    relatedIds: ['social-brand-launch', 'ecommerce-social', 'event-posters'],
    gallery: ['https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&q=85', 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80'],
  },
  {
    _id: 'ecommerce-social',
    id: 'ecommerce-social',
    slug: 'ecommerce-social',
    category: 'Social Media Creatives',
    title: 'E-Commerce Social Ads',
    subtitle: 'Meta · Snapchat',
    desc: 'Managed ongoing social ad creatives and strategy for a fashion e-commerce brand targeting UAE and GCC audiences.',
    featuredImage: { url: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&q=80' },
    image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&q=80',
    result: '41%',
    resultLabel: 'Lower CPA',
    color: '#B2278C',
    icon: '🛍️',
    tags: ['Paid Social', 'Creative', 'E-comm'],
    fullDesc: `An online fashion retailer needed to scale their paid social performance while reducing cost per acquisition. We took over their Meta and Snapchat accounts, restructured campaigns and refreshed the creative strategy.\n\nOur approach focused on creative testing — running multiple ad variations simultaneously to identify winning hooks, visuals and copy. We introduced a UGC-style creative mix alongside polished brand visuals.\n\nCampaign restructuring and ongoing optimisation resulted in a 41% reduction in CPA while maintaining strong revenue growth across UAE and GCC markets.`,
    metrics: [{ value: '41%', label: 'CPA Reduction' }, { value: '2.8x', label: 'ROAS' }, { value: '60+', label: 'Ad Creatives Tested' }, { value: 'UAE + GCC', label: 'Markets' }],
    services: ['Meta Ads Management', 'Snapchat Ads', 'Creative Production', 'A/B Testing'],
    deliverables: ['Ad Creatives', 'Campaign Structure', 'Weekly Reports', 'Creative Briefs'],
    relatedIds: ['social-brand-launch', 'google-ads-retail', 'meta-lead-gen'],
    gallery: ['https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200&q=85'],
  },
  {
    _id: 'luxury-brand-identity',
    id: 'luxury-brand-identity',
    slug: 'luxury-brand-identity',
    category: 'Branding & Design',
    title: 'Luxury Hospitality Brand Identity',
    subtitle: 'Full Brand System',
    desc: 'Complete visual identity for a high-end Dubai hospitality company — logo, color palette, typography, stationery, and brand guidelines.',
    featuredImage: { url: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=800&q=80' },
    image: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=800&q=80',
    result: 'Full System',
    resultLabel: 'Brand Deliverables',
    color: '#185EA7',
    icon: '✦',
    tags: ['Logo', 'Guidelines', 'Print'],
    fullDesc: `A luxury hospitality group launching a new property in Dubai required a brand identity that could hold its own against international five-star competitors. We built the entire visual language from scratch.\n\nThe project started with brand discovery workshops to define positioning, values and the audience persona. From there we explored multiple creative directions before refining the chosen concept into a complete identity system.\n\nDeliverables included a primary logo and variations, a curated color palette, typography pairings, stationery suite, signage specifications, and a detailed brand guidelines document.`,
    metrics: [{ value: '3', label: 'Creative Directions' }, { value: '40+', label: 'Brand Assets' }, { value: '60-pg', label: 'Guidelines Doc' }, { value: '100%', label: 'Client Satisfaction' }],
    services: ['Brand Strategy', 'Logo Design', 'Visual Identity', 'Brand Guidelines'],
    deliverables: ['Logo Suite', 'Color System', 'Typography Guide', 'Stationery', 'Brand Guidelines PDF'],
    relatedIds: ['startup-identity', 'salon-branding', 'corporate-materials'],
    gallery: ['https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=1200&q=85', 'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=800&q=80'],
  },
  {
    _id: 'startup-identity',
    id: 'startup-identity',
    slug: 'startup-identity',
    category: 'Branding & Design',
    title: 'Tech Startup Identity',
    subtitle: 'Logo + Digital Brand',
    desc: 'Modern brand identity for a SaaS startup — minimal logo mark, icon set, color system and digital usage guidelines.',
    featuredImage: { url: 'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=800&q=80' },
    image: 'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=800&q=80',
    result: '48hrs',
    resultLabel: 'Express Delivery',
    color: '#185EA7',
    icon: '🚀',
    tags: ['Logo', 'Digital', 'Icons'],
    fullDesc: `A Dubai-based SaaS startup needed a brand identity that felt credible, modern and scalable. We delivered a clean, minimal identity built around a geometric logo mark, a dual-tone color system and a versatile icon set.\n\nEverything was designed with digital-first usage in mind, with both light and dark mode variations.\n\nThe 48-hour express delivery met their product launch deadline, and the identity has since been used consistently across their website, app and LinkedIn presence.`,
    metrics: [{ value: '48hrs', label: 'Turnaround' }, { value: '3', label: 'Logo Variations' }, { value: '20+', label: 'Icon Set' }, { value: 'Light + Dark', label: 'Mode Versions' }],
    services: ['Logo Design', 'Icon Design', 'Color System', 'Digital Brand Guidelines'],
    deliverables: ['Logo Files (SVG, PNG, PDF)', 'Icon Set', 'Color Palette', 'Usage Guidelines'],
    relatedIds: ['luxury-brand-identity', 'salon-branding', 'real-estate-website'],
    gallery: ['https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=1200&q=85'],
  },
  {
    _id: 'salon-branding',
    id: 'salon-branding',
    slug: 'salon-branding',
    category: 'Branding & Design',
    title: 'Beauty Salon Brand Refresh',
    subtitle: 'Rebrand Project',
    desc: 'Full rebrand for an established Dubai salon — new logo, brand colors, signage design and social media templates.',
    featuredImage: { url: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80' },
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80',
    result: '100%',
    resultLabel: 'Client Satisfaction',
    color: '#185EA7',
    icon: '💅',
    tags: ['Rebrand', 'Signage', 'Templates'],
    fullDesc: `An established beauty salon in Dubai had been operating for 6 years with a dated visual identity. We approached the rebrand carefully — keeping recognisable elements while modernising the aesthetic.\n\nThe new identity uses a refined colour palette, an elegant logotype, and a suite of Canva-based social media templates the team can update themselves.\n\nSignage visuals were delivered for their new branch fit-out, creating a cohesive in-store and online presence.`,
    metrics: [{ value: '6 Yrs', label: 'Old Brand Age' }, { value: '3 Wks', label: 'Project Duration' }, { value: '15+', label: 'Social Templates' }, { value: '2', label: 'Branch Signages' }],
    services: ['Brand Refresh', 'Logo Redesign', 'Signage Design', 'Social Media Templates'],
    deliverables: ['New Logo', 'Signage Files', 'Canva Template Kit', 'Brand Colour Guide'],
    relatedIds: ['luxury-brand-identity', 'startup-identity', 'event-posters'],
    gallery: ['https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1200&q=85'],
  },
  {
    _id: 'event-posters',
    id: 'event-posters',
    slug: 'event-posters',
    category: 'Branding & Design',
    title: 'Event & Promotional Posters',
    subtitle: 'Print & Digital',
    desc: 'Series of high-impact event posters and digital ads for Dubai nightlife, exhibitions and corporate events.',
    featuredImage: { url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80' },
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80',
    result: '500+',
    resultLabel: 'Designs Delivered',
    color: '#814B97',
    icon: '🎨',
    tags: ['Posters', 'Events', 'Print'],
    fullDesc: `We've produced event poster and promotional design work for a wide variety of Dubai clients — from nightlife venues and weekend markets to corporate conferences and exhibition stands.\n\nEach project requires translating the event's energy and theme into a visual that stops people scrolling or catches their eye in a venue. We work fast and iteratively, delivering 2-3 concepts with revisions within 24-48 hours.\n\nOur event design work covers Instagram stories, feed posts, WhatsApp flyers, printed A3/A4 posters and large-format banner designs.`,
    metrics: [{ value: '500+', label: 'Designs Done' }, { value: '24-48hr', label: 'Turnaround' }, { value: 'All Sizes', label: 'Formats' }, { value: '50+', label: 'Event Clients' }],
    services: ['Poster Design', 'Digital Ads', 'Large Format', 'WhatsApp Flyers'],
    deliverables: ['Print-Ready Files', 'Digital Versions', 'Social Media Cuts', 'Source Files'],
    relatedIds: ['ad-banners', 'corporate-materials', 'social-brand-launch'],
    gallery: ['https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&q=85', 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=800&q=80'],
  },
  {
    _id: 'ad-banners',
    id: 'ad-banners',
    slug: 'ad-banners',
    category: 'Branding & Design',
    title: 'Digital Ad Banner Suite',
    subtitle: 'GDN · Social · Display',
    desc: 'Complete set of ad banners in all standard sizes for Google Display Network and social platforms — animated and static.',
    featuredImage: { url: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=800&q=80' },
    image: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=800&q=80',
    result: 'All Sizes',
    resultLabel: 'Formats Covered',
    color: '#814B97',
    icon: '🖼️',
    tags: ['Banners', 'Animated', 'GDN'],
    fullDesc: `Digital advertising requires assets in dozens of formats. We take the pain out of this by delivering complete banner suites from a single brief.\n\nOur process starts with one master design, which we then adapt across all required sizes while maintaining visual consistency. We offer both static and animated HTML5 or GIF versions.\n\nClients receive organised, clearly named files in every required format, ready to upload directly to Google Ads, Meta, Programmatic or any other platform.`,
    metrics: [{ value: '15+', label: 'Sizes Per Set' }, { value: 'HTML5', label: 'Animation Format' }, { value: '48hrs', label: 'Delivery' }, { value: '100%', label: 'Platform Ready' }],
    services: ['Banner Design', 'HTML5 Animation', 'GIF Creation', 'Asset Organisation'],
    deliverables: ['Static PNGs', 'Animated GIFs', 'HTML5 Files', 'Organised Asset Pack'],
    relatedIds: ['event-posters', 'corporate-materials', 'google-ads-retail'],
    gallery: ['https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=1200&q=85'],
  },
  {
    _id: 'corporate-materials',
    id: 'corporate-materials',
    slug: 'corporate-materials',
    category: 'Branding & Design',
    title: 'Corporate Marketing Materials',
    subtitle: 'Brochures · Flyers · Profiles',
    desc: 'Professional company profiles, brochures and marketing kits for real estate, legal and finance clients in Dubai.',
    featuredImage: { url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80' },
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
    result: '50+',
    resultLabel: 'Corporate Clients',
    color: '#814B97',
    icon: '📄',
    tags: ['Print', 'Corporate', 'Profiles'],
    fullDesc: `Corporate clients in competitive B2B sectors need print and digital materials that communicate professionalism instantly. We've designed comprehensive marketing kits for real estate developers, legal firms, financial advisors and management consultancies across Dubai.\n\nTypical projects include multi-page company profiles (PDF and print), service brochures, one-pagers and presentation decks.\n\nWe work closely with clients on copywriting direction and layout strategy, ensuring every page earns its place.`,
    metrics: [{ value: '50+', label: 'Clients Served' }, { value: '200+', label: 'Documents Created' }, { value: 'Print + Digital', label: 'Formats' }, { value: '5★', label: 'Average Rating' }],
    services: ['Company Profile Design', 'Brochure Design', 'Presentation Design', 'Print Management'],
    deliverables: ['Print-Ready PDF', 'Digital PDF', 'Source Files', 'Editable Versions'],
    relatedIds: ['event-posters', 'ad-banners', 'luxury-brand-identity'],
    gallery: ['https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=85'],
  },
  {
    _id: 'real-estate-website',
    id: 'real-estate-website',
    slug: 'real-estate-website',
    category: 'Websites',
    title: 'Real Estate Agency Website',
    subtitle: 'React + CMS',
    desc: 'Custom real estate website with property listings, agent profiles, search filters and CRM integration for a Dubai agency.',
    featuredImage: { url: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80' },
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80',
    result: 'Top 3',
    resultLabel: 'Google Ranking',
    color: '#B2278C',
    icon: '🏢',
    tags: ['React', 'CMS', 'SEO'],
    fullDesc: `A mid-sized Dubai real estate agency needed a website that could compete with the top agencies in the market. We designed and built a fully custom solution using React on the frontend with a headless CMS backend.\n\nKey features included a filterable property listings page, individual property detail pages, agent profiles, an enquiry system and WhatsApp integration. The site was fully optimised for mobile and built with SEO best practices from day one.\n\nWithin 3 months of launch the website ranked in the top 3 Google results for several high-intent Dubai real estate keywords.`,
    metrics: [{ value: 'Top 3', label: 'Google Position' }, { value: '1.8s', label: 'Load Speed' }, { value: '3 Months', label: 'To Rank' }, { value: '300%', label: 'Organic Traffic' }],
    services: ['UI/UX Design', 'React Development', 'CMS Integration', 'SEO Setup'],
    deliverables: ['Custom Website', 'CMS Dashboard', 'SEO Configuration', 'Training Session'],
    relatedIds: ['restaurant-website', 'ecommerce-store', 'seo-local'],
    gallery: ['https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&q=85', 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80'],
  },
  {
    _id: 'restaurant-website',
    id: 'restaurant-website',
    slug: 'restaurant-website',
    category: 'Websites',
    title: 'Restaurant & Cafe Websites',
    subtitle: 'WordPress · Custom',
    desc: 'Fast, mobile-first websites for F&B businesses featuring menus, online reservations and WhatsApp ordering integration.',
    featuredImage: { url: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80' },
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80',
    result: '40+',
    resultLabel: 'Sites Built',
    color: '#B2278C',
    icon: '🌐',
    tags: ['WordPress', 'Mobile', 'Booking'],
    fullDesc: `We've built 40+ websites for restaurants, cafes and cloud kitchens across Dubai — each one designed to showcase the food and convert visitors into customers.\n\nEvery site includes a digital menu, WhatsApp ordering or reservation button, Google Maps integration, and photo gallery. Mobile performance is a priority — over 80% of restaurant website visits come from mobile devices.`,
    metrics: [{ value: '40+', label: 'Sites Launched' }, { value: '2s', label: 'Load Time' }, { value: '95+', label: 'Mobile Score' }, { value: 'WhatsApp', label: 'Ordering Integrated' }],
    services: ['Web Design', 'WordPress Development', 'WhatsApp Integration', 'Menu Setup'],
    deliverables: ['Live Website', 'Admin Access', 'Mobile Design', 'Basic SEO'],
    relatedIds: ['real-estate-website', 'ecommerce-store', 'restaurant-social'],
    gallery: ['https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=85'],
  },
  {
    _id: 'ecommerce-store',
    id: 'ecommerce-store',
    slug: 'ecommerce-store',
    category: 'Websites',
    title: 'E-Commerce Store Build',
    subtitle: 'Shopify · WooCommerce',
    desc: 'Full e-commerce builds with product pages, payment gateway integration, inventory management and conversion optimisation.',
    featuredImage: { url: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80' },
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80',
    result: '2.8x',
    resultLabel: 'Conversion Boost',
    color: '#B2278C',
    icon: '🛒',
    tags: ['Shopify', 'WooCommerce', 'CRO'],
    fullDesc: `We build e-commerce stores designed to sell — clean product pages, frictionless checkout, and conversion-optimised layouts throughout. Our platform of choice depends on the client's needs: Shopify for simplicity, WooCommerce for flexibility.\n\nEvery store includes payment gateway integration (Stripe, PayTabs, Telr for UAE), shipping zone configuration, and a mobile-optimised design.\n\nPost-launch CRO audits on average result in a 2.8x improvement in conversion rate.`,
    metrics: [{ value: '2.8x', label: 'Conversion Uplift' }, { value: '30+', label: 'Stores Built' }, { value: 'Telr + Stripe', label: 'Payment Gateways' }, { value: '100%', label: 'Mobile Optimised' }],
    services: ['Store Design', 'Shopify/WooCommerce Setup', 'Payment Integration', 'CRO Audit'],
    deliverables: ['Live Store', 'Product Listings', 'Payment Setup', 'Admin Training'],
    relatedIds: ['real-estate-website', 'restaurant-website', 'ecommerce-social'],
    gallery: ['https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&q=85'],
  },
  {
    _id: 'google-ads-retail',
    id: 'google-ads-retail',
    slug: 'google-ads-retail',
    category: 'Performance Marketing',
    title: 'Google Ads for Retail Brand',
    subtitle: 'Search · Shopping · Display',
    desc: 'Managed full Google Ads account for a Dubai retail brand — search, shopping and display campaigns across UAE and KSA.',
    featuredImage: { url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80' },
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
    result: 'AED 800K',
    resultLabel: 'Revenue Generated',
    color: '#185EA7',
    icon: '🎯',
    tags: ['Google Ads', 'Shopping', 'Search'],
    fullDesc: `A mid-size retail brand came to us with a Google Ads account running on autopilot — broad match keywords, no negative keyword lists, and campaigns cannibalising each other.\n\nWe performed a full account audit and restructure, built tightly themed ad groups, added extensive negative keyword lists, and launched a Shopping campaign. Display remarketing was added to recapture high-intent visitors.\n\nGeographic targeting was expanded to KSA with localised ad copy. Over 6 months, the account generated AED 800,000 in tracked revenue.`,
    metrics: [{ value: 'AED 800K', label: 'Revenue Generated' }, { value: '4.1x', label: 'ROAS' }, { value: '60%', label: 'CPC Reduction' }, { value: 'UAE + KSA', label: 'Markets' }],
    services: ['Google Ads Management', 'Shopping Campaigns', 'Display Remarketing', 'Account Restructure'],
    deliverables: ['Campaign Structure', 'Keyword Research', 'Ad Copywriting', 'Monthly Reports'],
    relatedIds: ['meta-lead-gen', 'ecommerce-social', 'seo-local'],
    gallery: ['https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=85'],
  },
  {
    _id: 'meta-lead-gen',
    id: 'meta-lead-gen',
    slug: 'meta-lead-gen',
    category: 'Social Media Creatives',
    title: 'Meta Lead Gen for Real Estate',
    subtitle: 'Facebook · Instagram Ads',
    desc: 'High-volume lead generation campaigns for real estate developers targeting investors and end-users across UAE.',
    featuredImage: { url: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&q=80' },
    image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&q=80',
    result: '1,200+',
    resultLabel: 'Qualified Leads',
    color: '#185EA7',
    icon: '🏠',
    tags: ['Meta Ads', 'Lead Gen', 'Real Estate'],
    fullDesc: `Real estate is one of the most competitive paid advertising verticals in Dubai. We've managed Meta lead generation campaigns for multiple developers and agencies, driving qualified leads at scale.\n\nOur approach combines audience segmentation (by nationality, income indicators, interests and behaviours), strong creative with property visuals, and instant form or landing page variations tested simultaneously.\n\nLead quality is a constant focus — we optimise campaigns toward leads that actually convert to viewings and sales.`,
    metrics: [{ value: '1,200+', label: 'Qualified Leads' }, { value: 'AED 45', label: 'Average CPL' }, { value: '18%', label: 'Lead-to-Viewing' }, { value: 'UAE-Wide', label: 'Coverage' }],
    services: ['Meta Ads Strategy', 'Creative Production', 'Audience Targeting', 'Lead Management'],
    deliverables: ['Campaign Setup', 'Ad Creatives', 'Lead Tracking', 'Performance Reports'],
    relatedIds: ['google-ads-retail', 'real-estate-website', 'social-brand-launch'],
    gallery: ['https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=1200&q=85'],
  },
  {
    _id: 'seo-local',
    id: 'seo-local',
    slug: 'seo-local',
    category: 'SEO',
    title: 'Local SEO for Dubai Businesses',
    subtitle: 'Google My Business · On-Page',
    desc: 'Full local SEO campaigns for clinics, restaurants and service businesses — ranking page 1 for high-intent Dubai keywords.',
    featuredImage: { url: 'https://images.unsplash.com/photo-1562577309-4932fdd64cd1?w=800&q=80' },
    image: 'https://images.unsplash.com/photo-1562577309-4932fdd64cd1?w=800&q=80',
    result: 'Page 1',
    resultLabel: 'Google Rankings',
    color: '#814B97',
    icon: '🔍',
    tags: ['Local SEO', 'GMB', 'On-Page'],
    fullDesc: `Local search is one of the highest-value channels for Dubai businesses. We run comprehensive local SEO campaigns that get our clients in front of buyers actively searching for their services.\n\nOur process covers Google My Business optimisation, on-page SEO, technical SEO, and local citation building.\n\nWe've helped clinics rank for competitive medical keywords, restaurants appear in the Google Maps 3-pack, and service businesses dominate their local area — all through sustainable, white-hat SEO.`,
    metrics: [{ value: 'Page 1', label: 'Rankings Achieved' }, { value: '6 Months', label: 'Average Timeline' }, { value: '3-Pack', label: 'Maps Appearances' }, { value: '200%', label: 'Organic Traffic Growth' }],
    services: ['GMB Optimisation', 'On-Page SEO', 'Technical SEO', 'Citation Building'],
    deliverables: ['SEO Audit', 'Keyword Strategy', 'Monthly Reports', 'Ongoing Optimisation'],
    relatedIds: ['real-estate-website', 'google-ads-retail', 'restaurant-website'],
    gallery: ['https://images.unsplash.com/photo-1562577309-4932fdd64cd1?w=1200&q=85'],
  },
  {
    _id: 'nfc-professional',
    id: 'nfc-professional',
    slug: 'nfc-professional',
    category: 'NFC Digital Cards',
    title: 'Professional NFC Card Setup',
    subtitle: 'Design · Program · Deploy',
    desc: 'Custom-designed NFC business cards — tap to share contact, WhatsApp, portfolio and social media instantly.',
    featuredImage: { url: 'https://images.unsplash.com/photo-1614332287897-cdc485fa562d?w=800&q=80' },
    image: 'https://images.unsplash.com/photo-1614332287897-cdc485fa562d?w=800&q=80',
    result: '200+',
    resultLabel: 'Cards Delivered',
    color: '#814B97',
    icon: '📲',
    tags: ['NFC Card', 'Digital Profile', 'WhatsApp'],
    fullDesc: `Our NFC Digital Business Card service is one of our most popular offerings. We handle everything — from the custom card design and premium print to programming the NFC chip and building the digital profile page it links to.\n\nWhen someone taps your NFC card with their phone, they're instantly taken to your personalised digital profile. From there they can save your contact, open WhatsApp, visit your website, view your portfolio, or follow your social media — all in one tap, no app required.\n\nPremium materials. Custom branding. NFC integrated. We've delivered NFC cards for consultants, real estate agents, doctors, entrepreneurs and corporate teams across Dubai.`,
    metrics: [{ value: '200+', label: 'Cards Delivered' }, { value: '1 Tap', label: 'To Share Everything' }, { value: '0 App', label: 'Required' }, { value: 'Instant', label: 'Contact Save' }],
    services: ['Custom NFC Card Design', 'Premium Printing', 'NFC Chip Programming', 'Digital Profile Setup'],
    deliverables: ['Physical NFC Card', 'Digital Profile Page', 'Contact VCard', 'QR Code Backup'],
    relatedIds: ['nfc-corporate', 'luxury-brand-identity', 'startup-identity'],
    gallery: ['https://images.unsplash.com/photo-1614332287897-cdc485fa562d?w=1200&q=85', 'https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?w=800&q=80'],
  },
  {
    _id: 'nfc-corporate',
    id: 'nfc-corporate',
    slug: 'nfc-corporate',
    category: 'NFC Digital Cards',
    title: 'Corporate NFC Card Programme',
    subtitle: 'Team · Bulk · Branded',
    desc: 'Branded NFC card programme for a Dubai consultancy — custom design, programming and digital landing pages for all team members.',
    featuredImage: { url: 'https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?w=800&q=80' },
    image: 'https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?w=800&q=80',
    result: '50+',
    resultLabel: 'Team Members',
    color: '#814B97',
    icon: '🏷️',
    tags: ['Corporate', 'Bulk', 'Landing Page'],
    fullDesc: `A Dubai-based management consultancy wanted to modernise how their team exchanges contact information. We designed a unified card template using their brand identity, then created individual digital profile pages for each team member.\n\nThe cards were custom designed, professionally printed, and programmed before delivery. When staff details change, we update the digital profile without needing to reprint cards.\n\nPremium materials. Fully custom branded. NFC integrated. The result is a consistent, impressive first impression for everyone on the team.`,
    metrics: [{ value: '50+', label: 'Team Members' }, { value: 'Branded', label: 'Unified Design' }, { value: 'Updatable', label: 'Digital Profiles' }, { value: '0', label: 'Reprints Needed' }],
    services: ['Bulk NFC Design', 'Individual Profile Pages', 'NFC Programming', 'Ongoing Updates'],
    deliverables: ['Branded NFC Cards', 'Individual Profile Pages', 'Admin Access', 'Update Support'],
    relatedIds: ['nfc-professional', 'luxury-brand-identity', 'corporate-materials'],
    gallery: ['https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?w=1200&q=85'],
  },
];

const colorRgb = {
  '#B2278C': '178,39,140',
  '#185EA7': '24,94,167',
  '#814B97': '129,75,151',
};

function SkeletonDetail() {
  return (
    <div style={{ paddingTop: '140px', minHeight: '100vh' }}>
      <div className="container">
        {[50, 75, 40, 100, 220, 65].map((w, i) => (
          <div key={i} style={{ height: i === 1 ? 46 : i === 4 ? 400 : 14, width: i === 4 ? '100%' : `${w}%`, borderRadius: i === 4 ? 20 : 8, background: 'rgba(255,255,255,0.05)', marginBottom: '1.5rem', animation: 'dshimmer 1.5s infinite', animationDelay: `${i * 0.1}s` }} />
        ))}
      </div>
    </div>
  );
}

function RelatedCard({ work }) {
  const rgb = colorRgb[work.color] || '178,39,140';
  const [imgErr, setImgErr] = useState(false);
  
  const getImageUrl = () => {
    if (work.featuredImage?.url) return work.featuredImage.url;
    if (work.image) return work.image;
    return null;
  };
  
  const safeWork = {
    ...work,
    tags: Array.isArray(work?.tags) ? work.tags : [],
    image: getImageUrl(),
    title: work?.title || '',
    category: work?.category || '',
    desc: work?.desc || '',
    result: work?.result || '',
    color: work?.color || '#B2278C',
    icon: work?.icon || '📁',
    _id: work?._id || work?.id || work?.slug || ''
  };
  
  return (
    <Link to={`/works/${safeWork._id}`} style={{ display: 'block', textDecoration: 'none', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '20px', overflow: 'hidden', transition: 'all 0.35s cubic-bezier(0.4,0,0.2,1)' }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = `rgba(${rgb},0.4)`; e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = `0 16px 40px rgba(${rgb},0.14)`; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
    >
      <div style={{ height: 160, overflow: 'hidden', background: `rgba(${rgb},0.08)`, position: 'relative' }}>
        {!imgErr && safeWork.image
          ? <img src={safeWork.image} alt={safeWork.title} onError={() => setImgErr(true)} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s' }} />
          : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem' }}>{safeWork.icon}</div>
        }
        <span style={{ position: 'absolute', top: '0.65rem', right: '0.65rem', padding: '0.22rem 0.65rem', borderRadius: '50px', background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(8px)', fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '0.78rem', color: safeWork.color }}>
          {safeWork.result}
        </span>
      </div>
      <div style={{ padding: '1.1rem 1.25rem 1.25rem' }}>
        <p style={{ color: '#555', fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '0.35rem' }}>{safeWork.category}</p>
        <h3 style={{ color: '#f0f0f0', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.95rem', lineHeight: 1.3, marginBottom: '0.5rem' }}>{safeWork.title}</h3>
        <p style={{ color: '#666', fontSize: '0.78rem', lineHeight: 1.6, marginBottom: '0.85rem' }}>{safeWork.desc.length > 90 ? safeWork.desc.slice(0, 90) + '…' : safeWork.desc}</p>
        <span style={{ color: safeWork.color, fontSize: '0.8rem', fontWeight: 700 }}>View Project →</span>
      </div>
    </Link>
  );
}

export default function WorkDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const heroRef = useRef(null);

  const [work, setWork] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeImg, setActiveImg] = useState(0);

  const transformWorkData = (data) => {
    const getFullDesc = () => {
      if (data.fullDesc) return data.fullDesc;
      if (data.caseStudy?.overview) {
        let desc = data.caseStudy.overview || '';
        if (data.caseStudy.challenge) desc += `\n\n${data.caseStudy.challenge}`;
        if (data.caseStudy.solution) desc += `\n\n${data.caseStudy.solution}`;
        if (data.caseStudy.results) desc += `\n\n${data.caseStudy.results}`;
        return desc;
      }
      if (data.description) return data.description;
      return '';
    };

    const getMetrics = () => {
      if (data.metrics && Array.isArray(data.metrics)) return data.metrics;
      if (data.results && Array.isArray(data.results)) {
        return data.results.map(r => ({ value: r, label: '' }));
      }
      return [];
    };

    const getServices = () => {
      if (data.services && Array.isArray(data.services)) return data.services;
      if (data.caseStudy?.solution) {
        const solutionText = data.caseStudy.solution;
        if (solutionText.includes(',')) {
          return solutionText.split(',').map(s => s.trim()).slice(0, 6);
        }
      }
      return [];
    };

    const getDeliverables = () => {
      if (data.deliverables && Array.isArray(data.deliverables)) return data.deliverables;
      return [];
    };

    const getGallery = () => {
      if (data.gallery && Array.isArray(data.gallery) && data.gallery.length > 0) {
        return data.gallery.map(g => g.url || g);
      }
      if (data.featuredImage?.url) return [data.featuredImage.url];
      if (data.image) return [data.image];
      return [];
    };

    const getTags = () => {
      if (data.tags && Array.isArray(data.tags)) return data.tags;
      if (data.seo?.keywords && Array.isArray(data.seo.keywords)) return data.seo.keywords;
      return [];
    };

    return {
      ...data,
      _id: data._id || data.id || data.slug || id,
      fullDesc: getFullDesc(),
      metrics: getMetrics(),
      services: getServices(),
      deliverables: getDeliverables(),
      gallery: getGallery(),
      tags: getTags(),
      desc: data.desc || data.description || '',
      title: data.title || '',
      subtitle: data.subtitle || data.client || '',
      category: data.category || '',
      result: data.result || (data.results?.[0] || ''),
      resultLabel: data.resultLabel || '',
      color: data.color || '#B2278C',
      image: data.featuredImage?.url || data.image || '',
      icon: data.icon || '📁',
    };
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    setActiveImg(0);
    if (!id) return;
    let cancelled = false;

    async function fetchData() {
      setLoading(true);
      setError(null);
      try {
        let workData = null;
        
        try {
          const response = await api.get(`/works/${id}`);
          workData = response?.work || response;
        } catch (apiError) {
          const fb = FALLBACK_WORKS.find(w => w._id === id || w.id === id || w.slug === id);
          if (fb) {
            workData = fb;
          } else {
            throw new Error('Project not found');
          }
        }
        
        if (!workData) {
          throw new Error('Project data is empty');
        }
        
        const transformedWork = transformWorkData(workData);
        
        if (!cancelled) {
          setWork(transformedWork);
          
          let relatedData = [];
          try {
            const rel = await api.get(`/works/${id}/related`, { params: { limit: 3 } });
            relatedData = Array.isArray(rel?.works) ? rel.works : Array.isArray(rel) ? rel : [];
          } catch (relError) {
            if (transformedWork.relatedIds && Array.isArray(transformedWork.relatedIds)) {
              relatedData = FALLBACK_WORKS.filter(w => transformedWork.relatedIds.includes(w._id || w.id || w.slug)).slice(0, 3);
            }
          }
          
          const safeRelated = relatedData.map(item => transformWorkData(item));
          setRelated(safeRelated);
          setError(null);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message || 'Project not found');
          setWork(null);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchData();
    return () => { cancelled = true; };
  }, [id]);

  useEffect(() => {
    if (!loading && heroRef.current && work) {
      gsap.fromTo(heroRef.current.children,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.85, stagger: 0.09, ease: 'power3.out', delay: 0.1 }
      );
    }
  }, [loading, work]);

  if (loading) return <SkeletonDetail />;

  if (error || !work) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🔍</div>
        <h2 style={{ fontFamily: 'var(--font-display)', marginBottom: '0.75rem' }}>Project not found</h2>
        <p style={{ color: '#666', marginBottom: '2rem' }}>{error || 'The project you are looking for does not exist.'}</p>
        <Link to="/works" style={{ color: '#B2278C', textDecoration: 'none', fontWeight: 700, fontSize: '0.95rem' }}>← Back to Works</Link>
      </div>
    );
  }

  const rgb = colorRgb[work.color] || '178,39,140';
  const gallery = work.gallery?.length ? work.gallery : work.image ? [work.image] : [];

  return (
    <div>
      <style>{`
        @keyframes dshimmer { 0%,100%{opacity:.4} 50%{opacity:.85} }
        .thumb-btn { transition: all 0.25s; cursor: pointer; border: none; }
        .thumb-btn:hover { opacity: 1 !important; }
        @media (max-width:900px) {
          .dlayout { grid-template-columns:1fr !important; }
          .relgrid { grid-template-columns:1fr 1fr !important; }
          .mrow { grid-template-columns:1fr 1fr !important; }
        }
        @media (max-width:560px) {
          .relgrid { grid-template-columns:1fr !important; }
        }
      `}</style>

      {/* Hero Section */}
      <section style={{ paddingTop: '110px', paddingBottom: '3.5rem', position: 'relative', overflow: 'hidden' }}>
        <FloatingOrbs count={3} />
        <div style={{ position: 'absolute', top: 0, right: 0, width: '50%', height: '100%', background: `radial-gradient(ellipse at top right, rgba(${rgb},0.09), transparent 60%)`, pointerEvents: 'none' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#555', cursor: 'pointer', fontSize: '0.88rem', display: 'flex', alignItems: 'center', gap: '0.4rem', padding: 0, marginBottom: '2.5rem', transition: 'color 0.2s' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
            onMouseLeave={e => (e.currentTarget.style.color = '#555')}
          >
            ← Back to Works
          </button>

          <div ref={heroRef}>
            <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap', marginBottom: '1.4rem', alignItems: 'center' }}>
              <span style={{ padding: '0.32rem 0.9rem', borderRadius: '50px', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', background: `rgba(${rgb},0.14)`, color: work.color, border: `1px solid rgba(${rgb},0.3)` }}>
                {work.category}
              </span>
              <span style={{ color: '#444', fontSize: '0.75rem' }}>·</span>
              <span style={{ color: '#555', fontSize: '0.78rem', fontWeight: 500 }}>{work.subtitle}</span>
            </div>

            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem,5vw,3.8rem)', fontWeight: 800, color: '#ffffff', lineHeight: 1.08, marginBottom: '1.25rem' }}>
              {work.title}
            </h1>

            <p style={{ color: '#888', fontSize: '1.05rem', maxWidth: 620, lineHeight: 1.75, marginBottom: '1.75rem' }}>
              {work.desc}
            </p>

            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {work.tags.map((tag, i) => (
                <span key={i} style={{ padding: '0.28rem 0.8rem', borderRadius: '50px', fontSize: '0.72rem', fontWeight: 600, background: 'rgba(255,255,255,0.05)', color: '#aaa', border: '1px solid rgba(255,255,255,0.09)' }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      {gallery.length > 0 && (
        <section style={{ padding: '0 0 3.5rem' }}>
          <div className="container">
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.8rem', color: '#ffffff', marginBottom: '1.5rem' }}>Project Gallery</h2>
            <div style={{ borderRadius: '24px', overflow: 'hidden', marginBottom: '0.75rem', position: 'relative', background: `rgba(${rgb},0.06)`, border: `1px solid rgba(${rgb},0.15)` }}>
              <img src={gallery[activeImg]} alt={work.title} style={{ width: '100%', height: 460, objectFit: 'cover', display: 'block' }} onError={e => { e.target.style.display = 'none'; }} />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '35%', background: 'linear-gradient(to top, rgba(0,0,0,0.45), transparent)' }} />
              {gallery.length > 1 && (
                <>
                  <button onClick={() => setActiveImg(i => (i - 1 + gallery.length) % gallery.length)} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(8px)', border: `1px solid rgba(${rgb},0.3)`, color: work.color, borderRadius: '50%', width: 40, height: 40, cursor: 'pointer', fontSize: '1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>‹</button>
                  <button onClick={() => setActiveImg(i => (i + 1) % gallery.length)} style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(8px)', border: `1px solid rgba(${rgb},0.3)`, color: work.color, borderRadius: '50%', width: 40, height: 40, cursor: 'pointer', fontSize: '1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>›</button>
                </>
              )}
              <div style={{ position: 'absolute', bottom: '1rem', right: '1rem', background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '50px', padding: '0.25rem 0.75rem', color: '#aaa', fontSize: '0.75rem' }}>
                {activeImg + 1} / {gallery.length}
              </div>
            </div>
            {gallery.length > 1 && (
              <div style={{ display: 'flex', gap: '0.65rem', overflowX: 'auto' }}>
                {gallery.map((img, i) => (
                  <button key={i} className="thumb-btn" onClick={() => setActiveImg(i)} style={{ padding: 0, borderRadius: '10px', overflow: 'hidden', background: 'none', opacity: activeImg === i ? 1 : 0.45, outline: activeImg === i ? `2px solid ${work.color}` : 'none', outlineOffset: 2, flexShrink: 0 }}>
                    <img src={img} alt="" style={{ width: 88, height: 62, objectFit: 'cover', display: 'block' }} />
                  </button>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Key Metrics Section */}
      {work.metrics.length > 0 && (
        <section style={{ padding: '0 0 3rem' }}>
          <div className="container">
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.8rem', color: '#ffffff', marginBottom: '1.5rem', textAlign: 'center' }}>Key Results</h2>
            <div className="mrow" style={{ display: 'grid', gridTemplateColumns: `repeat(${Math.min(work.metrics.length, 4)}, 1fr)`, gap: '1rem' }}>
              {work.metrics.map((m, i) => (
                <div key={i} style={{ padding: '1.6rem 1.25rem', textAlign: 'center', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '18px', backdropFilter: 'blur(10px)', transition: 'all 0.25s' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = `rgba(${rgb},0.35)`; e.currentTarget.style.transform = 'translateY(-3px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; e.currentTarget.style.transform = 'translateY(0)'; }}
                >
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.8rem', color: work.color, lineHeight: 1, marginBottom: '0.4rem' }}>{m.value}</div>
                  <div style={{ color: '#555', fontSize: '0.72rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{m.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Main Content Section */}
      <section style={{ padding: '0 0 3rem' }}>
        <div className="container">
          <div className="dlayout" style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: '2.5rem', alignItems: 'start' }}>
            {/* Left Column - About Project */}
            <div>
              <div style={{ height: 3, background: `linear-gradient(90deg, ${work.color}, transparent)`, borderRadius: '3px', marginBottom: '2rem' }} />
              <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.8rem', color: '#ffffff', marginBottom: '1.5rem' }}>About This Project</h2>
              {work.fullDesc.split('\n\n').map((para, i) => (
                <p key={i} style={{ color: '#777', lineHeight: 1.85, marginBottom: '1.25rem', fontSize: '0.95rem' }}>{para}</p>
              ))}
              
              {work.liveUrl && (
                <div style={{ marginTop: '2rem' }}>
                  <a href={work.liveUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.5rem', background: `rgba(${rgb},0.1)`, border: `1px solid rgba(${rgb},0.3)`, borderRadius: '40px', color: work.color, textDecoration: 'none', fontSize: '0.9rem', fontWeight: 600 }}>
                    <span>🌐</span> Visit Live Project
                    <span>→</span>
                  </a>
                </div>
              )}
            </div>

            {/* Right Column - Sidebar */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {/* Services Section */}
              {work.services.length > 0 && (
                <div style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '18px', backdropFilter: 'blur(10px)' }}>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: '#fff', fontSize: '1.1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ color: work.color }}>⚡</span> Services Used
                  </h3>
                  {work.services.map((s, i, arr) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', padding: '0.5rem 0', borderBottom: i < arr.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
                      <span style={{ width: 6, height: 6, borderRadius: '50%', background: work.color, flexShrink: 0 }} />
                      <span style={{ color: '#aaa', fontSize: '0.85rem' }}>{s}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Deliverables Section */}
              {work.deliverables.length > 0 && (
                <div style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '18px', backdropFilter: 'blur(10px)' }}>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: '#fff', fontSize: '1.1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ color: work.color }}>✓</span> Deliverables
                  </h3>
                  {work.deliverables.map((d, i, arr) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', padding: '0.4rem 0', borderBottom: i < arr.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
                      <span style={{ color: work.color, fontSize: '0.75rem', marginTop: '0.15rem', flexShrink: 0 }}>✓</span>
                      <span style={{ color: '#aaa', fontSize: '0.85rem' }}>{d}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Result Card */}
              <div style={{ padding: '1.5rem', textAlign: 'center', background: `linear-gradient(135deg, rgba(${rgb},0.15), rgba(${rgb},0.05))`, border: `1px solid rgba(${rgb},0.3)`, borderRadius: '18px' }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: '#fff', fontSize: '0.9rem', marginBottom: '1rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Project Outcome</h3>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '2.2rem', color: work.color, lineHeight: 1, marginBottom: '0.25rem' }}>{work.result || 'Delivered'}</div>
                <div style={{ color: '#777', fontSize: '0.8rem', marginBottom: '1rem' }}>{work.resultLabel || 'Success'}</div>
                <div style={{ width: 40, height: 1, background: `rgba(${rgb},0.4)`, margin: '0 auto 1rem' }} />
                <p style={{ color: '#666', fontSize: '0.78rem', lineHeight: 1.6 }}>Achieved for a client in<br /><span style={{ color: '#aaa', fontWeight: 600 }}>Dubai, UAE</span></p>
              </div>

              {/* CTA Buttons */}
              <Link to="/contact" style={{ display: 'block', textAlign: 'center', padding: '0.95rem', background: work.color, color: '#fff', borderRadius: '14px', textDecoration: 'none', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.92rem', boxShadow: `0 8px 30px rgba(${rgb},0.3)`, transition: 'all 0.25s' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = `0 14px 40px rgba(${rgb},0.4)`; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = `0 8px 30px rgba(${rgb},0.3)`; }}
              >
                Start a Similar Project →
              </Link>

              <Link to="/works" style={{ display: 'block', textAlign: 'center', padding: '0.85rem', background: 'transparent', color: '#666', border: '1px solid rgba(255,255,255,0.09)', borderRadius: '14px', textDecoration: 'none', fontWeight: 600, fontSize: '0.85rem', transition: 'all 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; }}
                onMouseLeave={e => { e.currentTarget.style.color = '#666'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.09)'; }}
              >
                ← Browse All Work
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Related Projects Section */}
      {related.length > 0 && (
        <section style={{ padding: '3rem 0 5rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <div className="container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: '#fff', fontSize: '1.8rem' }}>Related Projects</h2>
              <Link to="/works" style={{ color: '#B2278C', textDecoration: 'none', fontSize: '0.85rem', fontWeight: 700 }}>View All →</Link>
            </div>
            <div className="relgrid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1.25rem' }}>
              {related.map((r, i) => <RelatedCard key={i} work={r} />)}
            </div>
          </div>
        </section>
      )}

      <CTABanner />
    </div>
  );
}