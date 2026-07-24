import localFont from 'next/font/local';
import './globals.css';
import IRootLayout from './type';
import { Toaster } from 'react-hot-toast';
const vazirMatn = localFont({
  src: [
    {
      path: '../assets/fonts/Vazirmatn-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../assets/fonts/Vazirmatn-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  display: 'swap',
});

export default function RootLayout({ children }: IRootLayout) {
  return (
    <html dir="rtl" lang="fa">
      <body className={`${vazirMatn.className} no-scrollbar`}>
        {children}
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
