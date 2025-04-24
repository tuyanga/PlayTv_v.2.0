'use client';

import { useState } from 'react';
import Image from 'next/image';
import { FaXmark } from 'react-icons/fa6';

export default function PaymentPopup() {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <>
      <div className="info-item">
        <span>Идэвхтэй багц байхгүй</span>
        <a onClick={() => setShowPopup(true)}>Өөрчлөх</a>
      </div>
      {showPopup && (
        <div className="popup" onClick={() => setShowPopup(false)}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <section className="bagts">
              <div className="container">
            <FaXmark id="close-popup" onClick={() => setShowPopup(false)} />

                <article className="package">
                  <Image 
                    src="/img/image-7.jpg" 
                    alt="Багцын зураг" 
                    className="image"
                    width={300}
                    height={200}
                  />
                  <p className="price">9900₮ / 1 сар</p>
                  <button className="activate-btn">Идэвхжүүлэх</button>
                </article>

                <article className="package">
                  <Image 
                    src="/img/image-8.jpg" 
                    alt="Багцын зураг" 
                    className="image"
                    width={300}
                    height={200}
                  />
                  <p className="price">4900₮ / 1 сар</p>
                  <button className="activate-btn">Идэвхжүүлэх</button>
                </article>
              </div>
            </section>
          </div>
        </div>
      )}
    </>
  );
}