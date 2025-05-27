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
                    <div className={styles.logo}><a href="#" onClick={() => handleNavigation('/main')}>PlayTV</a></div>
                            <ul className={styles.navList}>
                                <li className={styles.navItem}><Link href = "/main">Нүүр</Link></li>
                                <li className={styles.navItem}><Link href = "/main/box">BOX</Link></li>
                                <button onClick={() => handleNavigation('/main/favorite')}><li className={styles.navItem}><Link href = "#">Миний жагсаалт</Link></li></button>
                            </ul>
                    </div>
                <div className={styles.headerRightContainer}>
                    <div className={styles.userActions}>
                        <button onClick={() => handleNavigation('/main/search')}><i className="fas fa-search"></i></button>
            
                        <button onClick={() => handleNavigation('/main/settings')}><i className="fas fa-user"></i></button>
                    </div>
                </div>
            </div>
          </div>
    </header>
    )

}