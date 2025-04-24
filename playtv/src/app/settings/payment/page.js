import '../styles/settings.css'
import PaymentPopup from "../component/PaymentPopup";
import PaymentHistory from "../component/PaymentHistory";
export default function PaymentPage() {
    return (
      <section className="account-settings">
        <h2>Төлбөрийн хэсэг</h2>
        <h3>Идэвхжүүлсэн багц</h3>
        <div className="account-info">
          <PaymentPopup />
          <div className="info-item">
            <span>Автомат сунгалт</span>
            <a href="#">
              <label className="switch">
                <input type="checkbox" />
                <span className="slider round"></span>
              </label>
            </a>
          </div>
        </div>
  
        <h3>Жагсаалт</h3>
        <div className="account-info">
        <PaymentHistory />
        </div>
      </section>
    );
  }