import localFont from 'next/font/local'

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});
import "@/app/globals.css";
import { cn } from "@/lib/utils";
import { CartProvider } from "@/store/CartContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartSidebar from "@/components/CartSidebar";

export const metadata = {
  title: "Breaking Stores - Your One-Stop Electronics Shop",
  description:
    "Discover the latest in electronics at Breaking Stores. From iPhones and MacBooks to home appliances, we have it all. Quality products, unbeatable prices, and exceptional service.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          "antialiased bg-white text-black",
          geistSans.variable,
          geistMono.variable
        )}
      >
         <CartProvider>
           <Header />          
           <main>{children}</main>
           <Footer />
           <CartSidebar />
           </CartProvider>
        </body>
    </html>
  );
}
