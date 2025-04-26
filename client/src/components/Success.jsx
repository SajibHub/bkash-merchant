import React from 'react';
import { useSearchParams } from 'react-router-dom';

const Success = () => {
  const [searchParams] = useSearchParams();
  const paymentId = searchParams.get('paymentID');
  const trxId = searchParams.get('trxID');
  const amount = searchParams.get('amount');

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>✅ Payment Successful!</h1>
        <p style={styles.subtitle}>Thank you for your payment. Your transaction was completed successfully.</p>
        <p><strong>Payment ID:</strong> {paymentId || 'N/A'}</p>
        <p><strong>Transaction ID:</strong> {trxId || 'N/A'}</p>
        <p><strong>Amount:</strong> {amount || 'N/A'}</p>
        <button style={styles.button} onClick={() => window.location.href = '/'}>
          Back to Home
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
    background: '#000', // Black background
  },
  card: {
    background: '#333', // Dark gray card background
    padding: '30px',
    borderRadius: '12px',
    textAlign: 'center',
    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.5)',
    width: '320px',
    color: '#fff', // White text
  },
  title: {
    fontSize: '1.8rem',
    color: '#28a745',
    marginBottom: '10px',
  },
  subtitle: {
    fontSize: '1rem',
    color: '#fff', // White text
    marginBottom: '20px',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: '0.3s',
  },
};

export default Success;
