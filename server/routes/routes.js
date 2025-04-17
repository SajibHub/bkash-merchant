import express from 'express';
import { bkashToekn } from '../middleware/middleware.js';
import { paymentCreate, paymentCallback, refundPayment } from '../controller/paymentController.js';


const router = express.Router();

// Route to create a payment
router.post('/bkash/payment/create', bkashToekn, paymentCreate);

// Route for the callback after the payment process
router.get('/bkash/payment/callback', bkashToekn, paymentCallback);

// Route to handle refund for a specific transaction
router.post('/bkash/payment/refund', refundPayment); // No `:trxID` in the URL
export default router;
