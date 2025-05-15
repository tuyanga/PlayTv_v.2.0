'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function SettingsSidebar() {
  const pathname = usePathname();
  const router = useRouter(); // Use router for navigation
  const [activeLink, setActiveLink] = useState(pathname);

  useEffect(() => {
    setActiveLink(pathname);
  }, [pathname]);

  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem('user');
    localStorage.removeItem('phoneNumber');

    // Redirect to the home page
    router.push('/');
  };

  return (
    <aside className="sidebar">
      <nav>
        <ul>
          <li>
            <Link
              href="/main/settings"
              className={activeLink === '/main/settings' ? 'active' : ''}
            >
              Аккаунтын тохиргоо
            </Link>
          </li>
          <li>
            <Link
              href="/main/settings/payment"
              className={activeLink === '/main/settings/payment' ? 'active' : ''}
            >
              Төлбөрийн хэсэг
            </Link>
          </li>
          <li>
            <Link
              href="/main/settings/faq"
              className={activeLink === '/main/settings/faq' ? 'active' : ''}
            >
              Түгээмэл асуултууд
            </Link>
          </li>
          <li>
            <a onClick={handleLogout} id="logout" style={{ cursor: 'pointer' }}>
              Гарах
            </a>
          </li>
        </ul>
      </nav>
    </aside>
  );
}