// Ensure this is only used on the server
if (typeof window !== 'undefined') {
  throw new Error('Paystack utilities can only be used on the server.')
}

export const paystackConfig = {
  secretKey: process.env.PAYSTACK_SECRET_KEY!,
  publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY!
}

// Add Paystack utility functions here
