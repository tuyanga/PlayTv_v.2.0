'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { FaXmark } from 'react-icons/fa6';

export default function PaymentPopup() {
  const [showPopup, setShowPopup] = useState(false);
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    // Fetch packages from the API
    const fetchPackages = async () => {
      const res = await fetch('/api/packages');
      const data = await res.json();
      setPackages(data);
    };

    fetchPackages();
  }, []);

  const handleActivate = async (pkg) => {
    try {
      const phoneNumber = localStorage.getItem('phoneNumber'); // Get the user's phone number
      const res = await fetch('/api/subscription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phoneNumber,
          packageId: pkg.id,
          packageName: pkg.name,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert('Багц амжилттай идэвхжлээ.');
        setShowPopup(false); // Close the popup
      } else {
        alert(data.message || 'Багц идэвхжүүлэхэд алдаа гарлаа.');
      }
    } catch (error) {
      console.error('Error activating package:', error);
      alert('Сүлжээний алдаа гарлаа.');
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
            <FaXmark id="close-popup" onClick={() => setShowPopup(false)} />

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
          </div>
        </div>
      )}
    </>
  );
}