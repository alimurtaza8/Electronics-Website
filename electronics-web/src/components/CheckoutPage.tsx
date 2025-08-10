
////////////////////// PAYPAL





"use client";

import React, { useEffect, useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import emailjs from "@emailjs/browser";
// import convertToSubcurrency from "@/lib/convertToSubcurrency";
// import convertToSubcurrency from "@/app/lib/convertToSubcurrency"
import convertToSubcurrency from "@/lib/convertToSubcurrency";
import { useSearchParams } from "next/navigation";

interface UserInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  vin_number: string;
  address: string;
  city: string;
  country: string;
  postalCode: string;
}

interface CheckoutPageProps {
  amount: number;
  userInfo: UserInfo;
  planName?: string;
  planId?: string;
}

const CheckoutPage: React.FC<CheckoutPageProps> = ({
  amount,
  userInfo,
  planName: initialPlanName = "Standard Plan",
  planId: initialPlanId = "default-plan",
}) => {
  const searchParams = useSearchParams();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [loading, setLoading] = useState(false);
  const [planDetails, setPlanDetails] = useState({
    planName: initialPlanName,
    planId: initialPlanId,
  });

  // Terms and Conditions State
  const [termsAccepted, setTermsAccepted] = useState({
    term1: false,
    term2: false,
    term3: false,
  });

  const handleTermChange = (term: keyof typeof termsAccepted) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setTermsAccepted(prev => ({
      ...prev,
      [term]: e.target.checked,
    }));
  };

  const allTermsAccepted = Object.values(termsAccepted).every(Boolean);

  useEffect(() => {
    const urlPlanName = searchParams.get("planName");
    const urlPlanId = searchParams.get("planId");

    setPlanDetails({
      planName: urlPlanName || initialPlanName,
      planId: urlPlanId || initialPlanId,
    });
  }, [searchParams, initialPlanName, initialPlanId]);

  const sendPaymentNotification = async () => {
    try {
      const templateParams = {
        to_name: "Admin",
        from_name: `${userInfo.firstName} ${userInfo.lastName}`,
        customer_email: userInfo.email,
        phone: userInfo.phone,
        vin_number: userInfo.vin_number,
        address: userInfo.address,
        city: userInfo.city,
        country: userInfo.country,
        postal_code: userInfo.postalCode,
        amount: `$${amount}`,
        plan_name: planDetails.planName,
        plan_id: planDetails.planId,
        payment_status: "Completed",
        terms_accepted: JSON.stringify(termsAccepted),
        message: `New payment received for Plan: ${planDetails.planName} (${planDetails.planId}), VIN: ${userInfo.vin_number}`,
      };

      const result = await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        templateParams,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );

      console.log("Payment notification email sent successfully", result);
    } catch (error) {
      console.error("Failed to send payment notification email:", error);
    }
  };

  return (
    <div className="bg-white p-2 rounded-md">
      <div className="mb-4 p-3 bg-blue-50 rounded-md">
        <h3 className="text-lg font-semibold text-blue-800">Selected Plan</h3>
        <p className="text-blue-600">
          {planDetails.planName} - ${amount}
        </p>
      </div>

      {/* Terms and Conditions Section */}
      <div className="mt-6 border-t pt-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Terms and Conditions</h3>
        <div className="space-y-4 text-sm text-gray-600 max-h-64 overflow-y-auto pr-2">
          <div className="flex items-start space-x-2">
            <input
              type="checkbox"
              id="term1"
              checked={termsAccepted.term1}
              onChange={handleTermChange('term1')}
              className="h-4 w-4 mt-1 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="term1" className="flex-1">
              We don&apos;t pressure any visitor to buy the product; you choose to buy it on your own violation.
            </label>
          </div>
          <div className="flex items-start space-x-2">
            <input
              type="checkbox"
              id="term2"
              checked={termsAccepted.term2}
              onChange={handleTermChange('term2')}
              className="h-4 w-4 mt-1 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="term2" className="flex-1">
           I am purchasing a Vehicle Inspection Report from AutosVin (certified checks). The selected package will be delivered within 
               the specified timeframe using the provided payment method. I acknowledge that once the product is delivered, 
              I am not eligible for a refund.
            </label>
          </div>
          <div className="flex items-start space-x-2">
            <input
              type="checkbox"
              id="term3"
              checked={termsAccepted.term3}
              onChange={handleTermChange('term3')}
              className="h-4 w-4 mt-1 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="term3" className="flex-1">
              I have read and accepted the terms and conditions as well as the privacy statement.
            </label>
          </div>
        </div>
      </div>

      {errorMessage && (
        <div className="text-red-500 mt-2 text-sm">{errorMessage}</div>
      )}

      <div className="relative mt-4">
        {!allTermsAccepted && (
          <div className="absolute inset-0 bg-gray-100 bg-opacity-75 flex items-center justify-center z-10">
            <p className="text-red-500">Please accept all terms to proceed</p>
          </div>
        )}
        <PayPalScriptProvider options={{ 
          clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "",
          currency: "USD"
        }}>
          <PayPalButtons
            createOrder={async () => {
              if (!allTermsAccepted) {
                setErrorMessage("Please accept all terms and conditions to proceed.");
                throw new Error("Terms not accepted");
              }
              setLoading(true);
              try {
                const response = await fetch("/api/create-payment-intent", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    amount: convertToSubcurrency(amount),
                    userInfo: { ...userInfo, termsAccepted },
                  }),
                });
                if (!response.ok) throw new Error("Failed to create order");
                const data = await response.json();
                return data.orderId;
              } catch (error) {
                console.error("Error creating order:", error);
                setErrorMessage("Failed to create payment order. Please try again.");
                throw error;
              } finally {
                setLoading(false);
              }
            }}
            onApprove={async (data) => {
              setLoading(true);
              try {
                const response = await fetch("/api/capture-order", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ orderId: data.orderID }),
                });
                if (!response.ok) throw new Error("Failed to capture order");
                const captureData = await response.json();
                console.log("Payment captured:", captureData);
                await sendPaymentNotification();
                window.location.href = `${window.location.origin}/payment-success?amount=${amount}`;
              } catch (error) {
                console.error("Error capturing order:", error);
                setErrorMessage("Failed to capture payment. Please contact support.");
              } finally {
                setLoading(false);
              }
            }}
            onError={(err) => {
              console.error("PayPal error:", err);
              setErrorMessage("An error occurred with PayPal. Please try again.");
            }}
            onCancel={() => {
              setErrorMessage("Payment cancelled.");
            }}
          />
        </PayPalScriptProvider>
      </div>

      {loading && (
        <div className="flex items-center justify-center mt-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <p className="ml-2 text-gray-600">Processing...</p>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;
