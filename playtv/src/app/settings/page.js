import PasswordChange from './components/PasswordChange';
import PhoneChange from './components/PhoneChange';

export default function AccountSettings() {
  return (
    <section className="account-settings">
      <h2>Аккаунтын тохиргоо</h2>
      <h3>Миний бүртгэл</h3>
      <div className="account-info">
        <div className="info-item">
          <span>PlayTv</span>
          <span>000000</span>
        </div>

        <PasswordChange />
        <PhoneChange />
      </div>
    </section>
  );
}