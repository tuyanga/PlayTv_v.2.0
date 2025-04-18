'use client';

import { useState } from 'react';
import { FaXmark } from 'react-icons/fa6';

export default function PasswordChange() {
  const [showPopup, setShowPopup] = useState(false);
  const [error, setError] = useState('');
  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [repeatPass, setRepeatPass] = useState('');

  const handleSave = () => {
    const valid = /^(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;

    if (!valid.test(newPass)) {
      setError('Нууц үг нь дор хаяж 8 тэмдэгт, 1 том үсэг, 1 тусгай тэмдэгттэй байх ёстой.');
      return;
    }

    if (newPass !== repeatPass) {
      setError('Шинэ нууц үг таарахгүй байна.');
      return;
    }

    setError('');
    alert('Нууц үг амжилттай солигдлоо.');
    setShowPopup(false);
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