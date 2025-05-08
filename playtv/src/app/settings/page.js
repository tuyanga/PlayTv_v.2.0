// pages/AccountSettings.js
'use client';

import { useEffect, useState } from 'react';
import PasswordChange from "./component/PasswordChange";
import PhoneChange from "./component/PhoneChange";
import './styles/settings.css';

export default function AccountSettings() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const email = localStorage.getItem('userEmail');
    if (email) {
      fetch(`/api/me/?email=${email}`)
        .then(res => res.json())
        .then(data => setUser(data));
    }
  }, []);

  return (
    <section className="account-settings">
      <h2>Аккаунтын тохиргоо</h2>
      <h3>Миний бүртгэл</h3>
      <div className="account-info">
        <div className="info-item">
          <span>{user?.username || 'Түр хадгалагдаагүй'}</span>
          <span>{user?.id || '000000'}</span>
        </div>

        <PasswordChange />
        <PhoneChange />
      </div>
    </section>
  );
}
