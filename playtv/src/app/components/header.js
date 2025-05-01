'use client';
import styles from "./styles/header.module.css"
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Header() {

    const router = useRouter();
    const handleNavigation = (path) => {
        router.push(path);
    };

    return(
    <header>
          <div className={styles.myHeader}>
            <div className={`${styles.mainHeaderContainer} ${styles.container}`}>
                <div className={styles.headerLeftContainer}>
                    <div className={styles.logo}><a href="#" onClick={() => handleNavigation('/')}>PlayTV</a></div>
                            <ul className={styles.navList}>
                                <li className={styles.navItem}><Link href = "/">Нүүр</Link></li>
                                <li className={styles.navItem}><Link href = "#">BOX</Link></li>
                                <li className={styles.navItem}><Link href = "#">Миний жагсаалт</Link></li>
                            </ul>
                    </div>
                <div className={styles.headerRightContainer}>
                    <div className={styles.userActions}>
                        <button onClick={() => handleNavigation('/search')}><i className="fas fa-search"></i></button>
                        <button><i className="fas fa-bell"></i></button>
                        <button onClick={() => handleNavigation('/settings')}><i className="fas fa-user"></i></button>
                    </div>
                </div>
            </div>
          </div>
    </header>
    )

}