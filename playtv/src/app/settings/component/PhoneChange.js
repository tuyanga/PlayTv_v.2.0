'use client';

import { useState } from 'react';
import { FaXmark } from 'react-icons/fa6';

export default function PhoneChange() {
  const [showPopup, setShowPopup] = useState(false);
  const [error, setError] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [repeatPhone, setRepeatPhone] = useState('');

  const handleSave = async () => {
    const mongolianPhoneRegex = /^(8|9|7)[0-9]{7}$/;

    if (!mongolianPhoneRegex.test(newPhone)) {
      setError('Утасны дугаар буруу байна. Монголын 8 оронтой дугаар оруулна уу.');
      return;
    }

    if (newPhone !== repeatPhone) {
      setError('Утасны дугаарууд таарахгүй байна.');
      return;
    }

    try {
      const currentPhone = localStorage.getItem('phoneNumber'); // Get the current phone number from localStorage
      const res = await fetch('/api/change-phone', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPhone, newPhone }),
      });

      const data = await res.json();

      if (res.ok) {
        alert('Утасны дугаар амжилттай солигдлоо.');
        localStorage.setItem('phoneNumber', newPhone); // Update the phone number in localStorage
        setShowPopup(false);
        setNewPhone('');
        setRepeatPhone('');
        setError('');
      } else {
        setError(data.message || 'Утасны дугаар солих явцад алдаа гарлаа.');
      }
    } catch (error) {
      console.error('Error changing phone number:', error);
      setError('Сүлжээний алдаа гарлаа.');
    }
  };

  return (
    <>
      <div className="info-item">
        <span>Утасны дугаар</span>
        <a onClick={() => setShowPopup(true)}>Утасны дугаар өөрчлөх</a>
      </div>

      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <FaXmark id="close-popup" onClick={() => setShowPopup(false)} />
            <h3>Утасны дугаар өөрчлөх</h3>
            <input
              type="text"
              id="newPhone"
              placeholder="Шинэ утасны дугаар"
              value={newPhone}
              onChange={(e) => setNewPhone(e.target.value)}
            />
            <input
              type="text"
              id="repeatPhone"
              placeholder="Шинэ утасны дугаараа давтах"
              value={repeatPhone}
              onChange={(e) => setRepeatPhone(e.target.value)}
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