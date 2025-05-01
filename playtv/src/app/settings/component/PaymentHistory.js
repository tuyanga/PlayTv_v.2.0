'use client';
import { useState } from 'react';
import { FaXmark } from 'react-icons/fa6';


export default function PaymentHistory({ payments }) {
  const [showHistory, setShowHistory] = useState(false);

  return (
    <>
      <div className="info-item">
        <span>Төлбөрийн жагсаалт</span>
        <button 
          onClick={() => setShowHistory(true)} 
          className="link-button"
        >
          харах
        </button>
      </div>

      {showHistory && (
        <div className="popup" onClick={() => setShowHistory(false)}>
          <div className="popup-content large" onClick={(e) => e.stopPropagation()}>
            <FaXmark className="close-btn" onClick={() => setShowHistory(false)}/>
            
            <h2>Төлбөрийн түүх</h2>
            
            {payments.length === 0 ? (
              <p className="no-payments">Төлбөрийн түүх хоосон байна</p>
            ) : (
              <div className="payment-table-container">
                <table className="payment-table">
                  <thead>
                    <tr>
                      <th>Огноо</th>
                      <th>Багц</th>
                      <th>Дүн</th>
                      <th>Төлөв</th>
                    </tr>
                  </thead>
                  <tbody>
                    {payments.map((payment, index) => (
                      <tr key={index}>
                        <td>{payment.date}</td>
                        <td>{payment.package}</td>
                        <td>{payment.amount}</td>
                        <td className={`status ${payment.status.toLowerCase()}`}>
                          {payment.status}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}