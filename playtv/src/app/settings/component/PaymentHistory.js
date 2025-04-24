'use client';
import { useState } from 'react';
import { FaXmark } from 'react-icons/fa6';

export default function PaymentHistory() {
  const [showHistory, setShowHistory] = useState(false);
  const [payments, setPayments] = useState([
    { id: 1, date: '2023-05-15', package: 'Premium', amount: '9900₮', status: 'Амжилттай' },
    { id: 2, date: '2023-04-10', package: 'Standard', amount: '4900₮', status: 'Амжилттай' }
  ]);

  return (
    <>
      <div className="info-item">
        <span>Төлбөрийн жагсаалт</span>
        <a onClick={() => setShowHistory(true)}>харах</a>
      </div>

      {showHistory && (
        <div className="popup" onClick={() => setShowHistory(false)}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
 
            <FaXmark id="close-popup" onClick={() => setShowHistory(false)} />
            
            <h2>Төлбөрийн түүх</h2>
            <div className="payment-history">
              <table>
                <thead>
                  <tr>
                    <th>Огноо</th>
                    <th>Багц</th>
                    <th>Дүн</th>
                    <th>Төлөв</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map(payment => (
                    <tr key={payment.id}>
                      <td>{payment.date}</td>
                      <td>{payment.package}</td>
                      <td>{payment.amount}</td>
                      <td>{payment.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </>
  );
}