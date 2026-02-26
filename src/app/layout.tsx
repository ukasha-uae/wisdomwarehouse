
import type {Metadata, Viewport} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import PWARegister from "@/components/PWARegister";

export const metadata: Metadata = {
  title: 'Wisdom Warehouse | Reimagining Education',
  description:
    'Wisdom Warehouse is a holistic learning space in Dubai that supports every child through personalised mentorship, hands-on learning, and emotional resilience.',
  manifest: '/manifest.webmanifest',
  applicationName: 'Wisdom Warehouse',
  appleWebApp: {
    capable: true,
    title: 'Wisdom Warehouse',
    statusBarStyle: 'default',
  },
  icons: {
    icon: [
      { url: '/wisdom-warehouse-logo-dark.png', sizes: '192x192', type: 'image/png' },
      { url: '/wisdom-warehouse-logo-dark.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [{ url: '/wisdom-warehouse-logo-dark.png', sizes: '180x180', type: 'image/png' }],
  },
};

export const viewport: Viewport = {
  themeColor: '#f39200',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Alegreya:wght@400;700&family=PT+Sans:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased min-h-screen bg-background">
        {children}
        <PWARegister />
        <Toaster />
      </body>
    </html>
  );
}
