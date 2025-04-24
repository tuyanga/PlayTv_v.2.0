'use client'
import styles from "./styles/styles.module.css" 

export default function Card({title, category, duration, poster}) {
    return (
    <div className = {styles.movieCard} style={{backgroundImage: `url(${poster})`}}>
        <div className = {styles.cardContentContainer}>
            <button className={styles.btnAddCard}><i className="fas fa-plus"></i></button>
                <div className={styles.cardContent}>
                    <h4 className={styles.cardTitle}>{title}</h4>
                    <span className={styles.cardDescription}>
                            <h6>{category}</h6>
                            <h6>{duration + " мин"}</h6>
                    </span>
                </div>
        </div>
    </div>
    )
}
;