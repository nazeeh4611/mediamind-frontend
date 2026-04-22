import WorksClient from '@/components/WorksClient';

export const metadata = {
  title: "Our Portfolio | Web Design & Digital Marketing Work",
  description:
    "Explore our portfolio of websites, branding, social media creatives, NFC cards, and marketing campaigns delivered for businesses in Dubai and worldwide.",
  alternates: {
    canonical: "https://www.mediaminddigital.ae/works",
  },
};

export default function WorksPage() {
  return <WorksClient />;
}