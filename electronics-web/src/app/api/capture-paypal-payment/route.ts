import { NextRequest, NextResponse } from "next/server";
import * as paypal from "@paypal/checkout-server-sdk";

// Validate that PayPal credentials exist
if (!process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || !process.env.PAYPAL_SECRET_KEY) {
  throw new Error("PayPal credentials are not defined in environment variables");
}

// Initialize PayPal client
const environment = process.env.NODE_ENV === 'production'
  ? new paypal.core.LiveEnvironment(
      process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!,
      process.env.PAYPAL_SECRET_KEY!
    )
  : new paypal.core.SandboxEnvironment(
      process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!,
      process.env.PAYPAL_SECRET_KEY!
    );
const paypalClient = new paypal.core.PayPalHttpClient(environment);

interface RequestBody {
  orderID: string;
}

export async function POST(request: NextRequest) {
  try {
    const { orderID }: RequestBody = await request.json();

    // Validate orderID
    if (!orderID) {
      return NextResponse.json(
        { error: "Order ID is required" },
        { status: 400 }
      );
    }

    try {
      // Create capture request
      const captureRequest = new paypal.orders.OrdersCaptureRequest(orderID);
      
      // Execute the capture
      const response = await paypalClient.execute(captureRequest);

      // Log the full response for debugging
      console.log("PayPal Capture Response:", JSON.stringify(response.result, null, 2));

      if (response.statusCode !== 201 || response.result.status !== "COMPLETED") {
        throw new Error(`Capture failed. Status: ${response.result.status}`);
      }
      
      // Extract capture ID and amount from the response
      const captureId = response.result.purchase_units[0].payments.captures[0].id;
      const capturedAmount = response.result.purchase_units[0].payments.captures[0].amount;

      return NextResponse.json({
        success: true,
        captureId: captureId,
        amount: capturedAmount,
        status: response.result.status
      });

    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Detailed PayPal Error:", {
          message: error.message,
          name: error.name
        });
      }

      return NextResponse.json(
        { 
          error: "Payment capture failed",
          details: error instanceof Error ? error.message : 'Unknown error'
        },
        { status: 400 }
      );
    }

  } catch (error: unknown) {
    console.error("PayPal Capture Error:", error);
    return NextResponse.json(
      { 
        error: "Failed to process payment",
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 