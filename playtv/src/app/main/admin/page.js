'use client';
import { useEffect,useState } from 'react';
import styles from './Admin.module.css'; // CSS модулийг импортлох

export default function AdminPage() {
  const [newMovie, setNewMovie] = useState({
    title: '',
    category: '',
    duration: '',
    year: '',
    rating: '',
    description: '',
    image: '',
    poster: '',
    //videoPath: '', // Киноны бичлэгний зам нэмэх
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewMovie({ ...newMovie, [name]: value });
  };

  const handleAddMovie = async () => {
    if (!newMovie.title || !newMovie.category) {
      alert('Киноны нэр болон төрөл заавал шаардлагатай!');
      return;
    }

    try {
      const response = await fetch('/api/add-movie', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newMovie),
      });

      if (response.ok) {
        setMessage('Кино амжилттай нэмэгдлээ!');
        setNewMovie({
          title: '',
          category: '',
          duration: '',
          year: '',
          rating: '',
          description: '',
          image: '',
          poster: '',
          //videoPath: '', // Киноны бичлэгний замыг хоослох
        });
      } else {
        setMessage('Кино нэмэхэд алдаа гарлаа.');
      }
    } catch (error) {
      console.error('Error adding movie:', error);
      setMessage('Сүлжээний алдаа гарлаа.');
    }
  };

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch('/api/movies')
      .then((res) => res.json())
      .then((data) => setMovies(data))
      .catch((err) => console.error('Failed to fetch movies:', err));
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Админ хэсэг</h1>
      <div className={styles.formContainer}>
        <h2 className={styles.subtitle}>Кино нэмэх</h2>
        <form className={styles.form}>
          <input
            type="text"
            name="title"
            placeholder="Киноны нэр"
            value={newMovie.title}
            onChange={handleChange}
            className={styles.input}
          />
          <input
            type="text"
            name="category"
            placeholder="Төрөл"
            value={newMovie.category}
            onChange={handleChange}
            className={styles.input}
          />
          <input
            type="number"
            name="duration"
            placeholder="Хугацаа (минут)"
            value={newMovie.duration}
            onChange={handleChange}
            className={styles.input}
          />
          <input
            type="number"
            name="year"
            placeholder="Он"
            value={newMovie.year}
            onChange={handleChange}
            className={styles.input}
          />
          <input
            type="number"
            step="0.1"
            name="rating"
            placeholder="Үнэлгээ"
            value={newMovie.rating}
            onChange={handleChange}
            className={styles.input}
          />
          <textarea
            name="description"
            placeholder="Тайлбар"
            value={newMovie.description}
            onChange={handleChange}
            className={styles.textarea}
          />
          <input
            type="text"
            name="image"
            placeholder="Зурагны зам"
            value={newMovie.image}
            onChange={handleChange}
            className={styles.input}
          />
          <input
            type="text"
            name="poster"
            placeholder="Постерын зам"
            value={newMovie.poster}
            onChange={handleChange}
            className={styles.input}
          />
          <button type="button" onClick={handleAddMovie} className={styles.button}>
            Нэмэх
          </button>
        </form>
        {message && <p className={styles.message}>{message}</p>}
      </div>
      <h2>Нэмэгдсэн кинонууд</h2>
      <ul>
        {movies.map((movie) => (
          <li key={movie._id}>
            {movie.title} ({movie.year}) — {movie.category}
          </li>
        ))}
      </ul>
    </div>
  );
}