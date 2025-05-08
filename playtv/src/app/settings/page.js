// pages/AccountSettings.js
'use client';

import { useEffect, useState } from 'react';
import PasswordChange from "./component/PasswordChange";
import PhoneChange from "./component/PhoneChange";
import './styles/settings.css';

export default function AccountSettings() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const phoneNumber = localStorage.getItem('phoneNumber'); // Use phoneNumber instead of email
    if (phoneNumber) {
      fetch(`/api/me/?phoneNumber=${phoneNumber}`) // Fetch user by phoneNumber
        .then(res => res.json())
        .then(data => {
          console.log('Fetched user data:', data);
          setUser(data);
        })
    }
  }, []);

  return (
    <section className="account-settings">
      <h2>Аккаунтын тохиргоо</h2>
      <h3>Миний бүртгэл</h3>
      <div className="account-info">
        <div className="info-item">
        <span>Хэрэглэгчийн нэр</span>
          <span>{user?.name || 'Түр хадгалагдаагүй'}</span>
        </div>

        <PasswordChange />
        <PhoneChange />
      </div>
    </section>
  );
}
