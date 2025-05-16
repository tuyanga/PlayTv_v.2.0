'use client'
import { useEffect, useState, useRef } from 'react';
import styles from "./styles/styles.module.css"  
import Card from "./card_prox.js"  

export default function Slider({ title, genreId }) {
    const cardRef = useRef(null);
    const [sliderData, setSliderData] = useState([]);
    const [cardWidth, setCardWidth] = useState(240);
    const [visibleCards, setVisibleCards] = useState(6);
    const [position, setPosition] = useState(0);
    const scrollStep = 3;

    useEffect(() => {

        if (!genreId) return;

        fetch(`/api/movies-by-genres?genreId=${genreId}`)
            .then(res => res.json())
            .then(setSliderData)
            .catch(err => console.error('Falied to fetch movies.',err));

        const handleResize = () => {
            if (cardRef.current) {
                const styles = window.getComputedStyle(cardRef.current);
                const width = parseInt(styles.width, 10);
                setCardWidth(width);
                setVisibleCards(width < 220 ? 3: 6);
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize(); 

        return () => window.removeEventListener('resize', handleResize);
        
    }, [genreId]);

    const maxPosition = sliderData.length - visibleCards;

    const handleNext = () => {
        setPosition((prev) => Math.min(prev + scrollStep, maxPosition));
    };

    const handlePrev = () => {
        setPosition((prev) => Math.max(prev - scrollStep, 0));
    };


    if (sliderData.length === 0) return <p>Loading...</p>

    return (
    <div className = {`${styles.container} ${styles.slideContainer}`}>
        <div className= {styles.slideTitle}>{title}</div>
        <div className = {styles.sliderRowWrapper}>
            <button className = {`${styles.sliderArrow} ${styles.prevArrow}`} onClick={handlePrev}><i className="fas fa-caret-left"></i></button>
                <div className = {styles.movieListContainer} style={{transform: `translateX(-${position * cardWidth}px)`}}>
                    {sliderData.map((movie, index) => (
                        <div key={movie.id} ref={index === 0 ? cardRef : null}>
                            <Card movie={movie} route={`/main/view/${movie.id}`}/>
                        </div>
                    ))}
                </div>
            <button className={`${styles.sliderArrow} ${styles.nextArrow}`} onClick={handleNext}><i className="fas fa-caret-right"></i></button>
        </div>
    </div>
    );
}

;