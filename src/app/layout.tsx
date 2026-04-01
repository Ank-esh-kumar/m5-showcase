import type { Metadata } from 'next';
import { Orbitron, Rajdhani } from 'next/font/google';
import './globals.css';

const orbitron = Orbitron({
  variable: '--font-orbitron',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  display: 'swap',
});

const rajdhani = Rajdhani({
  variable: '--font-rajdhani',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'BMW M5 Competition — The Ultimate Driving Machine',
  description:
    'Experience the BMW M5 Competition. 617HP M TwinPower Turbo V8. M xDrive AWD. The pinnacle of luxury and track-ready performance.',
  keywords: ['BMW', 'M5 Competition', 'sports sedan', 'luxury performance', 'M Power'],
  openGraph: {
    title: 'BMW M5 Competition — The Ultimate Driving Machine',
    description: 'Track-ready precision. Uncompromising luxury. 617 HP.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${orbitron.variable} ${rajdhani.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full bg-pagani-black text-white overflow-x-hidden" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
