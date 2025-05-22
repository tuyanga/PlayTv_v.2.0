'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './signup.module.css'; // Import the CSS module

export default function SignUpPage() {
  const [name, setName] = useState(''); // Added state for name
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }

    const res = await fetch('/api/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, phoneNumber, password }), // Include name in the request body
    });

    const data = await res.json();

    if (res.ok) {
      setMessage('Sign-up successful! Redirecting to login...');
      setTimeout(() => router.push('/auth/login'), 2000); // Redirect to login page after 2 seconds
    } else {
      setMessage(data.message || 'Sign-up failed');
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Sign Up</h2>
      <form onSubmit={handleSignUp} className={styles.form}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          required
          onChange={(e) => setName(e.target.value)} // Update name state
          className={styles.input}
        />
        <input
          type="text"
          placeholder="Phone Number"
          value={phoneNumber}
          required
          onChange={(e) => setPhoneNumber(e.target.value)}
          className={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
          className={styles.input}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          required
          onChange={(e) => setConfirmPassword(e.target.value)}
          className={styles.input}
        />
        <button type="submit" className={styles.button}>
          Sign Up
        </button>
        <p>
          Already have an account? <Link href="/auth/login">Login</Link>
        </p>
      </form>
      {message && <p className={styles.message}>{message}</p>}
    </div>
  );
}