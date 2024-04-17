import type { Metadata } from 'next';
import { Rubik } from 'next/font/google';
import './globals.css';

const fontFamily = Rubik({
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  subsets: ['cyrillic', 'latin'],
});

export const metadata: Metadata = {
  title: 'WeatherApp',
  description: 'weather app for daily using!',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={fontFamily.className}>
        <div className='flex justify-center items-center h-[100vh]'>
          {children}
        </div>
      </body>
    </html>
  );
}
