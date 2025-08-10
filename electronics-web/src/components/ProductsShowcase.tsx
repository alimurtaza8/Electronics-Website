

////////////////









"use client";

import React, { useState, useEffect } from 'react';
import { 
  ShoppingCart, 
  Heart, 
  Eye, 
  Star, 
  Zap,
  Smartphone,
  Laptop,
  Tablet,
  Home,
  ChefHat,
  ArrowRight,
  Percent,
  // Shield,

  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useCart } from '@/store/CartContext';



const ProductsShowcase = () => {
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);
  const [wishlist, setWishlist] = useState<Set<number>>(new Set());
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(4); // Default to a higher number
  const { addToCart } = useCart();



  const products = [
    {
      id: 1,
      category: 'Smartphones',
      icon: <Smartphone className="w-6 h-6" />,
      name: 'iPhone 16 Pro Max',
      brand: 'Apple',
      originalPrice: '$1,199',
      discountedPrice: '$839',
      discount: '30%',
      rating: 4.8,
      reviews: 2847,
      image: '/images/iphone_16.jpg',
      features: ['A18 Pro Chip', '48MP Camera', 'Titanium Design', '5G Ready'],
      inStock: true,
      badge: 'Best Seller'
    },
    {
      id: 2,
      category: 'Laptops',
      icon: <Laptop className="w-6 h-6" />,
      name: 'MacBook Pro M4 14"',
      brand: 'Apple',
      // originalPrice: '$1,999',
      // discountedPrice: '$1,399',
        originalPrice: '$1,199',
      discountedPrice: '$1399',
      discount: '30%',
      rating: 4.9,
      reviews: 1523,
      image: '/images/mac.jpg',
      features: ['M4 Chip', 'Liquid Retina XDR', '18-hour Battery', '512GB SSD'],
      inStock: true,
      badge: 'New Arrival'
    },
    {
      id: 3,
      category: 'Tablets',
      icon: <Tablet className="w-6 h-6" />,
      name: 'iPad Pro M4 13"',
      brand: 'Apple',
      originalPrice: '$1,299',
      discountedPrice: '$909',
      discount: '30%',
      rating: 4.7,
      reviews: 892,
      image: '/images/iphone_m4.jpg',
      features: ['M4 Chip', 'Ultra Retina XDR', 'Apple Pencil Pro', 'Magic Keyboard'],
      inStock: true,
      badge: 'Pro Choice'
    },
    {
      id: 4,
      category: 'Home Appliances',
      icon: <Home className="w-6 h-6" />,
      name: 'Samsung Smart Washer',
      brand: 'Samsung',
      originalPrice: '$1,200',
      discountedPrice: '$899',
      discount: '25%',
      rating: 4.6,
      reviews: 445,
      image: '/images/washer.jpg',
      features: ['AI Smart Dial', 'Steam Sanitize', 'Pet Hair Care', 'WiFi Enabled'],
      inStock: true,
      badge: 'Energy Star'
    },
    {
      id: 5,
      category: 'Kitchen',
      icon: <ChefHat className="w-6 h-6" />,
      name: 'Cosori Air Fryer Pro',
      brand: 'Cosori',
      originalPrice: '$229',
      discountedPrice: '$179',
      discount: '22%',
      rating: 4.5,
      reviews: 1289,
      image: '/images/air_fyer.webp',
      features: ['9-in-1 Functions', 'Smart Controls', 'Oil-Free Cooking', '6.8Qt Capacity'],
      inStock: true,
      badge: 'Top Rated'
    }
  ];

  // Responsive items per page calculation
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) setItemsPerPage(1);
      else if (width < 768) setItemsPerPage(2);
      else if (width < 1024) setItemsPerPage(3);
      else setItemsPerPage(4);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // FIX: Added useEffect to reset slider position on resize to prevent bugs
  useEffect(() => {
    setCurrentIndex(0);
  }, [itemsPerPage]);

  const toggleWishlist = (productId: number) => {
    const newWishlist = new Set(wishlist);
    if (newWishlist.has(productId)) {
      newWishlist.delete(productId);
    } else {
      newWishlist.add(productId);
    }
    setWishlist(newWishlist);
  };

  const calculateSavings = (original: string, discounted: string) => {
    const originalNum = parseInt(original.replace(/[$,]/g, ''));
    const discountedNum = parseInt(discounted.replace(/[$,]/g, ''));
    return originalNum - discountedNum;
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex < products.length - itemsPerPage ? prevIndex + 1 : 0
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex > 0 ? prevIndex - 1 : products.length - itemsPerPage
    );
  };

  const handleAddToCart = (product: typeof products[0]) => {
    // FIX: Parse the price string to a clean number before adding to the cart.
    // This solves the "$1" issue for items over $1,000.
    // const productPrice = parseInt(product.discountedPrice.replace(/[$,]/g, ''));

    // addToCart({
    //   id: product.id.toString(),
    //   name: product.name,
    //   image: product.image,
    //   price: productPrice, // Pass the corrected numerical price
    //   displayPrice: product.discountedPrice // You can still pass the display string if your cart uses it
    // });
addToCart({
  id: product.id.toString(),
  name: product.name,
  image: product.image,
  displayPrice: product.discountedPrice
});

  };

  return (
    <div className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Zap className="w-4 h-4" />
            <span>Featured Products</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Top Products by Category
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our best-selling products across all categories with exclusive discounts and premium quality
          </p>
        </div>

        {/* Products Carousel */}
        <div className="relative mb-12">
          <div className="overflow-hidden">
            {/* FIX: Removed the complex width calculation from the parent div */}
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(calc(-${currentIndex} * (100% / ${itemsPerPage})))` }}
            >
              {products.map((product) => (
                <div 
                  key={product.id}
                  // FIX: Set each item's width to be a simple fraction of the container
                  className="flex-shrink-0 p-3"
                  style={{ width: `calc(100% / ${itemsPerPage})` }}
                >
                  <div
                    className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group relative overflow-hidden h-full flex flex-col"
                    onMouseEnter={() => setHoveredProduct(product.id)}
                    onMouseLeave={() => setHoveredProduct(null)}
                  >
                    <div className="relative">
                      {/* Badge */}
                      <div className="absolute top-4 left-4 z-20">
                        <span className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                          {product.badge}
                        </span>
                      </div>

                      {/* Discount Badge */}
                      <div className="absolute top-4 right-4 z-20">
                        <div className="bg-red-500 text-white px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-1">
                          <Percent className="w-3 h-3" />
                          {product.discount} OFF
                        </div>
                      </div>

                      {/* Quick Actions */}
                      <div className={`absolute top-16 right-4 z-20 flex flex-col gap-2 transition-all duration-300 ${
                        hoveredProduct === product.id ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
                      }`}>
                        <button
                          onClick={() => toggleWishlist(product.id)}
                          className={`p-2 rounded-full shadow-lg transition-all duration-200 ${
                            wishlist.has(product.id)
                              ? 'bg-red-500 text-white'
                              : 'bg-white text-gray-600 hover:bg-red-500 hover:text-white'
                          }`}
                        >
                          <Heart className={`w-4 h-4 ${wishlist.has(product.id) ? 'fill-current' : ''}`} />
                        </button>
                        <button className="p-2 bg-white text-gray-600 hover:bg-yellow-500 hover:text-white rounded-full shadow-lg transition-all duration-200">
                          <Eye className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Product Image */}
                      <div className="relative h-64 overflow-hidden rounded-t-2xl">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300" />
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="p-6 space-y-4 flex-grow flex flex-col">
                      <div className="flex-grow">
                        {/* Category & Brand */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-gray-500 text-sm">
                            {product.icon}
                            <span>{product.category}</span>
                          </div>
                          <span className="text-gray-400 text-sm font-medium">{product.brand}</span>
                        </div>

                        {/* Product Name */}
                        <h3 className="text-lg font-bold text-gray-900 line-clamp-2 group-hover:text-yellow-600 transition-colors mt-4">
                          {product.name}
                        </h3>

                        {/* Rating */}
                        <div className="flex items-center gap-2 mt-2">
                          <div className="flex text-yellow-400">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < Math.floor(product.rating) ? 'fill-current' : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm font-medium text-gray-700">{product.rating}</span>
                          <span className="text-sm text-gray-500">({product.reviews})</span>
                        </div>

                        {/* Price */}
                        <div className="space-y-2 mt-4">
                          <div className="flex items-baseline gap-3">
                            <span className="text-2xl font-bold text-gray-900">
                              {product.discountedPrice}
                            </span>
                            <span className="text-lg text-gray-500 line-through">
                              {product.originalPrice}
                            </span>
                          </div>
                          <div className="text-sm text-green-600 font-medium">
                            You save ${calculateSavings(product.originalPrice, product.discountedPrice)}
                          </div>
                        </div>
                      </div>

                      {/* Action Button */}
                      <button 
                        onClick={() => handleAddToCart(product)}
                        className="w-full bg-gray-900 hover:bg-yellow-500 text-white py-3 px-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 group/btn mt-4">
                        <ShoppingCart className="w-5 h-5" />
                        <span>Add to Cart</span>
                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Navigation Arrows */}
          {products.length > itemsPerPage && (
            <>
              <button 
                onClick={prevSlide}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-30 bg-white rounded-full shadow-lg p-3 hover:bg-gray-100 transition-colors -translate-x-1/2 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Previous products"
                disabled={currentIndex === 0}
              >
                <ChevronLeft className="w-6 h-6 text-gray-800" />
              </button>
              <button 
                onClick={nextSlide}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-30 bg-white rounded-full shadow-lg p-3 hover:bg-gray-100 transition-colors translate-x-1/2 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Next products"
                disabled={currentIndex >= products.length - itemsPerPage}
              >
                <ChevronRight className="w-6 h-6 text-gray-800" />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsShowcase;