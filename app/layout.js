import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "PrepAI - AI-Powered Interview Preparation & Career Tools",
  description: "Get ready for your interviews",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${inter.className} antialiased`}
        >
          <Toaster />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
