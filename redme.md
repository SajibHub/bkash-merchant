# API Documentation for bKash Payment Integration

This API allows you to integrate bKash payment gateway into your application. It includes endpoints for creating payments, handling payment callbacks, and processing refunds.

## Table of Contents

- [API Endpoints](#api-endpoints)
  - [POST /api/bkash/payment/create](#post-apibkashpaymentcreate)
  - [GET /api/bkash/payment/callback](#get-apibkashpaymentcallback)
  - [POST /api/bkash/payment/refund/:trxID](#post-apibkashpaymentrefundtrxid)
- [Request and Response Formats](#request-and-response-formats)
  - [Request Headers](#request-headers)
  - [Response Format](#response-format)
- [Error Handling](#error-handling)
- [How to Use](#how-to-use)
  - [Setting Up](#setting-up)
  - [Environment Variables](#environment-variables)

---

## API Endpoints

### POST /api/bkash/payment/create

This endpoint creates a payment request for bKash. It generates a payment URL where users can proceed with the payment.

#### Request Body:
```json
{
  "amount": 1000,
}
