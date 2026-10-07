import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Cashfree } from 'cashfree-pg';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Initialize Cashfree SDK securely on the backend
Cashfree.XClientId = process.env.CASHFREE_APP_ID;
Cashfree.XClientSecret = process.env.CASHFREE_SECRET_KEY;
Cashfree.XEnvironment = process.env.CASHFREE_ENVIRONMENT === 'PRODUCTION' ? Cashfree.Environment.PRODUCTION : Cashfree.Environment.SANDBOX;

app.post('/api/create-order', async (req, res) => {
  try {
    const { orderAmount, customerId, customerPhone, customerEmail, customerName } = req.body;

    const request = {
      order_amount: orderAmount || 1.00, // Example default amount
      order_currency: "INR",
      customer_details: {
        customer_id: customerId || "CUST_12345",
        customer_name: customerName || "Test User",
        customer_phone: customerPhone || "9999999999",
        customer_email: customerEmail || "test@example.com",
      },
      order_meta: {
        return_url: `http://localhost:5173/payment-status?order_id={order_id}`, // Change port/domain as needed
        notify_url: "https://your-webhook-domain.com/api/webhook/cashfree" // For prod deployment
      }
    };

    Cashfree.PGCreateOrder("2023-08-01", request).then((response) => {
      res.json(response.data);
    }).catch((error) => {
      console.error("Cashfree Order Creation Error:", error.response.data);
      res.status(500).json({ error: error.response.data.message || 'Payment initiation failed' });
    });

  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Webhook endpoint to receive payment status securely
app.post('/api/webhook/cashfree', (req, res) => {
  // Cashfree sends a signature in the headers to verify
  // Verify signature (You should use Cashfree signature verification here in production)
  const payload = req.body;
  console.log("Webhook received:", payload);
  // Update your database here using Supabase Admin client
  res.status(200).send("Webhook Received");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Cashfree Backend Server running on port ${PORT}`);
});
