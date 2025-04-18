import SettingsSidebar from "./component/SettingsSidebar";
export default function SettingsLayout({ children }) {
    return (
      <div className="settings-ACC">
        <header className="main-header">
          <div className="header-left">
            <div className="logo">
              <a href="#">PlayTV</a>
            </div>
            <nav className="main-nav">
              <ul>
                <li><a href="#">Нүүр</a></li>
                <li><a href="#">TV</a></li>
                <li><a href="#">BOX</a></li>
                <li><a href="#">Миний жагсаалт</a></li>
              </ul>
            </nav>
          </div>
  
          <div className="header-right">
            <div className="user-actions">
              <div className="search-box" id="headerSearchBox">
                <i className="fas fa-search"></i>
                <input type="text" placeholder="Хайх..." id="headerSearchInput" />
              </div>
              <button className="notification-btn"><i className="fas fa-bell"></i></button>
              <button className="profile-btn"><i className="fas fa-user"></i></button>
            </div>
          </div>
        </header>
  
        <main className="main-content">
          <SettingsSidebar />
          {children}
        </main>
      </div>
    );
  }