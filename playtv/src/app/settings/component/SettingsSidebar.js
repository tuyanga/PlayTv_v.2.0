'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function SettingsSidebar() {
  const pathname = usePathname();
  const [activeLink, setActiveLink] = useState(pathname);

  useEffect(() => {
    setActiveLink(pathname);
  }, [pathname]);

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
            <Link href="/" id="logout">
              Гарах
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}