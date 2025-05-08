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
              href="/settings"
              className={activeLink === '/settings' ? 'active' : ''}
            >
              Аккаунтын тохиргоо
            </Link>
          </li>
          <li>
            <Link
              href="/settings/payment"
              className={activeLink === '/settings/payment' ? 'active' : ''}
            >
              Төлбөрийн хэсэг
            </Link>
          </li>
          <li>
            <Link
              href="/settings/faq"
              className={activeLink === '/settings/faq' ? 'active' : ''}
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