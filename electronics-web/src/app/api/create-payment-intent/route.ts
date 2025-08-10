
// PAYPAL CODE

import { NextRequest, NextResponse } from "next/server";
import * as paypal from "@paypal/checkout-server-sdk";

// Validate that PayPal credentials exist
if (!process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || !process.env.PAYPAL_SECRET_KEY) {
  throw new Error("PayPal credentials are not defined in environment variables");
}

// Initialize PayPal client
const environment = new paypal.core.SandboxEnvironment(
  process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
  process.env.PAYPAL_SECRET_KEY
);
const paypalClient = new paypal.core.PayPalHttpClient(environment);

// Define interface for user information
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
  termsAccepted: {
    term1: boolean;
    term2: boolean;
    term3: boolean;
  };
}

// Define interface for request body
interface RequestBody {
  amount: number;
  userInfo: UserInfo;
}

export async function POST(request: NextRequest) {
  try {
    const { amount, userInfo }: RequestBody = await request.json();

    // Validate amount
    if (!amount || typeof amount !== "number") {
      return NextResponse.json(
        { error: "Invalid amount provided" },
        { status: 400 }
      );
    }

    // Validate user information
    if (!userInfo || !validateUserInfo(userInfo)) {
      return NextResponse.json(
        { error: "Invalid user information provided" },
        { status: 400 }
      );
    }

    // Create PayPal order request
    const orderRequest = new paypal.orders.OrdersCreateRequest();
    orderRequest.prefer("return=representation");
    orderRequest.requestBody({
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: (amount / 100).toFixed(2), // Convert cents to dollars
          },
          description: "VIN Check Report",
          custom_id: userInfo.vin_number
        },
      ],
      application_context: {
        brand_name: "VIN Check Service",
        shipping_preference: "NO_SHIPPING",
        user_action: "PAY_NOW",
        return_url: `${request.nextUrl.origin}/payment-success`,
        cancel_url: `${request.nextUrl.origin}/payment`
      }
    });

    // Execute order creation
    const order = await paypalClient.execute(orderRequest);

    return NextResponse.json({ orderId: order.result.id });
  } catch (error) {
    console.error("Internal Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

function validateUserInfo(userInfo: unknown): userInfo is UserInfo {
  if (typeof userInfo !== "object" || userInfo === null) {
    return false;
  }

  const u = userInfo as UserInfo;

  const basicFieldsValid =
    typeof u.firstName === "string" &&
    typeof u.lastName === "string" &&
    typeof u.email === "string" &&
    typeof u.phone === "string" &&
    typeof u.vin_number === "string" &&
    typeof u.address === "string" &&
    typeof u.city === "string" &&
    typeof u.country === "string" &&
    typeof u.postalCode === "string";

  const termsValid =
    typeof u.termsAccepted === "object" &&
    u.termsAccepted !== null &&
    "term1" in u.termsAccepted &&
    "term2" in u.termsAccepted &&
    "term3" in u.termsAccepted &&
    typeof u.termsAccepted.term1 === "boolean" &&
    typeof u.termsAccepted.term2 === "boolean" &&
    typeof u.termsAccepted.term3 === "boolean";

  return basicFieldsValid && termsValid;
}