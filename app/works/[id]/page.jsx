import WorkDetailClient from '@/components/WorkDetailClient';

export async function generateMetadata({ params }) {
  const { id } = await params;
  
  // For dynamic metadata, we would typically fetch the work data here
  // Since this requires API calls, we keep it simple or implement ISR
  return {
    title: "Project Details | MediaMind Digital",
    description: "View our detailed project portfolio including websites, branding, and digital marketing work.",
    alternates: {
      canonical: `https://www.mediaminddigital.ae/works/${id}`,
    },
  };
}

export default async function WorkDetailPage({ params }) {
  const { id } = await params;
  return <WorkDetailClient id={id} />;
}