import type { Metadata } from "next";
import { Toaster } from "@/components/ui";

import "./globals.css";


export const metadata: Metadata = {
  title: "NEWS CORP",
  description: "Detect fake news with unmatched accuracy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={` antialiased bg-[#252f41]`}>
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              fontSize: "15px",
            },
          }}
        />
      </body>
    </html>
  );
}
