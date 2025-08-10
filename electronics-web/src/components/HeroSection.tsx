"use client";


import React, { useState, useEffect } from 'react';
import {  Star, ShoppingCart, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const router = useRouter();

  const handleProduct = () => {
    router.push('/products');
  }

  const heroSlides = [
    {
      id: 1,
      title: "iPhone 16 Pro Max",
      subtitle: "Revolutionary Technology",
      description: "Experience the most advanced iPhone yet with A18 Pro chip, titanium design, and pro camera system.",
      price: "$1,199",
      discountPrice: "$839",
      discount: "30% OFF",
      image: "/images/iphone_16.jpg",
      category: "Smartphones"
    },
    {
      id: 2,
      title: "MacBook Pro M4",
      subtitle: "Unleash Your Creativity",
      description: "The most powerful MacBook Pro ever with M4 chip, stunning Liquid Retina XDR display.",
      price: "$1,999",
      discountPrice: "$1,399",
      discount: "30% OFF",
      image: "/images/mac.jpg",
      category: "Laptops"
    },
    {
      id: 3,
      title: "iPad Pro M4",
      subtitle: "Your Next Computer",
      description: "Incredibly thin design with breakthrough M4 chip and stunning Ultra Retina XDR display.",
      price: "$1,299",
      discountPrice: "$909",
      discount: "30% OFF",
      image: "/images/iphone_m4.jpg",
      category: "Tablets"
    },
    {
      id: 4,
      title: "Samsung Smart Washer",
      subtitle: "Smart Home Innovation",
      description: "AI-powered washing with steam sanitize, pet hair removal, and smart connectivity.",
      price: "$1,200",
      discountPrice: "$899",
      discount: "25% OFF",
      image: "/images/washer.jpg",
      category: "Home Appliances"
    },
    {
      id: 5,
      title: "Premium Air Fryer",
      subtitle: "Healthy Cooking Revolution",
      description: "9-in-1 functionality with smart controls and oil-free cooking for healthier meals.",
      price: "$229",
      discountPrice: "$179",
      discount: "22% OFF",
      image: "/images/air_fyer.webp",
      category: "Kitchen Appliances"
    }
  ];

  useEffect(() => {
    if (isAutoPlaying) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isAutoPlaying, heroSlides.length]);

//   const nextSlide = () => {
//     setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
//     setIsAutoPlaying(false);
//   };

//   const prevSlide = () => {
//     setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
//     setIsAutoPlaying(false);
//   };

//   const goToSlide = (index) => {
//     setCurrentSlide(index);
//     setIsAutoPlaying(false);
//   };


const goToSlide = (index: number) => {
  setCurrentSlide(index);
  setIsAutoPlaying(false);
};

  const currentProduct = heroSlides[currentSlide];

  return (
    <div className="relative h-screen w-full overflow-hidden bg-gray-900">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={currentProduct.image}
          alt={currentProduct.title}
          className="h-full w-full object-cover transition-all duration-1000 ease-in-out"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-gray-900/60 to-transparent"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 flex h-full items-center">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            
            {/* Left Content */}
            <div className="text-white space-y-6 max-w-2xl">
              <div className="inline-flex items-center gap-2 bg-yellow-500/20 text-yellow-400 px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm">
                <Star className="w-4 h-4 fill-current" />
                <span>{currentProduct.category}</span>
              </div>
              
              <div className="space-y-4">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
                  {currentProduct.title}
                </h1>
                <p className="text-xl sm:text-2xl text-yellow-400 font-semibold">
                  {currentProduct.subtitle}
                </p>
                <p className="text-lg sm:text-xl text-gray-300 leading-relaxed max-w-xl">
                  {currentProduct.description}
                </p>
              </div>

              {/* Pricing */}
              <div className="flex items-center gap-4 flex-wrap">
                <div className="bg-red-600 text-white px-3 py-1 rounded-lg text-sm font-bold">
                  {currentProduct.discount}
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-3xl sm:text-4xl font-bold text-yellow-400">
                    {currentProduct.discountPrice}
                  </span>
                  <span className="text-xl text-gray-400 line-through">
                    {currentProduct.price}
                  </span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button className="group bg-yellow-500 hover:bg-yellow-600 text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-2 transform hover:scale-105"
                onClick={handleProduct}>
                  <ShoppingCart className="w-5 h-5" />
                  Buy Now
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                {/* <button className="border-2 border-white/30 text-white hover:bg-white/10 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 backdrop-blur-sm">
                  Learn More
                </button> */}
              </div>
            </div>

            {/* Right Content - Product Highlight (Hidden on mobile) */}
            <div className="hidden lg:block">
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
                <div className="text-center space-y-4">
                  <div className="text-yellow-400 text-6xl font-bold">
                    {currentProduct.discount}
                  </div>
                  <p className="text-white text-xl font-semibold">Limited Time Offer</p>
                  <p className="text-gray-300">Premium quality at unbeatable prices</p>
                  <div className="flex justify-center">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-6 h-6 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      {/* <button
        onClick={prevSlide}
        className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 transition-all duration-300 text-white hover:scale-110"
      >
        <ChevronLeft className="w-6 h-6" />
      </button> */}
      {/* <button
        onClick={nextSlide}
        className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 transition-all duration-300 text-white hover:scale-110"
      >
        <ChevronRight className="w-6 h-6" />
      </button> */}

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
        <div className="flex gap-3">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? 'bg-yellow-400 w-8'
                  : 'bg-white/50 hover:bg-white/70'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-800">
        <div
          className="h-full bg-yellow-400 transition-all duration-300 ease-linear"
          style={{ width: `${((currentSlide + 1) / heroSlides.length) * 100}%` }}
        />
      </div>
    </div>
  );
};

export default HeroSection;