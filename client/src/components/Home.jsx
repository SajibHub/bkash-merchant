import React, { useState } from 'react';
import axios from 'axios';

const Home = () => {
  const [loading, setLoading] = useState(false);

  const pay = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/bkash/payment/create`,
        { amount: 1000, userId: 1 },
        { withCredentials: true }
      );
      window.location.href = data.bkashURL;
    } catch (error) {
      console.log(error?.response?.data || error.message);
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Pay with bKash</h2>
        <p style={styles.subtitle}>Click below to initiate your payment</p>
        <button
          style={{
            ...styles.button,
            backgroundColor: loading ? '#ccc' : '#e2136e',
            cursor: loading ? 'not-allowed' : 'pointer',
          }}
          onClick={pay}
          disabled={loading}
        >
          {loading ? 'Processing...' : 'Pay ৳1000'}
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    height: '100vh',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: '#f0f2f5',
  },

  card: {
    padding: '30px',
    borderRadius: '12px',
    background: '#fff',
    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    width: '320px',
  },
  title: {
    fontSize: '1.8rem',
    marginBottom: '10px',
    color: '#333',
  },
  subtitle: {
    fontSize: '1rem',
    marginBottom: '20px',
    color: '#666',
  },
  button: {
    padding: '12px 24px',
    fontSize: '1rem',
    backgroundColor: '#e2136e',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: '0.3s',
  },
};

export default Home;
