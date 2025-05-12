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
        <p style={styles.subtitle}>
          Thank you for your payment. Your transaction was completed successfully.
        </p>
        <div style={styles.info}>
          <p><strong>Payment ID:</strong> {paymentId || 'N/A'}</p>
          <p><strong>Transaction ID:</strong> {trxId || 'N/A'}</p>
          <p><strong>Amount:</strong> {amount || 'N/A'}</p>
        </div>
        <div style={styles.btnCenter}>
          <button
            style={styles.button}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#218838'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#28a745'}
            onClick={() => window.location.href = '/'}
          >
            Back to Home
          </button>
        </div>
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
    background: 'linear-gradient(135deg, #1e1e1e, #121212)', // Gradient background
    padding: '20px',
  },
  card: {
    background: '#222', // Slightly lighter gray for contrast
    padding: '40px',
    borderRadius: '16px',
    textAlign: 'center', // Center-align text for better readability
    boxShadow: '0 15px 30px rgba(0, 0, 0, 0.6)',
    width: '100%',
    maxWidth: '500px',
    color: '#fff',
  },
  title: {
    fontSize: '2rem',
    color: '#28a745',
    marginBottom: '15px',
  },
  subtitle: {
    fontSize: '1rem',
    color: '#ccc', // Softer white for subtitle
    marginBottom: '25px',
    lineHeight: '1.5',
  },
  info: {
    textAlign: 'left',
    marginBottom: '20px',
    fontSize: '0.95rem',
    lineHeight: '1.6',
  },
  btnCenter: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    padding: '12px 25px',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: 'bold',
    transition: 'background-color 0.3s ease, transform 0.2s ease',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
  },
};

export default Success;
