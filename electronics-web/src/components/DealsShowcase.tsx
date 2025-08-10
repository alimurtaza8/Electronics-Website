



"use client";

import React, { useState, useEffect } from 'react';
import { 
  Clock,  
  Zap,
  Gift,
  Shield 
} from 'lucide-react';

const DealsShowcase = () => {
  const [, setTimeLeft] = useState({
    days: 2,
    hours: 14,
    minutes: 32,
    seconds: 45
  });

  // Countdown timer logic remains the same
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const topPicks = [
    {
      id: 1,
      name: 'MacBook Air 13-inch Laptop - Apple M4 chip Built for...',
      brand: 'Apple',
      image: '/images/mac.jpg',
    },
    {
      id: 2,
      name: 'AirPods Pro 2, Wireless Active Noise Cancelling Earbuds...',
      brand: 'Apple',
      image: '/images/air_pod.jpg',
    },
    {
      id: 3,
      name: 'Switch 2 - Mario Kart World Bundle - Nintendo Switch 2',
      brand: 'Nintendo',
      image: '/images/mario.jpg',
    },
    {
      id: 4,
      name: '11-inch iPad A16 chip with Wi-Fi - 128GB - Silver',
      brand: 'Apple',
      image: '/images/iphone_m4.jpg',
    }
  ];
  
  // The 'outletDeals' data is no longer needed and has been removed.

  return (
    <div className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left: Main Showcase Banner */}
          <div className="lg:col-span-5">
            <div className="relative h-full min-h-[500px] bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 rounded-3xl overflow-hidden group">
              
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-10 right-10 w-32 h-32 border-4 border-yellow-400 rounded-full" />
                <div className="absolute bottom-20 left-10 w-24 h-24 border-4 border-yellow-400 rounded-full" />
                <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-yellow-400 rounded-full blur-xl" />
              </div>

              <div className="relative z-10 p-8 lg:p-12 h-full flex flex-col justify-between">
                
                {/* Updated Title and Text */}
                <div className="space-y-6">
                  <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                    <Zap className="w-5 h-5 text-yellow-400" />
                    <span className="text-white font-medium">Weekly Spotlight</span>
                  </div>
                  
                  <div className="space-y-4">
                    <h1 className="text-4xl lg:text-6xl font-bold text-yellow-400 leading-tight">
                      Exclusive
                    </h1>
                    <h2 className="text-3xl lg:text-5xl font-bold text-white leading-tight">
                      Deals on
                      <br />
                      Premium Tech
                    </h2>
                  </div>
                  
                  <p className="text-xl text-blue-100 font-medium">
                    Handpicked offers on the latest electronics.
                  </p>
                  <p className="text-blue-200">
                    Don&apos;t miss out on these incredible savings.
                  </p>
                </div>

                {/* Countdown Timer */}
                <div className="mt-4 space-y-6">
                  <div className="bg-yellow-400 text-blue-900 px-6 py-4 rounded-2xl">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="w-5 h-5" />
                      <span className="font-bold text-lg">OFFER ENDS SOON</span>
                    </div>
                  </div>
                  
                  {/* The action button has been removed */}
                </div>
              </div>
            </div>
          </div>

          {/* Right: Product Sections */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Today's Top Picks */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Today&apos;s Top Picks</h2>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {topPicks.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group overflow-hidden"
                  >
                    <div className="flex p-4">
                      <div className="w-24 h-24 flex-shrink-0">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="ml-4 flex-grow">
                        <span className="text-sm text-gray-500 font-medium">{product.brand}</span>
                        <h3 className="font-medium text-gray-900 line-clamp-3">
                          {product.name}
                        </h3>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* The "Outlet Deals" and "Top Deals" sections have been removed */}

            {/* New Arrivals Banner */}
            <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl p-6 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-yellow-500 rounded-xl">
                    <Zap className="w-6 h-6 text-gray-900" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">New Arrivals</h3>
                    <p className="text-gray-300">The latest in tech, just landed.</p>
                  </div>
                </div>
                {/* The "Explore" button has been removed */}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Features Bar */}
        <div className="mt-16 bg-white rounded-2xl shadow-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center space-y-3">
              <div className="p-4 bg-yellow-100 rounded-2xl">
                <Clock className="w-8 h-8 text-yellow-600" />
              </div>
              <h4 className="font-bold text-gray-900">Limited Time Offers</h4>
              <p className="text-gray-600 text-sm">Exclusive deals that won&apos;t last long</p>
            </div>
            <div className="flex flex-col items-center space-y-3">
              <div className="p-4 bg-yellow-100 rounded-2xl">
                <Shield className="w-8 h-8 text-yellow-600" />
              </div>
              <h4 className="font-bold text-gray-900">Authentic Products</h4>
              <p className="text-gray-600 text-sm">100% genuine with full manufacturer warranty</p>
            </div>
            <div className="flex flex-col items-center space-y-3">
              <div className="p-4 bg-yellow-100 rounded-2xl">
                <Gift className="w-8 h-8 text-yellow-600" />
              </div>
              <h4 className="font-bold text-gray-900">Special Pricing</h4>
              <p className="text-gray-600 text-sm">Unbeatable prices on premium electronics</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DealsShowcase;