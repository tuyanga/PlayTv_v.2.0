'use client';
import styles from './view.module.css';
import Star from './starRating';
import { useFavorites } from '../../context/FavoritesContext';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function View(movie) {
    const [userPackage, setUserPackage] = useState(null);
    const router = useRouter();
    
    const { addToFavorites } = useFavorites();

    // Хэрэглэгчийн идэвхтэй багц мэдээлэл авах
    useEffect(() => {
        const fetchUserPackage = async () => {
            const phoneNumber = localStorage.getItem('phoneNumber');
            if (!phoneNumber) return;

            try {
                const res = await fetch(`/api/payment-history?phoneNumber=${phoneNumber}`);
                const data = await res.json();
                if (res.ok && data.success && data.subscriptions.length > 0) {
                    const activeSub = data.subscriptions.find(sub => sub.status === 'active');
                    if (activeSub) {
                        const pkgRes = await fetch('/api/packages');
                        const pkgData = await pkgRes.json();
                        const matched = pkgData.find(p => p.id === activeSub.packageId);
                        setUserPackage(matched);
                    }
                }
            } catch (err) {
                console.error("Багц шалгахад алдаа гарлаа:", err);
            }
        };

        fetchUserPackage();
    }, []);

    // Хадгалах
    const handleAddToFavorites = (e) => {
        e.stopPropagation();
        addToFavorites(movie);
        alert(`${movie.title || movie.name} нь дуртай жагсаалтад нэмэгдлээ!`);
    };
    
    const watchURL = movie.video_path && movie.video_path.trim() !== ''
        ? movie.video_path
        : `https://vidsrc.xyz/embed/movie/${movie.id}`;
    // Тоглуулах
    const handlePlay = () => {
        if (!userPackage) {
            alert("Та эхлээд багц идэвхжүүлнэ үү.");
            router.push('/main/settings/payment');
            return;
        }

        // Хэрэв бүх төрлийн кино үзэх эрхтэй бол
        if (userPackage.accessGenres === 'all') {
            window.open(watchURL);
            return;
        }

        // Киноны жанрууд багцад зөвшөөрөгдсөн эсэхийг шалгах
        const allowedGenres = userPackage.accessGenres; // массив
        const movieGenres = movie.genres?.map(g => g.id) || [];

        const hasAccess = movieGenres.some(genreId => allowedGenres.includes(genreId));

        if (hasAccess) {
            window.open(watchURL);
        } else {
            alert("Таны багц энэ төрлийн киног дэмжихгүй байна. Шинэчлэх үү?");
            router.push('/main/settings/payment');
        }
    };

    return(
        <div className={styles.container}>
            <div className={styles.viewBackground} style={{ backgroundImage: movie.poster_path
                        ?`url(https://image.tmdb.org/t/p/w1280${movie.backdrop_path})`: movie.image
                            ? `url(${movie.image})`
                            : 'none' }}></div>
            <div
                className={styles.viewCard}
                style={{
                    backgroundImage: movie.poster_path
                        ? `url(https://image.tmdb.org/t/p/w500${movie.poster_path})`
                        : movie.image
                            ? `url(${movie.image})`
                            : 'none'
                }}
            ></div>
            <div className={styles.viewContent}>
                <div className={styles.viewTitle}>{movie.title}</div>
                <div className={styles.viewInfo}>
                    <h2 className={styles.viewDate}>{movie.release_date||movie.year}</h2>
                    <Star rating={movie.vote_average || movie.rating} classname={styles.viewRating}/>
                </div>
                <div className={styles.viewCategoryContainer}>
                    {movie.genres && movie.genres.length > 0 ? (
                        movie.genres.map((genre) => (
                            <span key={genre.id} className={styles.viewCategory}>
                                {genre.name}
                            </span>
                        ))
                    ) : (
                        movie.category && <span className={styles.viewCategory}>{movie.category}</span>
                    )}
                </div>
                <div className={styles.viewDescription}>{movie.overview||movie.description}</div>
                <div className={styles.viewButtonContainer}>
                    <button className={styles.btnPlay} onClick={handlePlay}><i className="fas fa-play"></i> ТОГЛУУЛАХ</button>
                    <button className={styles.viewbtnAdd} onClick={handleAddToFavorites}><i className="fas fa-plus"></i>ЖАГСААЛТ</button>    
                </div>
            </div>
        </div>
    );
}
