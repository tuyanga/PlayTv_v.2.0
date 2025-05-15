'use client';
import { useState, useEffect } from 'react';
import '../styles/settings.css';
import PaymentPopup from "../component/PaymentPopup";
import PaymentHistory from "../component/PaymentHistory";

export default function PaymentPage() {
  const [payments, setPayments] = useState([]);
  const [packages, setPackages] = useState([]);

  // Багцын мэдээлэл авах
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const res = await fetch('/api/packages');
        const data = await res.json();
        setPackages(data);
      } catch (error) {
        console.error('Багц авахад алдаа:', error);
      }
    };
    fetchPackages();
  }, []);

  // Төлбөрийн түүх авах
  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const phoneNumber = localStorage.getItem('phoneNumber');
        if (!phoneNumber) return;

        const res = await fetch(`/api/payment-history?phoneNumber=${phoneNumber}`);
        const data = await res.json();

        if (res.ok && data.success) {
          setPayments(data.subscriptions); // Зөвхөн subscriptions массивыг дамжуулна
        } else {
          console.error('Төлбөрийн түүх авахад алдаа:', data.message);
        }
      } catch (error) {
        console.error('Төлбөрийн түүх авахад алдаа:', error);
      }
    };
    fetchPayments();
  }, []);

  return (
    <section className="account-settings">
      <h2>Төлбөрийн хэсэг</h2>
      <h3>Идэвхжүүлсэн багц</h3>
      <div className="account-info">
        <PaymentPopup packages={packages} />
        <div className="info-item">
          <span>Автомат сунгалт</span>
          <label className="switch">
            <input type="checkbox" />
            <span className="slider round"></span>
          </label>
        </div>
      </div>

      <h3>Жагсаалт</h3>
      <div className="account-info">
        <PaymentHistory payments={payments} />
      </div>
    </section>
  );
}