'use client';

import { useState } from 'react';
import { FaXmark } from 'react-icons/fa6';

export default function PhoneChange() {
  const [showPopup, setShowPopup] = useState(false);
  const [error, setError] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [repeatPhone, setRepeatPhone] = useState('');

  const handleSave = () => {
    const mongolianPhoneRegex = /^(8|9|7)[0-9]{7}$/;

    if (!mongolianPhoneRegex.test(newPhone)) {
      setError('Утасны дугаар буруу байна. Монголын 8 оронтой дугаар оруулна уу.');
      return;
    }

    if (newPhone !== repeatPhone) {
      setError('Утасны дугаарууд таарахгүй байна.');
      return;
    }

    setError('');
    alert('Утасны дугаар амжилттай солигдлоо.');
    setShowPopup(false);
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