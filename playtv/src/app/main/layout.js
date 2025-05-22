'use client'

import Header from "./components/header";
import { FavoritesProvider } from './context/FavoritesContext';

export default function MainLayout({ children }) {
  return (
    <FavoritesProvider>
      <div>
        <Header />
        <main>
          {children}
        </main>
      </div>
    </FavoritesProvider>
  );
}