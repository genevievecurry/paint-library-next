import "./globals.css";
import type { Metadata } from "next";
// import Script from "next/script";

export const metadata: Metadata = {
  title: {
    template: "%s | Paint Library",
    default: "Paint Library",
  },
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* <Script
        async
        src="https://gumami.netlify.app/script.js"
        data-website-id={process.env.NEXT_PUBLIC_GUMAMI_ANALYTICS_ID}
      /> */}
      <body>{children}</body>
    </html>
  );
}
