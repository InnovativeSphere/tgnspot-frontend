import { Rajdhani, Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import Head from "next/head";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ThemeWatcher } from "@/components/layout/ThemeWatcher";
import { ScrollToTop } from "@/components/ui/ScrollToTop";
import { PulseModal } from "@/components/ui/PulseModal";
import { EmberField } from "@/components/ui/EmberField";
import { PageTransition } from "@/components/ui/PageTransition";

const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-heading",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-body",
  display: "swap",
});

export const metadata = {
  title: "TGNSpot",
  description: "Where gaming, tech, and culture meet.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${rajdhani.variable} ${inter.variable}`}
    >
      <Head>
        <meta name="impact-site-verification" content="d0ad31df-6cbe-444d-a50b-f82515a16ecd" />
      </Head>
      <body className="font-body antialiased min-h-screen flex flex-col">
        <ThemeWatcher />
        <EmberField />
        <Navbar />

        <main className="flex-grow">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
        <ScrollToTop />
        <PulseModal />
        <Toaster position="bottom-center" toastOptions={{ duration: 3000 }} />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
