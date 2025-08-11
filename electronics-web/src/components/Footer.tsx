"use client";


import React, { useState } from 'react';
import { 
  Zap,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Linkedin,
  Send,
  CreditCard,
  Shield,
  Clock,
  Star,
  Heart,
  ChevronUp,
  ExternalLink,
  Smartphone,
  Headphones,
  Award,
  CheckCircle
} from 'lucide-react';

interface Link {
  name: string;
  href: string;
  hot?: boolean;
  new?: boolean;
}

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerSections = [
    {
      title: "Product Categories",
      icon: <Smartphone className="w-5 h-5" />,
      links: [
        { name: "Smartphones", href: "#smartphones", hot: true },
        { name: "Laptops & PCs", href: "#laptops" },
        { name: "Tablets & iPads", href: "#tablets" },
        { name: "Home Appliances", href: "#appliances" },
        { name: "Kitchen Electronics", href: "#kitchen" },
        { name: "Audio & Accessories", href: "#audio" }
      ]
    },
    {
      title: "Customer Service",
      icon: <Headphones className="w-5 h-5" />,
      links: [
        { name: "Contact Us", href: "#contact" },
        { name: "Track Your Order", href: "#track" },
        { name: "Returns & Exchanges", href: "#returns" },
        { name: "Warranty Claims", href: "#warranty" },
        { name: "Technical Support", href: "#support" },
        { name: "Installation Service", href: "#installation" }
      ]
    },
    {
      title: "Company Info",
      icon: <Award className="w-5 h-5" />,
      links: [
        { name: "About luxado", href: "#about" },
        { name: "Our Story", href: "#story" },
        { name: "Careers", href: "#careers", new: true },
        { name: "Press & Media", href: "#press" },
        { name: "Investor Relations", href: "#investors" },
        { name: "Store Locations", href: "#locations" }
      ]
    },
    {
      title: "Policies & Legal",
      icon: <Shield className="w-5 h-5" />,
      links: [
        { name: "Privacy Policy", href: "#privacy" },
        { name: "Terms of Service", href: "#terms" },
        { name: "Shipping Policy", href: "#shipping" },
        { name: "Refund Policy", href: "#refund" },
        { name: "Cookie Policy", href: "#cookies" },
        { name: "Accessibility", href: "#accessibility" }
      ]
    }
  ];

  const socialLinks = [
    { icon: <Facebook className="w-5 h-5" />, href: "#", name: "Facebook", followers: "125K" },
    { icon: <Instagram className="w-5 h-5" />, href: "#", name: "Instagram", followers: "89K" },
    { icon: <Twitter className="w-5 h-5" />, href: "#", name: "Twitter", followers: "67K" },
    { icon: <Youtube className="w-5 h-5" />, href: "#", name: "YouTube", followers: "234K" },
    { icon: <Linkedin className="w-5 h-5" />, href: "#", name: "LinkedIn", followers: "45K" }
  ];

  const paymentMethods = [
    { name: "Visa", logo: "💳" },
    { name: "Mastercard", logo: "💳" },
    { name: "PayPal", logo: "🅿️" },
  ];

  const certifications = [
    { name: "ISO Certified", icon: <Award className="w-6 h-6" /> },
    { name: "SSL Secure", icon: <Shield className="w-6 h-6" /> },
    { name: "PCI Compliant", icon: <CreditCard className="w-6 h-6" /> }
  ];

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-white relative overflow-hidden">
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(45deg, #fbbf24 0%, transparent 50%), 
            linear-gradient(-45deg, #fbbf24 0%, transparent 50%),
            radial-gradient(circle at 30% 20%, #fbbf24 0%, transparent 30%),
            radial-gradient(circle at 70% 80%, #fbbf24 0%, transparent 30%)
          `
        }} />
      </div>

      {/* Newsletter Section */}
      <div className="relative z-10 bg-gradient-to-r from-yellow-500 to-yellow-600 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                Stay Updated with Latest Deals
              </h3>
              <p className="text-gray-800 text-lg">
                Get exclusive offers, new product launches, and tech news delivered to your inbox
              </p>
              <div className="flex items-center gap-4 mt-4">
                <div className="flex items-center gap-2 text-gray-800">
                  <Star className="w-5 h-5 fill-current" />
                  <span className="font-semibold">50,00+ Subscribers</span>
                </div>
                <div className="flex items-center gap-2 text-gray-800">
                  <Heart className="w-5 h-5 fill-current" />
                  <span className="font-semibold">Weekly Deals</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
              <div className="space-y-4">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full px-6 py-4 pr-16 rounded-xl bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-yellow-300/50 font-medium"
                  />
                  <button
                    onClick={handleSubscribe}
                    className="absolute right-2 top-2 bg-gray-900 hover:bg-gray-800 text-white p-2 rounded-lg transition-all duration-300 hover:scale-105"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
                {isSubscribed && (
                  <div className="flex items-center gap-2 text-green-800 bg-green-100 px-4 py-2 rounded-lg">
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-medium">Successfully subscribed!</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="relative z-10 py-16">
        <div className="container mx-auto px-4">
          
          {/* Top Section */}
          <div className="grid grid-cols-1 lg:grid-cols-6 gap-8 mb-12">
            
            {/* Company Info */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center">
                <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 p-3 rounded-xl mr-4">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">luxado</h1>
                  <p className="text-gray-400">Premium Electronics</p>
                </div>
              </div>
              
              <p className="text-gray-300 leading-relaxed text-lg">
                Trusted electronics retailer, bringing you the latest technology 
                with unmatched quality, service, and value since 2010.
              </p>

              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-gray-300 hover:text-yellow-400 transition-colors">
                  <Phone className="w-5 h-5" />
                  <span>+1 (317) 778-0618</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300 hover:text-yellow-400 transition-colors">
                  <Mail className="w-5 h-5" />
                  <span>info@luxado.com</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <MapPin className="w-5 h-5" />
                  <span>123 Main Street, Downtown, Los Angeles, CA 90012</span>
                </div>
              </div>

              {/* Store Hours */}
              <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50">
                <div className="flex items-center gap-2 text-yellow-400 mb-2">
                  <Clock className="w-5 h-5" />
                  <span className="font-semibold">Store Hours</span>
                </div>
                <div className="text-sm text-gray-300 space-y-1">
                  <div>Mon - Sat: 9:00 AM - 10:00 PM</div>
                  <div>Sunday: 11:00 AM - 8:00 PM</div>
                </div>
              </div>
            </div>

            {/* Footer Links */}
            {footerSections.map((section, index) => (
              <div key={index} className="space-y-4">
                <div className="flex items-center gap-2 text-yellow-400 font-bold text-lg">
                  {section.icon}
                  <span>{section.title}</span>
                </div>
                <ul className="space-y-3">
                  {/* {section.links.map((link, linkIndex) => ( */}
                  {section.links.map((link: Link, linkIndex) => (
                    <li key={linkIndex}>
                      <a
                        href={link.href}
                        className="text-gray-300 hover:text-yellow-400 transition-colors duration-200 flex items-center gap-2 group"
                      >
                        <span>{link.name}</span>
                        {/* {link.hot && ( 
                        */}

                        {link.hot?.toString() === 'true' && (
                          <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full font-bold">
                            HOT
                          </span>
                        )}
                        {link.new && (
                          <span className="bg-green-400 text-white text-xs px-2 py-0.5 rounded-full font-bold">
                            NEW
                          </span>
                        )}
                        <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Social Media & Certifications */}
          <div className="border-t border-gray-700 pt-12 mb-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Social Media */}
              <div>
                <h4 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <Heart className="w-5 h-5 text-red-500" />
                  Follow Us
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      className="flex items-center gap-3 p-4 bg-gray-800/50 hover:bg-gray-700/50 rounded-xl transition-all duration-300 group border border-gray-700/30 hover:border-yellow-500/50"
                    >
                      <div className="p-2 bg-gray-700 group-hover:bg-yellow-500 rounded-lg transition-all duration-300">
                        {social.icon}
                      </div>
                      <div>
                        <div className="text-white font-medium">{social.name}</div>
                        <div className="text-gray-400 text-sm">{social.followers}</div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              {/* Payment Methods */}
              <div>
                <h4 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-green-500" />
                  Payment Methods
                </h4>
                <div className="grid grid-cols-3 gap-3 mb-4">
                  {paymentMethods.map((method, index) => (
                    <div
                      key={index}
                      className="bg-gray-800/50 hover:bg-gray-700/50 p-4 rounded-xl text-center transition-all duration-300 border border-gray-700/30 hover:border-yellow-500/30 group"
                    >
                      <div className="text-2xl mb-2">{method.logo}</div>
                      <div className="text-xs text-gray-400 group-hover:text-gray-300">{method.name}</div>
                    </div>
                  ))}
                </div>
                <div className="text-sm text-gray-400">
                  All transactions are secured with 256-bit SSL encryption
                </div>
              </div>

              {/* Trust Badges */}
              <div>
                <h4 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-blue-500" />
                  Trust & Security
                </h4>
                <div className="space-y-4">
                  {certifications.map((cert, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-4 bg-gray-800/50 rounded-xl border border-gray-700/30"
                    >
                      <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400">
                        {cert.icon}
                      </div>
                      <div>
                        <div className="text-white font-medium">{cert.name}</div>
                        <div className="text-gray-400 text-sm">Verified & Secure</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Service Highlights */}
          {/* <div className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 backdrop-blur-sm rounded-2xl p-8 mb-12 border border-gray-600/30">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center group">
                <div className="bg-yellow-500/20 p-4 rounded-2xl w-fit mx-auto mb-4 group-hover:bg-yellow-500/30 transition-all duration-300">
                  <Truck className="w-8 h-8 text-yellow-400" />
                </div>
                <h5 className="font-bold text-white mb-2">Free Delivery</h5>
                <p className="text-gray-400 text-sm">On orders above PKR 25,000</p>
              </div>
              
              <div className="text-center group">
                <div className="bg-green-500/20 p-4 rounded-2xl w-fit mx-auto mb-4 group-hover:bg-green-500/30 transition-all duration-300">
                  <Shield className="w-8 h-8 text-green-400" />
                </div>
                <h5 className="font-bold text-white mb-2">Warranty</h5>
                <p className="text-gray-400 text-sm">Up to 3 years coverage</p>
              </div>
              
              <div className="text-center group">
                <div className="bg-blue-500/20 p-4 rounded-2xl w-fit mx-auto mb-4 group-hover:bg-blue-500/30 transition-all duration-300">
                  <Headphones className="w-8 h-8 text-blue-400" />
                </div>
                <h5 className="font-bold text-white mb-2">24/7 Support</h5>
                <p className="text-gray-400 text-sm">Expert help anytime</p>
              </div>
              
              <div className="text-center group">
                <div className="bg-purple-500/20 p-4 rounded-2xl w-fit mx-auto mb-4 group-hover:bg-purple-500/30 transition-all duration-300">
                  <Award className="w-8 h-8 text-purple-400" />
                </div>
                <h5 className="font-bold text-white mb-2">Authentic</h5>
                <p className="text-gray-400 text-sm">100% genuine products</p>
              </div>
            </div>
          </div> */}

          {/* Bottom Section */}
          <div className="border-t border-gray-700 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              
              {/* Copyright */}
              <div className="text-center md:text-left">
                <p className="text-gray-400">
                  © 2025 luxado. All rights reserved.
                </p>
                {/* <p className="text-gray-500 text-sm mt-1">
                  Designed & Developed with <Heart className="w-4 h-4 text-red-500 inline mx-1 fill-current" /> in Karachi
                </p> */}
              </div>

              {/* Links */}
              <div className="flex flex-wrap items-center gap-6 text-sm">
                <a href="#privacy" className="text-gray-400 hover:text-yellow-400 transition-colors">
                  Privacy Policy
                </a>
                <a href="#terms" className="text-gray-400 hover:text-yellow-400 transition-colors">
                  Terms of Use
                </a>
                <a href="#sitemap" className="text-gray-400 hover:text-yellow-400 transition-colors">
                  Sitemap
                </a>
              </div>

              {/* Back to Top */}
              <button
                onClick={scrollToTop}
                className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 p-3 rounded-full transition-all duration-300 hover:scale-110 group"
              >
                <ChevronUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;