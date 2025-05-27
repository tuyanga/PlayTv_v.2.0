'use client';

import { useState, useEffect } from 'react';
import { useRouter , useSearchParams} from 'next/navigation';

import Link from 'next/link';
import { FaXmark } from 'react-icons/fa6';
import styles from './signup.module.css'; // Import the CSS module

export default function SignUpPage() {
  const searchParams = useSearchParams();
  const [name, setName] = useState(''); // Added state for name
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  useEffect(() => {
    const phoneFromQuery = searchParams.get('phone');
    if (phoneFromQuery) {
      setPhoneNumber(phoneFromQuery);
    }
  }, [searchParams]);

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
    <div className={styles.container} style={{ position: 'relative' }}>
      <FaXmark className={styles.closepopup} style={{ position: 'absolute', top: 10, right: 10 }} onClick={() => router.push('/')}/>
      <h2 className={styles.title}>Бүртгүүлэх</h2>
      <form onSubmit={handleSignUp} className={styles.form}>
        <input
          type="text"
          placeholder="Нэр"
          value={name}
          required
          onChange={(e) => setName(e.target.value)}
          className={styles.input}
        />
        <input
          type="text"
          placeholder="Утасны дугаар"
          value={phoneNumber}
          required
          onChange={(e) => setPhoneNumber(e.target.value)}
          className={styles.input}
        />
        <input
          type="password"
          placeholder="Нууц үг"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
          className={styles.input}
        />
        <input
          type="password"
          placeholder="Нууц үг давтах"
          value={confirmPassword}
          required
          onChange={(e) => setConfirmPassword(e.target.value)}
          className={styles.input}
        />
        <button type="submit" className={styles.button}>
          Бүртгүүлэх
        </button>
        <p className={styles.signuplink}>
          Аль хэдийн бүртгэлтэй юу? <Link href="/auth/login">Нэвтрэх</Link>
        </p>
      </form>
      {message && <p className={styles.message}>{message}</p>}
    </div>
  );
}