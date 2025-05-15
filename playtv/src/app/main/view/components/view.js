'use client';
import styles from './view.module.css';
import Star from './starRating';

export default function View(movie) {
    return(
        <div className={styles.container}>
            <div className={styles.viewBackground} style={{ backgroundImage: `url(${movie.poster})`}}></div>
            <div className={styles.viewCard} style={{ backgroundImage: `url(${movie.poster})`}}></div>
            <div className={styles.viewContent}>
                <div className={styles.viewTitle}>{movie.title}</div>
                <div className={styles.viewInfo}>
                    <h2 className={styles.viewDate}>{movie.date}</h2>
                    <Star rating={movie.rating} classname={styles.viewRating}/>
                </div>
                <div className={styles.viewCategory}>{movie.category}</div>
                <div className={styles.viewDescription}>{movie.description}</div>
                <div className={styles.viewButtonContainer}>
                    <button className={styles.btnPlay}><i className="fas fa-play"></i> ТОГЛУУЛАХ</button>
                    <button className={styles.viewbtnAdd}><i className="fas fa-plus"></i>ЖАГСААЛТ</button>    
                </div>
            </div>
        </div>
    );
}