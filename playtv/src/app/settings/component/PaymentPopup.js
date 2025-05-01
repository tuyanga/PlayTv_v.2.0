'use client';
import { useState } from 'react';
import Image from 'next/image';
import { FaXmark } from 'react-icons/fa6';

export default function PaymentPopup({ packages, onPaymentSuccess }) {
  const [showPopup, setShowPopup] = useState(false);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [smsCode, setSmsCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleActivate = (pkg) => {
    setSelectedPackage(pkg);
    setShowPaymentForm(true);
    setError('');
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // 1. SMS код илгээх
      const smsResponse = await fetch('/api/payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'send',
          package: selectedPackage.name,
          amount: selectedPackage.price,
          phone: phoneNumber
        })
      });

      const smsData = await smsResponse.json();
      
      if (!smsData.success) {
        throw new Error(smsData.error || 'SMS код илгээхэд алдаа гарлаа');
      }

      // 2. SMS код баталгаажуулах
      const verifyResponse = await fetch('/api/payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'verify',
          phone: phoneNumber,
          code: smsCode
        })
      });

      const verifyData = await verifyResponse.json();
      
      if (verifyData.success) {
        onPaymentSuccess(verifyData.payment);
        setShowPopup(false);
        alert('Төлбөр амжилттай!');
      } else {
        throw new Error(verifyData.error || 'Баталгаажуулалт амжилтгүй');
      }
    } catch (err) {
      setError(err.message);
      console.error('Төлбөрийн алдаа:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="info-item">
        <span>Идэвхтэй багц байхгүй</span>
        <button onClick={() => setShowPopup(true)} className="link-button">
          Өөрчлөх
        </button>
      </div>

      {showPopup && (
        <div className="popup" onClick={() => setShowPopup(false)}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setShowPopup(false)}>
              <FaXmark size={24} />
            </button>

            {!showPaymentForm ? (
              <>
                <h2>Багц сонгох</h2>
                <div className="packages-container">
                  {packages.map((pkg) => (
                    <article key={pkg.id} className="package">
                      <div className="image-wrapper">
                        <Image 
                          src={pkg.image} 
                          alt={`${pkg.name} багцын зураг`}
                          width={300}
                          height={200}
                          className="package-image"
                        />
                      </div>
                      <p className="price">{pkg.price}</p>
                      <ul className="features">
                        {pkg.features.map((feature, i) => (
                          <li key={i}>{feature}</li>
                        ))}
                      </ul>
                      <button 
                        className="activate-btn"
                        onClick={() => handleActivate(pkg)}
                      >
                        Идэвхжүүлэх
                      </button>
                    </article>
                  ))}
                </div>
              </>
            ) : (
              <form onSubmit={handlePaymentSubmit} className="payment-form">
                <h2>{selectedPackage.name} багц</h2>
                <p className="price">{selectedPackage.price}</p>
                
                <div className="form-group">
                  <label>Утасны дугаар</label>
                  <input
                    type="text"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="99001234"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>SMS баталгаажуулалтын код</label>
                  <input
                    type="text"
                    value={smsCode}
                    onChange={(e) => setSmsCode(e.target.value)}
                    placeholder="6 оронтой код"
                    required
                  />
                </div>

                {error && <div className="error-message">{error}</div>}
                
                <button 
                  type="submit" 
                  className="submit-btn"
                  disabled={isLoading}
                >
                  {isLoading ? 'Төлбөр төлөх...' : 'Төлбөр төлөх'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}