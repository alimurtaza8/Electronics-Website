


// Again New code FOr email js


// import { EmailJSResponseStatus } from '@emailjs/nodejs';
// import * as emailjs from '@emailjs/nodejs';
import emailjs from '@emailjs/browser';


export interface CustomerDetails {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  vin_number: string;
  address: string;
  city: string;
  country: string;
  postalCode: string;
  planName?: string;
  planId?: string;
  amount?: number;
  transactionId?: string;
  termsAccepted?: {
    term1: boolean;
    term2: boolean;
    term3: boolean;
  };
}

export const sendPaymentNotification = async (details: CustomerDetails) => {
  try {
    // Verify required environment variables
    if (!process.env.EMAILJS_SERVICE_ID) {
      throw new Error('Missing EMAILJS_SERVICE_ID environment variable');
    }
    if (!process.env.EMAILJS_TEMPLATE_ID) {
      throw new Error('Missing EMAILJS_TEMPLATE_ID environment variable');
    }
    if (!process.env.EMAILJS_PUBLIC_KEY) {
      throw new Error('Missing EMAILJS_PUBLIC_KEY environment variable');
    }
    if (!process.env.EMAILJS_PRIVATE_KEY) {
      throw new Error('Missing EMAILJS_PRIVATE_KEY environment variable');
    }
    if (!process.env.NOTIFICATION_EMAIL) {
      throw new Error('Missing NOTIFICATION_EMAIL environment variable');
    }

    // Add debugging log
    console.log('Preparing to send email with details:', {
      serviceId: process.env.EMAILJS_SERVICE_ID,
      templateId: process.env.EMAILJS_TEMPLATE_ID,
      customerName: `${details.firstName} ${details.lastName}`,
      amount: details.amount,
    });

//     const templateParams = {
//       to_name: 'Admin',
//       from_name: `${details.firstName} ${details.lastName}`, // Match template variable
//       user_email: details.email, // Match template variable
//       message: `New payment received!\n
// Amount: $${details.amount?.toFixed(2)}\n
// Transaction ID: ${details.transactionId}\n
// Phone: ${details.phone}\n
// VIN Number: ${details.vin_number}\n
// Address: ${details.address}, ${details.city}, ${details.country} ${details.postalCode}\n
// `,
// };

    // Initialize EmailJS with credentials
    // const templateParams = {
    //   to_name: 'Admin',
    //   from_name: `${details.firstName} ${details.lastName}`,
    //   user_email: details.email,
    //   message: `New payment received!\n
    // Amount: $${details.amount?.toFixed(2)}\n
    // Transaction ID: ${details.transactionId}\n
    // Phone: ${details.phone}\n
    // VIN Number: ${details.vin_number}\n
    // Address: ${details.address}, ${details.city}, ${details.country} ${details.postalCode}\n
    // Terms Accepted:\n
    // - Term 1: ${details.termsAccepted?.term1 ? '✅' : '❌'}\n
    // - Term 2: ${details.termsAccepted?.term2 ? '✅' : '❌'}\n
    // - Term 3: ${details.termsAccepted?.term3 ? '✅' : '❌'}`,
    // };

    // In your emailjs.ts - Only modify the templateParams section
const templateParams = {
  to_name: 'Admin',
  from_name: `${details.firstName} ${details.lastName}`,
  customer_email: details.email,
  phone: details.phone,
  vin_number: details.vin_number,
  address: details.address,
  city: details.city,
  country: details.country,
  postal_code: details.postalCode,
  plan_name: details.planName || 'Standard Plan', // Add these if missing
  plan_id: details.planId || 'N/A',              // in your CustomerDetails
  amount: `$${details.amount?.toFixed(2)}`,
  payment_status: 'Completed',
  // message: `Terms Accepted:
  //   • ${details.termsAccepted?.term1 ? '✅' : '❌'} Voluntary Purchase Agreement
  //   • ${details.termsAccepted?.term2 ? '✅' : '❌'} Non-refundable Policy 
  //   • ${details.termsAccepted?.term3 ? '✅' : '❌'} Privacy & Terms Acceptance`
  // message: `Terms Accepted:
  // • ${details.termsAccepted?.term1 ? '✅' : '❌'} Voluntary Purchase Agreement
  // • ${details.termsAccepted?.term2 ? '✅' : '❌'} Non-refundable Policy
  // • ${details.termsAccepted?.term3 ? '✅' : '❌'} Privacy & Terms Acceptance
  // `
  message: `Terms Accepted:
  - Voluntary Purchase Agreement: ${details.termsAccepted?.term1 ? '✅' : '❌'}
  - Non-refundable Policy: ${details.termsAccepted?.term2 ? '✅' : '❌'}
  - Privacy & Terms Acceptance: ${details.termsAccepted?.term3 ? '✅' : '❌'}`
};
    
    
    emailjs.init({
      publicKey: process.env.EMAILJS_PUBLIC_KEY,
      // privateKey: process.env.EMAILJS_PRIVATE_KEY,
    });

    // Add debugging log
    console.log('Sending email with template params:', {
      ...templateParams,
      user_email: '***@***.com', // Masked for logging
    });

    const response = await emailjs.send(
      process.env.EMAILJS_SERVICE_ID,
      process.env.EMAILJS_TEMPLATE_ID,
      templateParams
    );

    if (response.status === 200) {
      console.log('Payment notification email sent successfully', {
        messageId: response.text,
        status: response.status,
      });
      return response;
    } else {
      throw new Error(`EmailJS responded with status ${response.status}: ${response.text}`);
    }
  } catch (error) {
    // Enhanced error logging
    console.error('Failed to send payment notification:', {
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
      details: {
        customerName: `${details.firstName} ${details.lastName}`,
        amount: details.amount,
      },
    });
    throw error;
  }
};