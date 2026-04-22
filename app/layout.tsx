import "./globals.css";
import { ReactNode } from "react";
import LayoutShell from "../components/LayoutShell";


export const metadata = {
  title: "Media Mind Digital | Data-Driven Digital Marketing Agency",
  description:
    "Media Mind is a performance marketing agency specializing in Meta Ads, Google Ads, CRM optimization, branding, and high-conversion websites.",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <LayoutShell>{children}</LayoutShell>
      </body>
    </html>
  );
}