import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";

export const metadata: Metadata = {
  title: "Paycore+ | High-Performance Financial Infrastructure",
  description:
    "Secure, scalable, and lightning-fast financial infrastructure for modern companies. Move money globally with sub-second finality.",
};

import { Toaster } from "react-hot-toast";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <AuthProvider>
          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#12121e',
                color: '#fafafa',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '16px',
                fontSize: '14px',
                fontWeight: '500',
              },
            }}
          />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
