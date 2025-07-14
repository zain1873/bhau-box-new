// import type { Metadata } from 'next'
// import './globals.css'

// export const metadata: Metadata = {
//   title: 'BHAU BOX',
//   description: 'I LOVE DOGGIES',
//   generator: '1world.dev',
// }

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode
// }>) {
//   return (
//     <html lang="en">
//       <body>{children}</body>
//     </html>
//   )
// }
import type { Metadata } from 'next';
import { Toaster } from 'react-hot-toast'; // ✅ Add this
import './globals.css';

export const metadata: Metadata = {
  title: 'BHAU BOX',
  description: 'I LOVE DOGGIES lora',
  generator: '1world.dev',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <Toaster position="top-center" /> {/* ✅ Add this here */}
      </body>
    </html>
  );
}
