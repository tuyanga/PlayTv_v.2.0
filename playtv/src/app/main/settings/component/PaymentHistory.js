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
            <FaXmark className="close-btn" onClick={() => setShowHistory(false)} />
            
            <h2>Төлбөрийн түүх</h2>
            
            {!Array.isArray(payments) || payments.length === 0 ? (
              <p className="no-payments">Төлбөрийн түүх хоосон байна</p>
            ) : (
              <div className="payment-history">
                <table>
                  <thead>
                    <tr>
                      <th>Эхлэх огноо</th>
                      <th>Дуусах огноо</th>
                      <th>Багц</th>
                      <th>Дүн</th>
                      <th>Төлөв</th>
                    </tr>
                  </thead>
                  <tbody>
                    {payments.map((payment, index) => (
                      <tr key={index}>
                        <td>{new Date(payment.startDate).toLocaleDateString()}</td>
                        <td>{new Date(payment.endDate).toLocaleDateString()}</td>
                        <td>{payment.packageName}</td>
                        <td>{payment.amount || '9900₮'}</td>
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