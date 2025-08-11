"use client";

import React, { useState, useRef } from 'react';
import { 
 
  CheckCircle,

  MapPin,
  Phone,
  Mail,
  Clock,
  MessageSquare,
  Send,
  Smartphone,
  Laptop,
  Tablet,
  Home,
  ChefHat,
  Loader2
} from 'lucide-react';
import emailjs from "@emailjs/browser";

const ContactPage = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    from_name: '',
    user_email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState('general');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    try {
      setLoading(true);
      setError("");
      
      // Mock EmailJS functionality for demo
      // Replace with actual EmailJS implementation:
    
      const result = await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_2!,
        formRef.current,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );
      

      if (result.status === 200) {
  console.log('Email sent successfully!');
} else {
  console.error('Error sending email:', result);
}
    
      
      // Simulate email sending
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Email sent successfully!');
      setSuccess(true);
      setFormData({ from_name: '', user_email: '', subject: '', message: '' });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setSuccess(false);
      }, 5000);
      
    } catch (error) {
      console.error('Failed to send email:', error);
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Failed to send message. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: <MapPin className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: "Address",
      details: "123 Main Street, Downtown, Los Angeles, CA 90012",
      description: "Come see our latest electronics collection in person",
      color: "text-yellow-600",
      bgColor: "bg-yellow-100"
    },
    {
      icon: <Phone className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: "Call Us",
      details: "+1-212-123-4567",
      description: "Monday to Saturday, 9am to 8pm",
      color: "text-yellow-600",
      bgColor: "bg-yellow-100"
    },
    {
      icon: <Mail className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: "Email Us",
      details: "support@luxado.com",
      description: "We'll respond within 24 business hours",
      color: "text-yellow-600",
      bgColor: "bg-yellow-100"
    },
    {
      icon: <Clock className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: "Business Hours",
      details: "Monday - Saturday: 9am - 8pm",
      description: "Sunday: 10am - 6pm",
      color: "text-yellow-600",
      bgColor: "bg-yellow-100"
    }
  ];

  const supportCategories = [
    { id: 'general', name: 'General Inquiry', icon: <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5" /> },
    { id: 'smartphones', name: 'Smartphones', icon: <Smartphone className="w-4 h-4 sm:w-5 sm:h-5" /> },
    { id: 'laptops', name: 'Laptops', icon: <Laptop className="w-4 h-4 sm:w-5 sm:h-5" /> },
    { id: 'tablets', name: 'Tablets', icon: <Tablet className="w-4 h-4 sm:w-5 sm:h-5" /> },
    { id: 'appliances', name: 'Home Appliances', icon: <Home className="w-4 h-4 sm:w-5 sm:h-5" /> },
    { id: 'kitchen', name: 'Kitchen Tech', icon: <ChefHat className="w-4 h-4 sm:w-5 sm:h-5" /> }
  ];

  const faqs = [
    {
      question: "What is your return policy?",
      answer: "We offer a 30-day return policy on all electronics. Items must be in original condition with packaging."
    },
    {
      question: "How long does shipping take?",
      answer: "Most orders ship within 21 business days. Delivery times vary by location but typically take 25 business days in major cities."
    },
    {
      question: "Do you offer technical support?",
      answer: "Yes, we provide free technical support for all products purchased from our store for the first year."
    },
    // {
    //   question: "Do you have same-day delivery?",
    //   answer: "Yes, we offer same-day delivery in Karachi, Lahore, and Islamabad for orders placed before 2 PM."
    // }
  ];



  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 py-16 sm:py-24 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-800 px-4 sm:px-6 py-2 sm:py-3 rounded-full text-sm font-medium mb-6">
              <MessageSquare className="w-4 h-4" />
              <span>We&apos;re Here to Help</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Contact Our
              <span className="block text-yellow-600">Expert Support Team</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-700 leading-relaxed mb-8">
              Have questions about our products, need technical support, or want to learn more about our services? 
              Our dedicated team is ready to assist you with expert guidance and personalized solutions.
            </p>
          </div>
        </div>
      </div>

      {/* Contact Information Cards */}
      <div className="py-16 sm:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Get in Touch
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the best way to reach us - we&apos;re available through multiple channels for your convenience.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {contactInfo.map((item, index) => (
              <div key={index} className="text-center p-6 sm:p-8 bg-gray-50 rounded-2xl hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group">
                <div className="flex justify-center mb-4 sm:mb-6">
                  <div className={`p-3 sm:p-4 ${item.bgColor} group-hover:bg-yellow-500 rounded-xl transition-all duration-300`}>
                    <div className={`${item.color} group-hover:text-white transition-colors`}>
                      {item.icon}
                    </div>
                  </div>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">{item.title}</h3>
                <p className="text-gray-800 font-semibold mb-2">{item.details}</p>
                <p className="text-gray-600 text-sm sm:text-base">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content - Form and FAQ */}
      <div className="py-16 sm:py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            
            {/* Contact Form */}
            <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg p-6 sm:p-8 lg:p-10">
              <div className="mb-6 sm:mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">Send Us a Message</h2>
                <p className="text-gray-600 text-base sm:text-lg">Our expert team is ready to assist you with any questions or concerns.</p>
              </div>
              
              {/* Support Category Tabs */}
              <div className="mb-6 sm:mb-8">
                <p className="text-gray-700 font-semibold mb-3 sm:mb-4">What do you need help with?</p>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {supportCategories.map(category => (
                    <button
                      key={category.id}
                      onClick={() => setActiveTab(category.id)}
                      className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${
                        activeTab === category.id
                          ? 'bg-yellow-500 text-white shadow-lg'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {category.icon}
                      <span className="hidden sm:inline">{category.name}</span>
                      <span className="sm:hidden">{category.name.split(' ')[0]}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Success Message */}
              {success && (
                <div className="mb-6 sm:mb-8 bg-green-50 border border-green-200 rounded-xl p-4 sm:p-5 flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-green-800 mb-1">Message Sent Successfully!</h3>
                    <p className="text-green-700 text-sm sm:text-base">
                      Thank you for contacting us. Our team will respond to your inquiry within 24 hours.
                    </p>
                  </div>
                </div>
              )}

              {/* Error Message */}
              {error && (
                <div className="mb-6 sm:mb-8 bg-red-50 border border-red-200 rounded-xl p-4 sm:p-5">
                  <p className="text-red-700 text-sm sm:text-base">{error}</p>
                </div>
              )}

              {/* Contact Form */}
              <form ref={formRef} onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
                  <div>
                    <label htmlFor="from_name" className="block text-gray-700 font-semibold mb-2 text-sm sm:text-base">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="from_name"
                      name="from_name"
                      value={formData.from_name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 sm:py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition text-sm sm:text-base"
                      placeholder="John Doe"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="user_email" className="block text-gray-700 font-semibold mb-2 text-sm sm:text-base">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="user_email"
                      name="user_email"
                      value={formData.user_email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 sm:py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition text-sm sm:text-base"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                
                <div className="mb-4 sm:mb-6">
                  <label htmlFor="subject" className="block text-gray-700 font-semibold mb-2 text-sm sm:text-base">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 sm:py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition text-sm sm:text-base"
                    placeholder="How can we help?"
                  />
                </div>
                
                <div className="mb-6 sm:mb-8">
                  <label htmlFor="message" className="block text-gray-700 font-semibold mb-2 text-sm sm:text-base">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 sm:py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition text-sm sm:text-base resize-none"
                    placeholder="Tell us about your inquiry..."
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-3 sm:py-4 px-6 rounded-xl font-bold text-base sm:text-lg transition-all duration-300 flex items-center justify-center gap-2 ${
                    loading
                      ? 'bg-yellow-400 cursor-not-allowed'
                      : 'bg-yellow-500 hover:bg-yellow-600 transform hover:scale-[1.02] shadow-lg hover:shadow-xl'
                  } text-white`}
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* FAQ and Additional Info */}
            <div className="space-y-6 sm:space-y-8">
              {/* FAQ Section */}
              <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg p-6 sm:p-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">Frequently Asked Questions</h2>
                
                <div className="space-y-4 sm:space-y-6">
                  {faqs.map((faq, index) => (
                    <div key={index} className="border-b border-gray-200 pb-4 sm:pb-6 last:border-b-0 last:pb-0">
                      <h3 className="font-bold text-gray-900 mb-2 sm:mb-3 text-base sm:text-lg">{faq.question}</h3>
                      <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                        {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Support Team */}
              {/* <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg p-6 sm:p-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">Meet Our Support Team</h2>
                
                <div className="grid grid-cols-1 gap-4 sm:gap-6">
                  {supportTeam.map((member, index) => (
                    <div key={index} className="flex items-start gap-3 sm:gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover flex-shrink-0"
                      />
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900 text-sm sm:text-base">{member.name}</h3>
                        <p className="text-yellow-600 font-semibold text-xs sm:text-sm mb-1 sm:mb-2">{member.role}</p>
                        <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                          {member.specialty}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
    
    </div>
  );
};

export default ContactPage;