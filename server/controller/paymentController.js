import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import dotenv, { parse } from 'dotenv';
dotenv.config();

// Function to get bKash headers with id_token and app key
const getBkashHeaders = async (bkashToekn) => ({
  'Content-Type': 'application/json',
  Accept: 'application/json',
  Authorization: bkashToekn,
  'x-app-key': process.env.bkash_api_key,
});

// Payment creation
export const paymentCreate = async (req, res) => {
  const { amount } = req.body;
  try {
    const response = await axios.post(
      process.env.bkash_create_payment_url,
      {
        mode: '0011',
        payerReference: ' ',
        callbackURL: `${process.env.backendUrl}/api/bkash/payment/callback`,
        amount: Number(amount).toFixed(2),
        currency: 'BDT',
        intent: 'sale',
        merchantInvoiceNumber: Math.floor(Math.random() * 1000000),
      },
      { headers: await getBkashHeaders(req.headers.bkashToekn) }
    );

    return res.status(200).json({ bkashURL: response.data.bkashURL });
  } catch (error) {
    return res.status(401).json({ error: error.message });
  }
};

// Payment callback to handle success, failure, and cancellation
export const paymentCallback = async (req, res) => {
  const { paymentID, status } = req.query;

  if (status === 'cancel' || status === 'failure') {
    return res.redirect(`${process.env.frontendUrl}/error?message=${status}`);
  }

  if (status === 'success') {
    try {
      const response = await axios.post(
        process.env.bkash_execute_payment_url,
        { paymentID },
        { headers: await getBkashHeaders(req.headers.bkashToekn) }
      );

      const { data } = response;

      if (data?.statusCode === '0000') {
        return res.redirect(`${process.env.frontendUrl}/success?paymentID=${data.paymentID}&trxID=${data.trxID}&amount=${data.amount}`);
      } else {
        return res.redirect(`${process.env.frontendUrl}/error?message=${data.statusMessage}`);
      }
    } catch (error) {
      return res.redirect(`${process.env.frontendUrl}/error?message=${error.message}`);
    }
  }
};

// Refund payment without MongoDB, now using transaction data from request
export const refundPayment = async (req, res) => {
  const { trxID, paymentID, amount } = req.body;

  if (!trxID || !paymentID || !amount) {
    return res.status(400).json({ error: 'Missing required transaction data' });
  }

  try {
    const response = await axios.post(
      process.env.bkash_refund_transaction_url,
      {
        paymentID,
        amount,
        trxID,
        sku: 'payment',
        reason: 'cashback',
      },
      { headers: await getBkashHeaders(req.headers.bkashToekn) }
    );

    const { data } = response;

    if (data?.statusCode === '0000') {
      return res.status(200).json({ message: 'Refund successful' });
    } else {
      return res.status(400).json({ error: data.statusMessage || 'Refund failed' });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message || 'Refund failed' });
  }
};
