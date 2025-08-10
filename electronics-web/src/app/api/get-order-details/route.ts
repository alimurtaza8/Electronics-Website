import { NextRequest, NextResponse } from "next/server";
import * as paypal from "@paypal/checkout-server-sdk";

// Initialize PayPal
const environment = new paypal.core.SandboxEnvironment(
  process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!,
  process.env.PAYPAL_SECRET_KEY!
);
const client = new paypal.core.PayPalHttpClient(environment);

export const dynamic = 'force-dynamic'; // This makes the route always dynamic

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const orderId = searchParams.get('orderId');

    if (!orderId) {
      return NextResponse.json(
        { error: "Order ID is required" },
        { status: 400 }
      );
    }

    const orderRequest = new paypal.orders.OrdersGetRequest(orderId);
    const order = await client.execute(orderRequest);

    if (!order.result) {
      throw new Error("Failed to fetch order details");
    }

    // Extract relevant information
    const orderDetails = {
      id: order.result.id,
      status: order.result.status,
      amount: order.result.purchase_units[0]?.amount,
      create_time: order.result.create_time,
      update_time: order.result.update_time
    };

    return NextResponse.json(orderDetails);
  } catch (error) {
    console.error("Error fetching order details:", error);
    return NextResponse.json(
      { error: "Failed to fetch order details" },
      { status: 500 }
    );
  }
} 