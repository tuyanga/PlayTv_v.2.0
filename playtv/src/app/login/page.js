// pages/login.js
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      // Save user data to localStorage
      localStorage.setItem('user', JSON.stringify(data.user));

      // Redirect to account settings
      router.push('/settings');
    } else {
      setMessage(data.message || 'Login failed');
    }
  };

  return (
    <div style={{ maxWidth: 300, margin: '100px auto', textAlign: 'center', color: '#333' }}>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: '100%', padding: 8, marginBottom: 10 }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: '100%', padding: 8, marginBottom: 10 }}
        />
        <button type="submit" style={{ width: '100%', padding: 8 }}>
          Login
        </button>
      </form>
      {message && <p style={{ color: 'red', marginTop: 10 }}>{message}</p>}
    </div>
  );
}
