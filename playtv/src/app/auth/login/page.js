'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FaXmark } from 'react-icons/fa6';
import styles from './login.module.css';

export default function LoginPage() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phoneNumber, password }),
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem('user', JSON.stringify(data.user));
      // Store the phone number separately
      localStorage.setItem('phoneNumber', data.user.phoneNumber);
      if (data.user.phoneNumber === '99000000') {
        router.push('/main/admin'); // Админ хэсэг рүү шилжүүлэх
      } else {
        router.push('/main'); // Энгийн хэрэглэгчийн хэсэг рүү шилжүүлэх
      }
    } else {
      setMessage(data.message || 'Login failed');
    }
  };

  return (
    <div className={styles.container} style={{ position: 'relative' }}>
      <FaXmark className={styles.closepopup} style={{ position: 'absolute', top: 10, right: 10 }} onClick={() => router.push('/')} />
      <h2 className={styles.title}>Нэвтрэх</h2>
      <form onSubmit={handleLogin} className={styles.form}>
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
        <button type="submit" className={styles.button}>
          Нэвтрэх
        </button>
        <p className={styles.loginlink}>
          Бүртгэл байхгүй юу? <Link href="/auth/signup">Бүртгүүлэх</Link>
        </p>
      </form>
      {message && <p className={styles.message}>{message}</p>}
    </div>
  );
}
