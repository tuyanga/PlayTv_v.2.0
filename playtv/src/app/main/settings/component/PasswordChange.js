'use client';

import { useState } from 'react';
import { FaXmark } from 'react-icons/fa6';

export default function PasswordChange() {
  const [showPopup, setShowPopup] = useState(false);
  const [error, setError] = useState('');
  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [repeatPass, setRepeatPass] = useState('');

  const handleSave = async () => {


    if (newPass !== repeatPass) {
      setError('Шинэ нууц үг таарахгүй байна.');
      return;
    }

    try {
      const phoneNumber = localStorage.getItem('phoneNumber'); // Get the user's phone number from localStorage
      const res = await fetch('/api/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phoneNumber, currentPass, newPass }),
      });

      const data = await res.json();

      if (res.ok) {
        alert('Нууц үг амжилттай солигдлоо.');
        setShowPopup(false);
        setCurrentPass('');
        setNewPass('');
        setRepeatPass('')
      } else {
        setError(data.message || 'Нууц үг солих явцад алдаа гарлаа.');
      }
    } catch (error) {
      console.error('Error changing password:', error);
      setError('Сүлжээний алдаа гарлаа.');
    }
  };

  return (
    <>
      <div className="info-item">
        <span>Нууц үг</span>
        <a onClick={() => setShowPopup(true)}>Нууц үг өөрчлөх</a>
      </div>

      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <FaXmark id="close-popup" onClick={() => setShowPopup(false)} />
            <h3>Нууц үг өөрчлөх</h3>
            <input
              type="password"
              id="current"
              placeholder="Одоогийн нууц үг"
              value={currentPass}
              onChange={(e) => setCurrentPass(e.target.value)}
            />
            <input
              type="password"
              id="new"
              placeholder="Шинэ нууц үг"
              value={newPass}
              onChange={(e) => setNewPass(e.target.value)}
            />
            <input
              type="password"
              id="repeat"
              placeholder="Шинэ нууц үгээ давтах"
              value={repeatPass}
              onChange={(e) => setRepeatPass(e.target.value)}
            />
            {error && <div className="error">{error}</div>}
            <button id="saveBtn" onClick={handleSave}>
              Хадгалах
            </button>
          </div>
        </div>
      )}
    </>
  );
}