export default function PaymentPage() {
    return (
      <section className="account-settings">
        <h2>Төлбөрийн хэсэг</h2>
        <h3>Идэвхжүүлсэн багц</h3>
        <div className="account-info">
          <div className="info-item">
            <span>Идэвхтэй багц байхгүй</span>
            <a href="#">Өөрчлөх</a>
          </div>
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
          <div className="info-item">
            <span>Төлбөрийн жагсаалт</span>
            <a href="#">харах</a>
          </div>
        </div>
      </section>
    );
  }