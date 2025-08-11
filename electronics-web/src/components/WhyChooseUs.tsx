
"use client";

import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  Truck, 
  Headphones, 
  Award, 
  Clock, 
  Users,
  CheckCircle,
  Star,
  Zap,
  Globe,
  ArrowRight,
  Sparkles
} from 'lucide-react';

import { useRouter } from 'next/navigation';

const WhyChooseUs = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  const [counters, setCounters] = useState({
    customers: 0,
    products: 0,
    years: 0,
    satisfaction: 0
  });

  const features = [
    {
      id: 1,
      icon: <Shield className="w-8 h-8" />,
      title: "Lifetime Warranty",
      description: "Comprehensive protection for all your electronics with free repairs and replacements",
      image: "/images/i_1.jpg",
      highlight: "100% Coverage"
    },
    {
      id: 2,
      icon: <Truck className="w-8 h-8" />,
      title: "Same Day Delivery",
      description: "Delivery within 21 days",
      image: "/images/iphone_16.jpg",
      highlight: "Under 24 Hours"
    },
    {
      id: 3,
      icon: <Headphones className="w-8 h-8" />,
      title: "24/7 Expert Support",
      description: "Round-the-clock technical support from certified professionals",
      image: "/images/i_3.jpg",
      highlight: "Always Available"
    },
    {
      id: 4,
      icon: <Award className="w-8 h-8" />,
      title: "Certified Products",
      description: "100% genuine products with official manufacturer warranties",
      image: "/images/i_4.jpg",
      highlight: "Authentic Guarantee"
    }
  ];

  const stats = [
    { label: "Happy Customers", value: 5000, suffix: "+", icon: <Users className="w-6 h-6" /> },
    { label: "Products Available", value: 2500, suffix: "+", icon: <Globe className="w-6 h-6" /> },
    { label: "Years Experience", value: 10, suffix: "+", icon: <Clock className="w-6 h-6" /> },
    { label: "Satisfaction Rate", value: 99, suffix: "%", icon: <Star className="w-6 h-6" /> }
  ];

  const benefits = [
    "Free installation and setup service",
    "Price match guarantee policy",
    "Easy EMI and flexible payment options",
    "30-day money back guarantee",
    "Extended warranty available",
    "Trade-in programs for old devices"
  ];

  const router = useRouter();

  const handleCheck = () => {
    router.push('/products');
  }

  const handleContact = () => {
    router.push('/contact-us');
  }
  // Auto-rotate features
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Animate counters
  useEffect(() => {
    const animateCounters = () => {
      const duration = 2000;
      const steps = 60;
      const stepDuration = duration / steps;
      
      let currentStep = 0;
      const timer = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;
        
        setCounters({
          customers: Math.floor(5000 * progress),
          products: Math.floor(2500 * progress),
          years: Math.floor(10 * progress),
          satisfaction: Math.floor(99 * progress)
        });
        
        if (currentStep >= steps) {
          clearInterval(timer);
          setCounters({ customers: 5000, products: 2500, years: 10, satisfaction: 99 });
        }
      }, stepDuration);
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounters();
          observer.disconnect();
        }
      });
    });

    const element = document.getElementById('stats-section');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, #fbbf24 0%, transparent 50%), 
                           radial-gradient(circle at 80% 20%, #fbbf24 0%, transparent 50%),
                           radial-gradient(circle at 40% 80%, #fbbf24 0%, transparent 50%)`
        }} />
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-yellow-500/10 rounded-full blur-xl animate-pulse" />
      <div className="absolute bottom-40 right-20 w-32 h-32 bg-yellow-500/10 rounded-full blur-xl animate-pulse delay-1000" />
      
      <div className="relative z-10 py-20">
        <div className="container mx-auto px-4">
          
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-yellow-500/20 text-yellow-400 px-6 py-3 rounded-full text-sm font-medium mb-6 backdrop-blur-sm">
              <Sparkles className="w-4 h-4" />
              <span>Why Choose ElectroStore</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Experience Excellence
              <span className="block text-yellow-400">Beyond Compare</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Join thousands of satisfied customers who trust us for premium electronics, 
              unmatched service, and innovative solutions tailored for the modern world.
            </p>
          </div>

          {/* Main Features Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
            
            {/* Left: Feature Image */}
            <div className="relative">
              <div className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden group">
                <img
                  src={features[activeFeature].image}
                  alt={features[activeFeature].title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent" />
                
                {/* Feature Highlight Badge */}
                <div className="absolute top-6 left-6">
                  <div className="bg-yellow-500 text-gray-900 px-4 py-2 rounded-full font-bold text-sm flex items-center gap-2">
                    <Zap className="w-4 h-4" />
                    {features[activeFeature].highlight}
                  </div>
                </div>

                {/* Play Button Overlay */}
                {/* <div className="absolute inset-0 flex items-center justify-center">
                  <button className="w-20 h-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110">
                    <Play className="w-8 h-8 text-white ml-1" />
                  </button>
                </div> */}
              </div>
            </div>

            {/* Right: Features List */}
            <div className="space-y-6">
              {features.map((feature, index) => (
                <div
                  key={feature.id}
                  onClick={() => setActiveFeature(index)}
                  className={`cursor-pointer transition-all duration-500 rounded-2xl p-6 border-2 ${
                    activeFeature === index
                      ? 'bg-yellow-500/10 border-yellow-500/50 shadow-2xl shadow-yellow-500/20'
                      : 'bg-gray-800/50 border-gray-700/50 hover:bg-gray-700/50 hover:border-gray-600/50'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-xl transition-all duration-300 ${
                      activeFeature === index
                        ? 'bg-yellow-500 text-gray-900'
                        : 'bg-gray-700 text-gray-300'
                    }`}>
                      {feature.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className={`text-xl font-bold mb-2 transition-colors duration-300 ${
                        activeFeature === index ? 'text-yellow-400' : 'text-white'
                      }`}>
                        {feature.title}
                      </h3>
                      <p className="text-gray-300 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                    <div className={`transition-all duration-300 ${
                      activeFeature === index ? 'opacity-100 rotate-0' : 'opacity-50 rotate-45'
                    }`}>
                      <ArrowRight className="w-5 h-5 text-yellow-400" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stats Section */}
          <div id="stats-section" className="mb-20">
            <div className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 backdrop-blur-lg rounded-3xl p-8 border border-gray-600/30">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center group">
                    <div className="flex justify-center mb-4">
                      <div className="p-4 bg-yellow-500/20 rounded-2xl text-yellow-400 group-hover:bg-yellow-500/30 transition-all duration-300">
                        {stat.icon}
                      </div>
                    </div>
                    <div className="text-3xl lg:text-4xl font-bold text-white mb-2">
                      {index === 0 && counters.customers.toLocaleString()}
                      {index === 1 && counters.products.toLocaleString()}
                      {index === 2 && counters.years}
                      {index === 3 && counters.satisfaction}
                      <span className="text-yellow-400">{stat.suffix}</span>
                    </div>
                    <p className="text-gray-300 font-medium">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-6 bg-gray-800/40 hover:bg-gray-700/40 rounded-2xl border border-gray-700/30 hover:border-yellow-500/30 transition-all duration-300 group"
              >
                <div className="p-2 bg-yellow-500/20 rounded-lg group-hover:bg-yellow-500/30 transition-all duration-300">
                  <CheckCircle className="w-5 h-5 text-yellow-400" />
                </div>
                <span className="text-gray-300 group-hover:text-white transition-colors duration-300">
                  {benefit}
                </span>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="text-center">
            <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-3xl p-8 shadow-2xl">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                Ready to Experience the Difference?
              </h3>
              <p className="text-gray-800 mb-6 text-lg">
                Join our community of tech enthusiasts and discover why we&apos;re #1 electronics retailer
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-2 group"
                onClick={handleCheck}>
                  <span>Shop Now</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="border-2 border-gray-800 hover:bg-gray-800 text-gray-900 hover:text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300"
                onClick={handleContact}>
                  Contact Us
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;