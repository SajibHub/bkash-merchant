import React from 'react';
import { useSearchParams } from 'react-router-dom';

const Error = () => {
  const [searchParams] = useSearchParams();
  const message = searchParams.get('message');

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Payment Failed</h1>
      <p style={styles.message}>{message}</p>
      <button style={styles.button} onClick={() => window.location.href = '/'}>
        Go Back to Home
      </button>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f8d7da',
    color: '#721c24',
    textAlign: 'center',
    padding: '20px',
  },
  header: {
    fontSize: '2rem',
    marginBottom: '10px',
  },
  message: {
    fontSize: '1.2rem',
    marginBottom: '20px',
  },
  button: {
    padding: '10px 20px',
    fontSize: '1rem',
    color: '#fff',
    backgroundColor: '#f44336',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default Error;
