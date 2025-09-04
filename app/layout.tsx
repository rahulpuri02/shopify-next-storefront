import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/layout/footer/footer";
import Navbar from "@/components/layout/navbar/navbar";
import ScreenIndicator from "@/components/shared/indicators/screen-indicator";
import { CartProvider } from "@/contexts/cart-context";
import { ShoppingCart } from "@/components/shared/cart/shopping-cart";
import { FavoriteProvider } from "@/contexts/favorite-context";
import { Toaster } from "@/components/ui/sonner";
import ChatWidget from "@/components/chat/chat-widget";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CN 74® | The Official Online Store",
  description:
    "Welcome to CN 74®, your official online store for premium apparel and accessories.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} flex min-h-screen flex-col justify-between antialiased`}
      >
        <CartProvider>
          <FavoriteProvider>
            <Navbar />
            <main>
              <Toaster />
              <ShoppingCart />
              {children}
            </main>
            <ScreenIndicator />
            <Footer />
          </FavoriteProvider>
        </CartProvider>
        <ChatWidget />
      </body>
    </html>
  );
}
