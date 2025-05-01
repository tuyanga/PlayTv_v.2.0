import SettingsSidebar from "./component/SettingsSidebar";
import './styles/settings.css'
export default function SettingsLayout({ children }) {
    return (
      <div className="settings-ACC">
        <main className="main-content">
          <SettingsSidebar />
          {children}
        </main>
      </div>
    );
  }