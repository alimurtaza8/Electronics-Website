
"use client";

import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  Truck, 
  Award, 
  CheckCircle,
  Users,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Zap,

  Package,

  CreditCard,
  RefreshCcw,

} from 'lucide-react';

import { useRouter } from 'next/navigation';

// Mock categories data - replace with your actual data
const categories = [
  { id: 1, name: 'Smartphones', image: '/images/sm.jpg' },
  { id: 2, name: 'Laptops', image: '/images/i_1.jpg' },
  { id: 3, name: 'Tablets', image: '/images/iphone_m4.jpg' },
  { id: 4, name: 'Air Pods', image: '/images/i_4.jpg' },
  { id: 5, name: 'Audio', image: '/images/a.jpg' },
];

const AboutPage = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  const [counters, setCounters] = useState({
    customers: 0,
    orders: 0,
    satisfaction: 0,
    experience: 0
  });

  const features = [
    {
      id: 1,
      icon: <Shield className="w-8 h-8 md:w-12 md:h-12" />,
      title: "Premium Quality Guarantee",
      description: "Every product comes with our comprehensive quality assurance and authentic manufacturer warranties. We partner directly with leading brands to ensure you receive only genuine, high-quality electronics.",
      highlights: ["100% Authentic Products", "Manufacturer Warranty", "Quality Tested", "No Counterfeit Items"]
    },
    {
      id: 2,
      icon: <Truck className="w-8 h-8 md:w-12 md:h-12" />,
      title: "Lightning Fast Delivery",
      description: "Experience the best delivery service. Our advanced logistics network ensures your products reach you safely and on time, every time.",
      highlights: ["Delivery", "Express Shipping", "Secure Packaging", "Real-time Tracking"]
    },
    {
      id: 3,
      icon: <Award className="w-8 h-8 md:w-12 md:h-12" />,
      title: "Award Winning Service",
      description: "Recognized as one of America’s leading electronics retailers, with multiple national awards for customer satisfaction, innovation, and service excellence. Our dedication to quality drives everything we do.",
      highlights: ["Industry Recognition", "Customer Choice Award", "Excellence in Service", "Innovation Leader"]
    },
    {
      id: 4,
      icon: <Users className="w-8 h-8 md:w-12 md:h-12" />,
      title: "Expert Customer Support",
      description: "Our team of certified technical experts provides round-the-clock support to help you make informed decisions and resolve any issues. Professional guidance at every step of your journey.",
      highlights: ["24/7 Support", "Technical Experts", "Multilingual Service", "Quick Resolution"]
    }
  ];

  const ourValues = [
    {
      icon: <Award className="w-8 h-8 text-yellow-500" />,
      title: 'Unmatched Quality',
      description: 'We source only the highest-grade electronics, ensuring every product meets our rigorous standards for performance and durability.',
    },
    {
      icon: <Zap className="w-8 h-8 text-yellow-500" />,
      title: 'Innovation at Heart',
      description: 'Our catalog is a testament to our passion for technology. We constantly update our offerings with the latest and most innovative products on the market.',
    },
    {
      icon: <Users className="w-8 h-8 text-yellow-500" />,
      title: 'Customer-Centric',
      description: 'Your satisfaction is our priority. Our dedicated support team is here to provide expert advice and ensure a seamless shopping experience.',
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-yellow-500" />,
      title: 'Trusted & Secure',
      description: 'Shop with confidence. We guarantee authentic products, secure transactions, and a transparent warranty process for your peace of mind.',
    },
  ];

  const benefits = [
    {
      icon: <CreditCard className="w-6 h-6" />,
      title: "Competitive Pricing",
      description: "Best prices in the market with price match guarantee and special discounts for bulk orders."
    },
    {
      icon: <RefreshCcw className="w-6 h-6" />,
      title: "Easy Returns & Exchange",
      description: "Hassle-free 30-day return policy with free pickup and instant refunds for your peace of mind."
    },
    {
      icon: <CreditCard className="w-6 h-6" />,
      title: "Flexible Payment Options",
      description: "Multiple payment methods including easy EMI plans, bank transfers, and cash on delivery."
    },
    {
      icon: <Package className="w-6 h-6" />,
      title: "Professional Installation",
      description: "Free installation and setup services by certified technicians for home appliances and devices."
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Extended Warranty",
      description: "Optional extended warranty plans to protect your investment with comprehensive coverage."
    },
    {
      icon: <RefreshCcw className="w-6 h-6" />,
      title: "Trade-in Programs",
      description: "Get the best value for your old devices with our generous trade-in and upgrade programs."
    }
  ];


  const router = useRouter();
  const handleProduct = () => {
    router.push('/products')
  }


  // Auto-rotate features
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Animate counters when section comes into view
  useEffect(() => {
    const animateCounters = () => {
      const targets = [5000, 2500, 99, 10];
      const keys = ['customers', 'orders', 'satisfaction', 'experience'];
      
      targets.forEach((target, index) => {
        let currentValue = 0;
        const increment = target / 100;
        
        const timer = setInterval(() => {
          currentValue += increment;
          if (currentValue >= target) {
            currentValue = target;
            clearInterval(timer);
          }
          
          setCounters(prev => ({
            ...prev,
            [keys[index]]: Math.floor(currentValue)
          }));
        }, 20);
      });
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounters();
          observer.disconnect();
        }
      });
    });

    const element = document.getElementById('stats-counter');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 py-16 sm:py-24 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-800 px-4 sm:px-6 py-2 sm:py-3 rounded-full text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              <span>Our Story</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Connecting You to the
              <span className="block text-yellow-600">Future of Technology</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 leading-relaxed mb-8">
              We started with a simple mission: to make cutting-edge technology accessible to everyone. 
              Today, we are the global leading destination for the latest electronics, driven by a passion 
              for innovation and an unwavering commitment to our customers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <button className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg transition-all duration-300 flex items-center justify-center gap-2 group"
              onClick={handleProduct}>
                <span>Explore Products</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              {/* <button className="border-2 border-gray-300 hover:border-yellow-500 text-gray-700 hover:text-yellow-600 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg transition-all duration-300">
                Learn More
              </button> */}
            </div>
          </div>
        </div>
      </div>

      {/* Product Categories Showcase */}
      <div className="py-12 sm:py-16 bg-white overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-8 sm:mb-12">
            From Our Shelves to Your Home
          </h2>
        </div>
        
        {/* Mobile: Grid Layout */}
        <div className="block sm:hidden px-4">
          <div className="grid grid-cols-2 gap-4">
            {categories.slice(0, 6).map((category) => (
              <div key={category.id} className="text-center group">
                <div className="relative overflow-hidden rounded-xl shadow-md">
                  <img 
                    src={category.image} 
                    alt={category.name} 
                    className="w-full h-32 object-cover transform group-hover:scale-105 transition-transform duration-300" 
                  />
                </div>
                <p className="mt-3 font-semibold text-gray-700 text-sm">{category.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop: Scrolling Animation */}
        <div className="hidden sm:block relative w-full">
          <div className="flex animate-marquee">
            {[...categories, ...categories].map((category, index) => (
              <div key={`${category.id}-${index}`} className="mx-4 lg:mx-6 text-center group flex-shrink-0">
                <div className="relative overflow-hidden rounded-2xl shadow-lg">
                  <img 
                    src={category.image} 
                    alt={category.name} 
                    className="h-32 sm:h-40 lg:h-48 w-48 sm:w-56 lg:w-64 object-cover transform group-hover:scale-105 transition-transform duration-300" 
                  />
                </div>
                <p className="mt-3 font-semibold text-gray-700 text-sm sm:text-base">{category.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Our Values Section */}
      <div className="py-16 sm:py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Why Shop With Us?
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              We&apos;re more than just a retailer; we&apos;re your partner in tech innovation and excellence.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {ourValues.map((value, index) => (
              <div key={index} className="text-center p-6 sm:p-8 bg-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group">
                <div className="flex justify-center mb-4 sm:mb-6">
                  <div className="p-3 sm:p-4 bg-yellow-100 group-hover:bg-yellow-500 rounded-xl transition-all duration-300">
                    <div className="group-hover:text-white transition-colors">
                      {value.icon}
                    </div>
                  </div>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">{value.title}</h3>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Features */}
      <div className="py-16 sm:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-800 px-4 sm:px-6 py-2 sm:py-3 rounded-full text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              <span>Why ElectroStore Stands Out</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Your Trusted Technology
              <span className="block text-yellow-600">Partner Since 2010</span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              We are a premier electronics retailer, committed to bringing you the latest technology 
              with uncompromising quality, exceptional service, and competitive prices.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
            {features.map((feature, index) => (
              <div
                key={feature.id}
                className={`group cursor-pointer transition-all duration-500 ${
                  activeFeature === index ? 'transform scale-105' : ''
                }`}
                onClick={() => setActiveFeature(index)}
              >
                <div className={`p-6 sm:p-8 rounded-2xl sm:rounded-3xl border-2 transition-all duration-500 ${
                  activeFeature === index
                    ? 'bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-300 shadow-2xl shadow-yellow-500/20'
                    : 'bg-gray-50 border-gray-200 hover:bg-gray-100 hover:border-gray-300'
                }`}>
                  <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
                    <div className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl transition-all duration-500 ${
                      activeFeature === index
                        ? 'bg-yellow-500 text-white shadow-lg'
                        : 'bg-white text-gray-600 group-hover:bg-yellow-100 group-hover:text-yellow-600'
                    }`}>
                      {feature.icon}
                    </div>
                    <div className="flex-1 space-y-3 sm:space-y-4">
                      <h3 className={`text-xl sm:text-2xl font-bold transition-colors duration-300 ${
                        activeFeature === index ? 'text-yellow-700' : 'text-gray-900'
                      }`}>
                        {feature.title}
                      </h3>
                      <p className="text-gray-700 leading-relaxed text-base sm:text-lg">
                        {feature.description}
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                        {feature.highlights.map((highlight, hIndex) => (
                          <div key={hIndex} className="flex items-center gap-2">
                            <CheckCircle className={`w-4 h-4 flex-shrink-0 ${
                              activeFeature === index ? 'text-yellow-600' : 'text-gray-500'
                            }`} />
                            <span className="text-xs sm:text-sm font-medium text-gray-700">{highlight}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Statistics Counter */}
      <div id="stats-counter" className="bg-gradient-to-r from-gray-900 to-gray-800 py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">
              Trusted by Thousands
            </h3>
            <p className="text-lg sm:text-xl text-gray-300">
              Numbers that speak for our commitment to excellence
            </p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <div className="text-center group">
              <div className="text-3xl sm:text-4xl lg:text-6xl font-bold text-yellow-400 mb-2">
                {counters.customers.toLocaleString()}+
              </div>
              <p className="text-gray-300 font-semibold text-base sm:text-lg">Happy Customers</p>
              {/* <p className="text-gray-400 text-xs sm:text-sm mt-1">Across Pakistan</p> */}
            </div>
            <div className="text-center group">
              <div className="text-3xl sm:text-4xl lg:text-6xl font-bold text-yellow-400 mb-2">
                {counters.orders.toLocaleString()}+
              </div>
              <p className="text-gray-300 font-semibold text-base sm:text-lg">Orders Completed</p>
              <p className="text-gray-400 text-xs sm:text-sm mt-1">Successfully Delivered</p>
            </div>
            <div className="text-center group">
              <div className="text-3xl sm:text-4xl lg:text-6xl font-bold text-yellow-400 mb-2">
                {counters.satisfaction}%
              </div>
              <p className="text-gray-300 font-semibold text-base sm:text-lg">Satisfaction Rate</p>
              <p className="text-gray-400 text-xs sm:text-sm mt-1">Customer Reviews</p>
            </div>
            <div className="text-center group">
              <div className="text-3xl sm:text-4xl lg:text-6xl font-bold text-yellow-400 mb-2">
                {counters.experience}+
              </div>
              <p className="text-gray-300 font-semibold text-base sm:text-lg">Years Experience</p>
              <p className="text-gray-400 text-xs sm:text-sm mt-1">In Electronics</p>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Grid */}
      <div className="py-16 sm:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 text-center mb-12 sm:mb-16">
            What Makes Us Different
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-white border-2 border-gray-200 hover:border-yellow-400 rounded-xl sm:rounded-2xl p-4 sm:p-6 transition-all duration-300 hover:shadow-xl group"
              >
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="p-2 sm:p-3 bg-yellow-100 group-hover:bg-yellow-500 rounded-lg sm:rounded-xl transition-all duration-300 flex-shrink-0">
                    <div className="text-yellow-600 group-hover:text-white transition-colors">
                      {benefit.icon}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3 group-hover:text-yellow-700 transition-colors">
                      {benefit.title}
                    </h4>
                    <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action */}
      {/* <div className="bg-yellow-400 py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl sm:rounded-3xl p-8 sm:p-12 lg:p-16">
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 sm:mb-6">
                Ready to Experience Premium Electronics?
              </h3>
              <p className="text-lg sm:text-xl text-gray-300 mb-6 sm:mb-8 max-w-3xl mx-auto">
                Join thousands of satisfied customers who trust ElectroStore for their technology needs. 
                Discover why we're Pakistan's preferred choice for premium electronics.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                <button className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg transition-all duration-300 flex items-center justify-center gap-2 group">
                  <span>Start Shopping</span>
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="border-2 border-gray-600 hover:border-yellow-500 text-gray-300 hover:text-yellow-400 px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg transition-all duration-300">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        
        .animate-marquee {
          animation: marquee 25s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default AboutPage;