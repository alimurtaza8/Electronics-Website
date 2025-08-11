
"use client";

import React, { useState, useEffect } from 'react';
import {
  Search,
  ShoppingCart,
  Heart,
  Menu,
  X,
  Phone,
  Mail,
  Zap,
  Shield,
  Headphones
} from 'lucide-react';
import { useCart } from '@/store/CartContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { cart, openCart } = useCart();
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);
  const [wishlistCount,] = useState(0); // Example, set to 0
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigationItems = [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/products' },
    { name: 'About Us', href: '/about-us' },
    { name: 'Contact Us', href: '/contact-us' }
  ];

  const topBarInfo = [
    { icon: <Phone className="w-4 h-4" />, text: '+1 (317) 778-0618', href: 'tel:+1 (317) 778-0618' },
    { icon: <Mail className="w-4 h-4" />, text: 'info@breakingstores.com', href: 'mailto:info@breakingstores.com' },
    // { icon: <MapPin className="w-4 h-4" />, text: 'Karachi, Pakistan', href: '#' }
  ];

  const toggleMenu = () => {
    const newMenuState = !isMenuOpen;
    setIsMenuOpen(newMenuState);
    document.body.style.overflow = newMenuState ? 'hidden' : 'unset';
  };

  return (
    <header className="w-full relative z-50">
      {/* Top Bar */}
      <div className="bg-gray-900 text-gray-300 text-sm py-2 hidden md:block">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-6">
              {topBarInfo.map((info, index) => (
                <a
                  key={index}
                  href={info.href}
                  className="flex items-center gap-2 hover:text-yellow-400 transition-colors duration-200"
                >
                  {info.icon}
                  <span>{info.text}</span>
                </a>
              ))}
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-green-400" />
                <span>Secure Shopping</span>
              </div>
              {/* <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-blue-400" />
                <span>Free Delivery</span>
              </div> */}
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className={`bg-white shadow-lg transition-all duration-300 ${isScrolled ? 'py-2' : 'py-4'}`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            
            {/* Logo */}
            <Link href="/" className="flex items-center cursor-pointer">
              <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 p-3 rounded-xl mr-3">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-2xl font-bold text-gray-900">Breaking Stores</h1>
                <p className="text-sm text-gray-600">Premium Electronics</p>
              </div>
            </Link>

            {/* Search Bar - Desktop */}
            <div className="hidden lg:flex flex-1 max-w-2xl mx-8">
              <form onSubmit={handleSearch} className="relative w-full">
                <input
                  type="text"
                  placeholder="Search for products, brands, and more..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-6 py-3 pl-12 pr-20 border-2 border-gray-200 rounded-full focus:border-yellow-400 focus:outline-none text-gray-700 bg-gray-50"
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <button type="submit" className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-full transition-colors duration-200">
                  Search
                </button>
              </form>
            </div>

            {/* Right Actions */}
            <div className="flex items-center space-x-4">
              
              {/* Search Icon - Mobile */}
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="lg:hidden p-2 text-gray-600 hover:text-yellow-500 transition-colors"
              >
                <Search className="w-6 h-6" />
              </button>

              {/* Support */}
              <div className="hidden md:flex items-center space-x-2 text-gray-600">
                <Headphones className="w-5 h-5" />
                <div className="text-sm">
                  <div className="font-semibold">24/7 Support</div>
                  <div className="text-xs text-gray-500">Online Help</div>
                </div>
              </div>

              {/* Wishlist */}
              <button className="relative p-2 text-gray-600 hover:text-red-500 transition-colors">
                <Heart className="w-6 h-6" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </button>

              {/* Shopping Cart */}
              <button onClick={openCart} className="relative p-2 text-gray-600 hover:text-yellow-500 transition-colors">
                <ShoppingCart className="w-6 h-6" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-yellow-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={toggleMenu}
                className="md:hidden p-2 text-gray-600 hover:text-yellow-500 transition-colors"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Search Bar */}
          {isSearchOpen && (
            <div className="lg:hidden mt-4 pb-4">
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-6 py-3 pl-12 border-2 border-gray-200 rounded-full focus:border-yellow-400 focus:outline-none text-gray-700 bg-gray-50"
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              </form>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Bar */}
      <nav className="bg-gray-50 border-t border-gray-200 hidden md:block">
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-8">
            {navigationItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="py-4 text-gray-700 hover:text-yellow-600 font-medium transition-colors duration-200"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden">
          <div className="fixed inset-y-0 left-0 w-80 bg-white shadow-xl">
            <div className="p-6">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center">
                  <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 p-2 rounded-lg mr-3">
                    
                    <Zap className="w-6 h-6 text-white" />
                    {/* <h1 className='text-xl font-bold text-black'>lux</h1> */}
                  </div>
                  <div>
                    <h1 className="text-xl font-bold text-gray-900">Breaking Stores</h1>
                  </div>
                </div>
                <button onClick={toggleMenu} className="p-2">
                  <X className="w-6 h-6 text-gray-600" />
                </button>
              </div>

              {/* Mobile Navigation */}
              <nav className="space-y-4">
                {navigationItems.map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    onClick={toggleMenu} // This will close the menu on click
                    className="block py-3 text-gray-700 hover:text-yellow-600 font-medium"
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>

              {/* Mobile User Actions */}
              {/* <div className="mt-8 pt-8 border-t border-gray-200 space-y-4">
                <button className="flex items-center space-x-3 w-full py-3 text-gray-700">
                  <User className="w-5 h-5" />
                  <span>My Account</span>
                </button>
                <button className="flex items-center space-x-3 w-full py-3 text-gray-700">
                  <Headphones className="w-5 h-5" />
                  <span>Customer Support</span>
                </button>
              </div> */}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;