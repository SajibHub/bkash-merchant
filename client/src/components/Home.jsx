import React, { useState } from 'react';
import axios from "axios"
import '../App.css'; // Import the CSS file

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState('1.00'); // Default as string for controlled input
  const [error, setError] = useState(null); // Add error state

  const pay = async () => {
    setLoading(true);
    setError(null); // Clear previous errors
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/bkash/payment/create`,
        { amount: parseFloat(amount).toFixed(2) },
        { withCredentials: true }
      );
      window.location.href = data.bkashURL;
      setLoading(false)
    } catch (error) {
      const message = error?.response?.data?.message || error.message || 'Payment failed. Please try again.';
      setError(message);
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2 className="title">Pay with bKash</h2>
        <p className="subtitle">Enter the amount to initiate your payment</p>
        <form onSubmit={(e) => { e.preventDefault(); pay(); }} className="payment-form">
          <input
            className="input no-arrows"
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => {
              const value = e.target.value;
              if (/^\d*(\.\d{0,2})?$/.test(value) || value === '') {
                setAmount(value);
                setError(null); // Clear error on valid input
              }
            }}
            onBlur={() => {
              const parsed = parseFloat(amount);
              if (isNaN(parsed) || parsed < 1) {
                setAmount('1.00');
                setError('Amount must be at least 1');
              } else {
                setAmount(parsed.toFixed(2));
                setError(null);
              }
            }}
            disabled={loading}
            required
            step="0.01" // Allow decimal values
            aria-describedby="amount-error"
          />
          {error && (
            <p className="error" id="amount-error" role="alert">
              {error}
            </p>
          )}
          <button
            className="button"
            type="submit"
            disabled={loading}
            aria-busy={loading}
          >
            {loading ? 'Processing...' : `Pay ৳${parseFloat(amount).toFixed(2)}`}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Home;