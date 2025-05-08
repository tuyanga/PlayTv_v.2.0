'use client'
import { useEffect, useState, useRef } from 'react';
import styles from "./styles/carousel.module.css"
import { useFavorites } from '../context/FavoritesContext';

export default function Carousel() {

    const [carouselData, setCarouselData] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const intervalRef = useRef(null);
    const intervalDuration = 5000;

    const { addToFavorites } = useFavorites();

    useEffect(() => {
        fetch('/api/movie')
            .then(res => res.json())
            .then (data => {
                setCarouselData(data.movies);
                startInterval();
            })
            .catch(err => console.error('Falied to fetch data.',err));

        return () => stopInterval();
    }, []);

    const startInterval = () => {
        stopInterval();
        intervalRef.current = setInterval(() => {
            setCurrentIndex((prev => (prev + 1) % carouselData.length));
        }, intervalDuration);
    };

    const stopInterval = () => {
        if (intervalRef.current){
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    };

    const goToSlide = (index) => {
        setCurrentIndex(index);
        resetInterval();
    };

    const resetInterval = () => {
        stopInterval();
        startInterval();
    };

    const handleAddToFavorites = (e) => {
        if (!carouselData.length || !carouselData[currentIndex]) return;

        const current = carouselData[currentIndex];
        e.stopPropagation();
        addToFavorites({
            title: current.title,
            category: current.category || '',
            duration: current.duration || '',
            poster: current.image
        });
        alert(`${current.title} нь дуртай жагсаалтад нэмэгдлээ!`);
  };
    
    if (!carouselData || carouselData.length === 0 || !carouselData[currentIndex]) {
        return <p>Loading...</p>;
    }

    const current = carouselData[currentIndex]; 
    


    return (
        <div className={styles.carouselTrack} style = {{backgroundImage: `url(${current.image})`}}>
            <div className={styles.carouselOverlay}></div>
            <div className={`${styles.carouselContentContainer} ${styles.container}`}>
                <div className={styles.carouselContent}>
                    <h1 className={styles.movieTitle}>{current.title}</h1>
                    <div className={styles.movieDescription}>
                        <p>{current.description}</p>
                    </div>
                    <div className={styles.buttonContainer}>
                    <button className={styles.btnPlay}><i className="fas fa-play"></i> ТОГЛУУЛАХ</button>
                    <button className ={styles.btnAdd} onClick={handleAddToFavorites}><i className="fas fa-plus"></i></button>
                </div>
              </div>
          </div>
        <div className={styles.carouselDots}>
            {carouselData.map((_, index) => (
                <span
                    key={index}
                    className={`${styles.dot} ${index === currentIndex ? styles.active : ''}`}
                    onClick={() => goToSlide(index)}
                ></span>
            ))}
        </div>
    </div>
    )

}