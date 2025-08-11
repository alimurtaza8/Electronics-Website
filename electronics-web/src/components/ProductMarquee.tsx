"use client";

import React from 'react';

// Define the structure for a single product
interface Product {
  id: number;
  name: string;
  image: string;
}

// Array of products to be displayed in the marquee
const products: Product[] = [
  {
    id: 1,
    name: 'iPhone 16 Pro Max',
    image: '/images/iphone_16.jpg',
  },
  {
    id: 2,
    name: 'MacBook Pro M4 14"',
    image: '/images/iphone_m4.jpg',
  },
  {
    id: 3,
    name: 'iPad Pro M4 13"',
    image: '/images/i_5.jpg',
  },
  {
    id: 4,
    name: 'Samsung Smart Washer',
    image: '/images/washer.jpg',
  },
  {
    id: 5,
    name: 'Cosori Air Fryer Pro',
    image: '/images/air_fyer.webp',
  },
  {
    id: 6,
    name: 'AirPods Pro 2',
    image: '/images/i_4.jpg',
  },
  {
    id: 7,
    name: 'Nintendo Switch 2',
    image: '/images/mario.jpg',
  },
];

const ProductMarquee = () => {
  // We duplicate the products array to create a seamless loop for the animation.
  const extendedProducts = [...products, ...products];

  return (
    <>
      {/* This style block defines the CSS animation for the marquee.
        - `keyframes scroll`: Defines the movement from right to left.
        - `animation: scroll 40s linear infinite`: Applies the animation to the element.
        - `.group:hover .animate-scroll`: Pauses the animation on hover for better UX.
      */}
      <style jsx global>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          animation: scroll 40s linear infinite;
        }
        .group:hover .animate-scroll {
          animation-play-state: paused;
        }
      `}</style>

      <div className="bg-white py-12 sm:py-16">
        <div className="container mx-auto px-4">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                    Our Premium Collection
                </h2>
                <p className="text-lg text-gray-600 mt-2 max-w-2xl mx-auto">
                    A glimpse into the quality and innovation we offer.
                </p>
            </div>

            {/* The `group` class on the container allows us to control child animations on hover.
              `overflow-hidden` is essential to hide the off-screen products.
            */}
            <div className="relative group w-full overflow-hidden">
              <div className="flex animate-scroll">
                {extendedProducts.map((product, index) => (
                  <div
                    key={index}
                    className="flex-shrink-0 w-64 mx-4" // Each item has a fixed width and margin
                  >
                    <div className="bg-gray-50 rounded-2xl p-6 flex flex-col items-center text-center shadow-md transition-shadow duration-300 hover:shadow-xl">
                      <div className="h-48 w-full flex items-center justify-center mb-4">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="max-h-full max-w-full object-contain"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.onerror = null; 
                            target.src='https://placehold.co/400x400/f87171/ffffff?text=Image+Error';
                          }}
                        />
                      </div>
                      <h3 className="text-md font-semibold text-gray-800 h-12">
                        {product.name}
                      </h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>
        </div>
      </div>
    </>
  );
};

export default ProductMarquee;
