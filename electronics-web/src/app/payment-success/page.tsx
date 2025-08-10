



"use client";

// New Payment page with Web 3 style

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle } from "lucide-react";
import Link from "next/link";

interface OrderAmount {
  currency_code: string;
  value: string;
}

interface OrderDetails {
  id: string;
  status: string;
  amount: OrderAmount;
  create_time: string;
  update_time: string;
}

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      if (!orderId) {
        setError("No order ID provided");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`/api/get-order-details?orderId=${orderId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch order details");
        }
        const data = await response.json();
        setOrderDetails(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load order details");
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-8">
        <div className="text-red-500 mb-4">Error: {error}</div>
        <Link href="/" className="text-blue-500 hover:underline">Return to Home</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="mt-14 max-w-3xl mx-auto">
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gray-800 p-6 text-center">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-yellow-100 mb-4">
              <CheckCircle className="h-10 w-10 text-yellow-500" />
            </div>
            <h2 className="text-3xl font-bold text-yellow-400">Payment Successful!</h2>
            <p className="text-gray-200 mt-2">Your order is being processed</p>
          </div>

          {/* Order Details */}
          <div className="p-6">
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Details</h3>
              <dl className="grid grid-cols-1 gap-4">
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <dt className="text-gray-600">Order ID:</dt>
                  <dd className="text-gray-900 font-medium">{orderId}</dd>
                </div>
                {orderDetails && (
                  <>
                    <div className="flex justify-between py-2 border-b border-gray-200">
                      <dt className="text-gray-600">Amount Paid:</dt>
                      <dd className="text-gray-900 font-medium">
                        ${orderDetails.amount?.value || "N/A"}
                      </dd>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-200">
                      <dt className="text-gray-600">Status:</dt>
                      <dd className="text-yellow-600 font-medium">
                        {orderDetails.status || "Completed"}
                      </dd>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-200">
                      <dt className="text-gray-700">Date:</dt>
                      <dd className="text-gray-900 font-medium">
                        {new Date(orderDetails.create_time).toLocaleDateString()}
                      </dd>
                    </div>
                  </>
                )}
              </dl>
            </div>

            {/* Next Steps */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Next Steps</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>Your order is being processed</li>
                <li>You will receive an email confirmation shortly</li>
                <li>Your items will be shipped within 21 business days</li>
              </ul>
            </div>

            {/* Support Information */}
            {/* <div className="mt-8 p-4 bg-blue-50 rounded-lg">
              <p className="text-blue-800">
                If you have any questions, please contact our support team at{" "}
                <a href="mailto:support@example.com" className="font-semibold hover:underline">
                  support@example.com
                </a>
              </p>
            </div> */}

            {/* Return to Home */}
            <div className="mt-8 text-center">
              <Link
                href="/"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-yellow-500 hover:bg-yellow-600"
              >
                Return to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense 
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500"></div>
        </div>
      }
    >
      <PaymentSuccessContent />
    </Suspense>
  );
}

