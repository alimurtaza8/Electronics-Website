
// PAYPAL WEBHOOK  CODE


import { NextResponse } from "next/server";
// import { sendPaymentNotification, CustomerDetails } from "@/lib/emailService";
// import {sendPaymentNotification,CustomerDetails} from "@/app/lib/emailService"
import { sendPaymentNotification,CustomerDetails } from "@/lib/emailService";

export const runtime = "edge";

export async function POST(req: Request) {
  if (req.method !== "POST") {
    return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
  }

  const headers = Object.fromEntries(req.headers.entries());
  const requiredHeaders = [
    "paypal-auth-algo",
    "paypal-cert-url",
    "paypal-transmission-id",
    "paypal-transmission-sig",
    "paypal-transmission-time",
  ];

  if (!requiredHeaders.every((header) => headers[header])) {
    return NextResponse.json(
      { error: "Missing required PayPal headers" },
      { status: 400 }
    );
  }

  if (!process.env.PAYPAL_WEBHOOK_ID) {
    return NextResponse.json(
      { error: "Missing PAYPAL_WEBHOOK_ID" },
      { status: 500 }
    );
  }

  let event;
  const rawBody = await req.text();

  try {
    const isVerified = await verifyWebhook(rawBody, headers, process.env.PAYPAL_WEBHOOK_ID);
    if (!isVerified) {
      return NextResponse.json(
        { error: "Webhook verification failed" },
        { status: 400 }
      );
    }

    event = JSON.parse(rawBody);
  } catch (error) {
    console.error("Webhook verification failed:", error);
    return NextResponse.json({ error: "Webhook Error" }, { status: 400 });
  }

  try {
    switch (event.event_type) {
      case "PAYMENT.CAPTURE.COMPLETED": {
        const capture = event.resource;
        const payer = capture.payer;
        const purchaseUnit = capture.supplementary_data?.purchase_units?.[0] || {};

        const additionalData = purchaseUnit.custom_id
          ? JSON.parse(purchaseUnit.custom_id)
          : {};

        await handleSuccessfulPayment({
          amount: parseFloat(capture.amount.value),
          transactionId: capture.id,
          paymentStatus: "succeeded",
          firstName: payer.name?.given_name,
          lastName: payer.name?.surname,
          email: payer.email_address,
          phone: payer.phone?.phone_number?.national_number,
          address: payer.address?.address_line_1,
          city: payer.address?.admin_area_2,
          country: payer.address?.country_code,
          postalCode: payer.address?.postal_code,
          vin_number: additionalData.vin_number,
          termsAccepted: additionalData.termsAccepted
            ? JSON.stringify(additionalData.termsAccepted)
            : undefined,
        });
        break;
      }

      case "PAYMENT.CAPTURE.DECLINED": {
        const capture = event.resource;
        await handleFailedPayment({
          amount: parseFloat(capture.amount?.value || "0"),
          transactionId: capture.id,
          paymentStatus: "failed",
          customerEmail: capture.payer?.email_address,
          customerName: `${capture.payer?.name?.given_name || ""} ${capture.payer?.name?.surname || ""}`.trim(),
          error: capture.last_error?.message,
        });
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.event_type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook handler failed:", error);
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 }
    );
  }
}

async function getAccessToken() {
  const auth = Buffer.from(
    `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_SECRET_KEY}`
  ).toString("base64");

  const response = await fetch("https://api.sandbox.paypal.com/v1/oauth2/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${auth}`,
    },
    body: "grant_type=client_credentials",
  });

  const data = await response.json();
  return data.access_token;
}

async function verifyWebhook(rawBody: string, headers: Record<string, string>, webhookId: string) {
  const accessToken = await getAccessToken();
  const response = await fetch(
    "https://api.sandbox.paypal.com/v1/notifications/verify-webhook-signature",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        transmission_id: headers["paypal-transmission-id"],
        transmission_time: headers["paypal-transmission-time"],
        cert_url: headers["paypal-cert-url"],
        auth_algo: headers["paypal-auth-algo"],
        transmission_sig: headers["paypal-transmission-sig"],
        webhook_id: webhookId,
        webhook_event: rawBody,
      }),
    }
  );

  const data = await response.json();
  return data.verification_status === "SUCCESS";
}

interface PaymentSuccessData {
  amount: number;
  transactionId: string;
  paymentStatus: string;
  customerEmail?: string;
  customerName?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  vin_number?: string;
  address?: string;
  city?: string;
  country?: string;
  postalCode?: string;
  termsAccepted?: string;
  planName?: string;
  planId?: string;
}

async function handleSuccessfulPayment(data: PaymentSuccessData) {
  try {
    const customerDetails: CustomerDetails = {
      firstName: data.firstName || "Unknown",
      lastName: data.lastName || "Unknown",
      email: data.customerEmail || data.email || "no-email@example.com",
      phone: data.phone || "N/A",
      vin_number: data.vin_number || "N/A",
      address: data.address || "N/A",
      city: data.city || "N/A",
      country: data.country || "N/A",
      postalCode: data.postalCode || "N/A",
      planName: data.planName || "Unknown Plan",
      planId: data.planId || "N/A",
      amount: data.amount,
      transactionId: data.transactionId,
      termsAccepted: data.termsAccepted
        ? JSON.parse(data.termsAccepted) as { term1: boolean; term2: boolean; term3: boolean }
        : undefined,
    };
    console.log("Final Email Data:", customerDetails);
    await sendPaymentNotification(customerDetails);
  } catch (error) {
    console.error("Error handling payment:", error);
  }
}

async function handleFailedPayment(data: {
  amount: number;
  transactionId: string;
  paymentStatus: string;
  customerEmail?: string;
  customerName?: string;
  error?: string;
}) {
  try {
    const customerDetails: CustomerDetails = {
      firstName: data.customerName?.split(" ")[0] || "Unknown",
      lastName: data.customerName?.split(" ")[1] || "Unknown",
      email: data.customerEmail || "no-email@example.com",
      phone: "000-000-0000",
      vin_number: "00000000000000000",
      address: "Unknown Address",
      city: "Unknown City",
      country: "Unknown Country",
      postalCode: "00000",
      amount: data.amount,
      transactionId: data.transactionId,
    };

    await sendPaymentNotification(customerDetails);
  } catch (error) {
    console.error("Error sending payment notification:", error);
  }
}












