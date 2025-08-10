

/////////////////////////////  PAYPAL PAYMENT SYSTEM





/////////////////////////////////////////////////


"use client";

import { Suspense, useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import type { PayPalButtonsComponentProps } from "@paypal/react-paypal-js";
// import { Input } from "@/components/input";
import { Input } from "@/components/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/select";
// import { usePriceStore } from "@/store/priceStore";
import { Lock, Shield, CreditCard, CheckCircle } from "lucide-react";
// import { useSearchParams } from "next/navigation";
import { useCart } from "@/store/CartContext"; 
import { parsePrice } from "@/lib/parsePrice";
import emailjs from '@emailjs/browser';

function PaymentContent() {
  const { cart, clearCart } = useCart();
  const totalAmount = cart.reduce((total, item) => total + parsePrice(item.displayPrice) * item.quantity, 0);

  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    country: "",
    postalCode: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleCountryChange = (value: string) => {
    setUserInfo((prev) => ({ ...prev, country: value }));
  };

  const countries = [
    { value: "ar", label: "Argentina" },
    { value: "au", label: "Australia" },
    { value: "br", label: "Brazil" },
    { value: "ca", label: "Canada" },
    { value: "cn", label: "China" },
    { value: "de", label: "Germany" },
    { value: "es", label: "Spain" },
    { value: "fr", label: "France" },
    { value: "in", label: "India" },
    { value: "it", label: "Italy" },
    { value: "jp", label: "Japan" },
    { value: "mx", label: "Mexico" },
    { value: "ng", label: "Nigeria" },
    { value: "nz", label: "New Zealand" },
    { value: "ru", label: "Russia" },
    { value: "sa", label: "Saudi Arabia" },
    { value: "za", label: "South Africa" },
    { value: "kr", label: "South Korea" },
    { value: "se", label: "Sweden" },
    { value: "ch", label: "Switzerland" },
    { value: "tr", label: "Turkey" },
    { value: "ae", label: "United Arab Emirates" },
    { value: "uk", label: "United Kingdom" },
    { value: "us", label: "United States" },
  ];

  const createPayPalOrder: PayPalButtonsComponentProps["createOrder"] = async () => {
    setPaymentError(null); 
    
    if (totalAmount <= 0) {
        setPaymentError("Your cart is empty.");
        return;
    }

    if (!userInfo.country) {
        setPaymentError("Please select a country.");
        return;
    }

    if (!userInfo.postalCode) {
        setPaymentError("Please enter a postal code.");
        return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/create-paypal-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userInfo,
          cart: cart.map(item => ({
              id: item.id,
              name: item.name,
              quantity: item.quantity,
              price: parsePrice(item.displayPrice)
          }))
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to create PayPal order");
      }

      return data.orderId;
    } catch (error) {
      console.error("Error creating PayPal order:", error);
      setPaymentError(error instanceof Error ? error.message : "Failed to create order");
      throw error;
    } finally {
        setIsSubmitting(false);
    }
  };

  const sendConfirmationEmail = async (orderId: string) => {
    try {
      const totalAmount = cart.reduce((total, item) => total + parsePrice(item.displayPrice) * item.quantity, 0).toFixed(2);
      const cartDetailsHtml = cart.map(item => `
          <tr>
              <td style="padding: 12px; border-bottom: 1px solid #eeeeee;">${item.name}</td>
              <td style="padding: 12px; border-bottom: 1px solid #eeeeee; text-align: center;">${item.quantity}</td>
              <td style="padding: 12px; border-bottom: 1px solid #eeeeee; text-align: right;">$${(parsePrice(item.displayPrice) * item.quantity).toFixed(2)}</td>
          </tr>
      `).join('');

      const templateParams = {
        from_name: `${userInfo.firstName} ${userInfo.lastName}`,
        from_email: userInfo.email,
        phone_number: userInfo.phone,
        shipping_address: `${userInfo.address}, ${userInfo.city}, ${userInfo.postalCode.toUpperCase()}`,
        message: `
          <table style="width: 100%; border-collapse: collapse;">
              <thead>
                  <tr>
                      <th style="padding: 12px; border-bottom: 2px solid #e0e0e0; text-align: left;">Product</th>
                      <th style="padding: 12px; border-bottom: 2px solid #e0e0e0; text-align: center;">Quantity</th>
                      <th style="padding: 12px; border-bottom: 2px solid #e0e0e0; text-align: right;">Price</th>
                  </tr>
              </thead>
              <tbody>
                  ${cartDetailsHtml}
              </tbody>
              <tfoot>
                  <tr>
                      <td colspan="2" style="padding: 12px; text-align: right; font-weight: 600;">Total Paid:</td>
                      <td style="padding: 12px; text-align: right; font-weight: 600;">$${totalAmount}</td>
                  </tr>
              </tfoot>
          </table>
          <p style="margin-top: 24px; font-size: 14px; color: #555555;">
              <strong>Order ID:</strong> ${orderId}<br>
              <strong>Order Date:</strong> ${new Date().toLocaleDateString()}
          </p>
        `
      };

      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        templateParams,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );

      console.log('Confirmation email sent successfully');
    } catch (error) {
      console.error('Failed to send confirmation email:', error);
    }
  };

  const onApprove: PayPalButtonsComponentProps["onApprove"] = async (data) => {
    try {
      setPaymentError(null); 
      const response = await fetch("/api/capture-paypal-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderID: data.orderID
        }),
      });

      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.error || responseData.details || "Payment failed");
      }
      
      await sendConfirmationEmail(data.orderID);

      clearCart();
      window.location.href = `/payment-success?orderId=${data.orderID}`;
    } catch (error) {
      console.error("Error capturing PayPal payment:", error);
      setPaymentError(error instanceof Error ? error.message : "Payment failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full space-y-8 bg-white shadow-xl rounded-lg overflow-hidden">
        {/* Header Section */}
        <div className="bg-gray-800 text-white p-6 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-yellow-400">Checkout</h1>
          <div className="flex items-center justify-center space-x-3 mt-4">
            <Lock className="w-6 h-6 text-yellow-400" />
            <span className="text-xl">
              Total Amount: <span className="font-bold text-white">${totalAmount.toFixed(2)}</span>
            </span>
          </div>
        </div>

        {/* Security Badges */}
        <div className="flex justify-center gap-8 py-4 bg-gray-100 border-b border-gray-200">
          <div className="flex items-center space-x-2 text-gray-700">
            <Shield className="w-5 h-5 text-yellow-500" />
            <span>256-bit SSL Secured</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-700">
            <CreditCard className="w-5 h-5 text-yellow-500" />
            <span>PCI Compliant</span>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-8 p-8">
          {/* Customer Information Column */}
          <div>
            <h2 className="text-2xl font-semibold mb-6 text-gray-800 flex items-center">
              <CheckCircle className="mr-3 text-yellow-500" />
              Customer Details
            </h2>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                  <Input
                    name="firstName"
                    value={userInfo.firstName}
                    onChange={handleInputChange}
                    placeholder="John"
                    className="w-full border-gray-300 focus:ring-yellow-500 focus:border-yellow-500 rounded-md shadow-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                  <Input
                    name="lastName"
                    value={userInfo.lastName}
                    onChange={handleInputChange}
                    placeholder="Doe"
                    className="w-full border-gray-300 focus:ring-yellow-500 focus:border-yellow-500 rounded-md shadow-sm"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <Input
                  name="email"
                  type="email"
                  value={userInfo.email}
                  onChange={handleInputChange}
                  placeholder="johndoe@example.com"
                  className="w-full border-gray-300 focus:ring-yellow-500 focus:border-yellow-500 rounded-md shadow-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <Input
                  name="phone"
                  value={userInfo.phone}
                  onChange={handleInputChange}
                  placeholder="+1 (123) 456-7890"
                  className="w-full border-gray-300 focus:ring-yellow-500 focus:border-yellow-500 rounded-md shadow-sm"
                />
              </div>
               <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                <Input
                  name="address"
                  value={userInfo.address}
                  onChange={handleInputChange}
                  placeholder="123 Main St"
                  className="w-full border-gray-300 focus:ring-yellow-500 focus:border-yellow-500 rounded-md shadow-sm"
                />
              </div>
            </div>
          </div>

          {/* Payment Column */}
          <div className="mt-14">
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                  <Input
                    name="city"
                    value={userInfo.city}
                    onChange={handleInputChange}
                    placeholder="New York"
                    className="w-full border-gray-300 focus:ring-yellow-500 focus:border-yellow-500 rounded-md shadow-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                  <Select onValueChange={handleCountryChange} value={userInfo.country}>
                    <SelectTrigger className="w-full border-gray-300 focus:ring-yellow-500 focus:border-yellow-500 rounded-md shadow-sm">
                      <SelectValue placeholder="Select Country" />
                    </SelectTrigger>
                    <SelectContent className="max-h-[300px] overflow-y-auto bg-white text-black dark:bg-gray-800 dark:text-white">
                      {countries.map((country) => (
                        <SelectItem key={country.value} value={country.value}>
                          {country.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Postal Code</label>
                    <Input
                        name="postalCode"
                        value={userInfo.postalCode}
                        onChange={handleInputChange}
                        placeholder="10001"
                        className="w-full border-gray-300 focus:ring-yellow-500 focus:border-yellow-500 rounded-md shadow-sm"
                    />
                </div>

              {/* PayPal Payment Section */}
              <div className="mt-6 border-t pt-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Payment Method</h3>
                {paymentError && (
                  <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md">
                    {paymentError}
                  </div>
                )}
                {!userInfo.country && (
                    <div className="mb-4 p-3 bg-yellow-50 text-yellow-700 rounded-md">
                        Please select a country to enable payment options.
                    </div>
                )}
                <PayPalScriptProvider options={{
                  clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!,
                  currency: "USD",
                }}>
                  <div className={!userInfo.country || !userInfo.postalCode || isSubmitting ? "opacity-50 pointer-events-none" : ""}>
                    <PayPalButtons
                      style={{ layout: "vertical" }}
                      createOrder={createPayPalOrder}
                      onApprove={onApprove}
                      onError={(err) => {
                        console.error("PayPal Error:", err);
                        setPaymentError("Payment processing failed. Please try again.");
                      }}
                    />
                  </div>
                </PayPalScriptProvider>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PaymentPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading payment gateway...</p>
          </div>
        </div>
      }
    >
      <PaymentContent />
    </Suspense>
  );
}

export const dynamic = "force-dynamic";