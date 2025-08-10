// import Image from "next/image";

import HeroSection from "@/components/HeroSection";
// import Header from "@/components/Header";
import ProductsShowcase from "@/components/ProductsShowcase";
import WhyChooseUs from "@/components/WhyChooseUs";
// import Footer from "@/components/Footer";
import DealsShowcase from "@/components/DealsShowcase";
// import AboutSection from "@/components/AboutSection";
import ProductMarquee from "@/components/ProductMarquee";
export default function Home() {
  return (
    <div  className="min-h-screen overflow-x-hidden w-full">
      {/* <Header /> */}
      <HeroSection />
      <ProductsShowcase />
      <WhyChooseUs />
      <DealsShowcase />
      <ProductMarquee />
      {/* <AboutSection /> */}
      {/* <Footer /> */}
    </div>
  );
}
