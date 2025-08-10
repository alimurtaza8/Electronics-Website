import { NextRequest, NextResponse } from "next/server";
import * as paypal from "@paypal/checkout-server-sdk";
// import convertToSubcurrency from "@/lib/convertToSubcurrency";
// import { headers } from "next/headers";

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

// Define interface for user information
interface UserInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  postalCode: string;
}

interface CartItem {
    id: string;
    name: string;
    quantity: number;
    price: number;
}

interface RequestBody {
    userInfo: UserInfo;
    cart: CartItem[];
}

// function getSiteUrl(request: NextRequest): string {
//   // Try to get the site URL from environment variable first
//   if (process.env.NEXT_PUBLIC_SITE_URL) {
//     return process.env.NEXT_PUBLIC_SITE_URL;
//   }

//   // If not available, construct it from the request
//   const host = headers().get("host") || request.headers.get("host") || "";
//   const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
//   return `${protocol}://${host}`;
// }

export async function POST(request: NextRequest) {
  try {
    const { userInfo, cart }: RequestBody = await request.json();

    // Validate cart
    if (!cart || cart.length === 0) {
        return NextResponse.json(
            { error: "Cart is empty" },
            { status: 400 }
        );
    }

    const totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);

    // Validate amount
    if (!totalAmount || parseFloat(totalAmount) <= 0) {
      return NextResponse.json(
        { error: "Invalid amount" },
        { status: 400 }
      );
    }

    // const siteUrl = getSiteUrl(request);

    try {
      const order = new paypal.orders.OrdersCreateRequest();
      order.requestBody({
        intent: "CAPTURE",
        purchase_units: [
          {
            amount: {
              currency_code: "USD",
              value: (parseFloat(totalAmount) + 5.00 + 2.50).toFixed(2), // Add shipping and tax
              breakdown: {
                item_total: {
                  currency_code: "USD",
                  value: totalAmount,
                },
                shipping: {
                    currency_code: "USD",
                    value: "5.00"
                },
                tax_total: {
                    currency_code: "USD",
                    value: "2.50"
                },
                discount: {
                    currency_code: "USD",
                    value: "0.00"
                },
                handling: {
                    currency_code: "USD",
                    value: "0.00"
                },
                insurance: {
                    currency_code: "USD",
                    value: "0.00"
                },
                shipping_discount: {
                    currency_code: "USD",
                    value: "0.00"
                }
              }
            },
            items: cart.map(item => ({
                name: item.name,
                unit_amount: {
                    currency_code: "USD",
                    value: item.price.toFixed(2),
                },
                quantity: item.quantity.toString(),
                sku: item.id,
                category: "PHYSICAL_GOODS"
            })),
            description: "Electronics Store Purchase",
            custom_id: `CUST_${Date.now()}`,
            reference_id: `REF_${Date.now()}`,
            shipping: {
                name: {
                    full_name: `${userInfo.firstName} ${userInfo.lastName}`
                },
                address: {
                    address_line_1: userInfo.address,
                    admin_area_2: userInfo.city,
                    postal_code: userInfo.postalCode,
                    country_code: userInfo.country.toUpperCase()
                }
            }
          },
        ],
        application_context: {
          brand_name: "ElectroMart",
          shipping_preference: "GET_FROM_FILE",
          user_action: "PAY_NOW",
          return_url: `${request.nextUrl.origin}/payment-success`,
          cancel_url: `${request.nextUrl.origin}/payment`
        }
      });

      const response = await paypalClient.execute(order);
      
      if (response.statusCode !== 201) {
        throw new Error("Failed to create PayPal order");
      }

      return NextResponse.json({ orderId: response.result.id });

    } catch (error: unknown) {
      console.error("PayPal API Error:", error);
      return NextResponse.json(
        { 
          error: "Failed to create PayPal order",
          details: error instanceof Error ? error.message : "Unknown error"
        },
        { status: 500 }
      );
    }

  } catch (error: unknown) {
    console.error("Request processing error:", error);
    return NextResponse.json(
      { 
        error: "Invalid request",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 400 }
    );
  }
} 