'use client'
import styles from "./styles/styles.module.css" 
import { useRouter } from "next/navigation"

export default function Card({movie}) {

    const router = useRouter();
    const handleClick = () => {
        router.push(`/view/${movie.id}`);
    }

    return (
        <div 
        className = {styles.movieCard} 
        style={{backgroundImage: `url(${movie.poster})`}} 
        onClick={handleClick}>
        
        <div className = {styles.cardContentContainer}>
            <button className={styles.btnAddCard}><i className="fas fa-plus"></i></button>
                <div className={styles.cardContent}>
                        <h4 className={styles.cardTitle}>{movie.title}</h4>
                    <span className={styles.cardDescription}>
                                <h6>{movie.category}</h6>
                                <h6>{movie.duration + " мин"}</h6>
                    </span>
                </div>
            </div>
        </div>
    )
}
