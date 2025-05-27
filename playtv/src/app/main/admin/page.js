'use client';
import { useEffect, useState } from 'react';
import styles from './Admin.module.css';

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
    video_path: '',
    trailer_path: '',
  });
  const [message, setMessage] = useState('');
  const [movies, setMovies] = useState([]);
  const [editId, setEditId] = useState(null); 

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
        headers: { 'Content-Type': 'application/json' },
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
          video_path: '',
          trailer_path: '',
        });
        await fetchMovies();
      } else {
        setMessage('Кино нэмэхэд алдаа гарлаа.');
      }
    } catch (error) {
      console.error('Error adding movie:', error);
      setMessage('Сүлжээний алдаа гарлаа.');
    }
  };

  const handleUpdateMovie = async () => {
    if (!newMovie.title || !newMovie.category) {
      alert('Киноны нэр болон төрөл заавал шаардлагатай!');
      return;
    }
    try {
      const response = await fetch(`/api/movies/${editId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newMovie),
      });
      if (response.ok) {
        setMessage('Кино амжилттай шинэчлэгдлээ!');
        setNewMovie({
          title: '',
          category: '',
          duration: '',
          year: '',
          rating: '',
          description: '',
          image: '',
          poster: '',
          video_path: '',
          trailer_path: '',
        });
        setEditId(null);
        await fetchMovies();
      } else {
        setMessage('Кино шинэчлэхэд алдаа гарлаа.');
      }
    } catch (error) {
      console.error('Error updating movie:', error);
      setMessage('Сүлжээний алдаа гарлаа.');
    }
  };

  const fetchMovies = async () => {
    try {
      const res = await fetch('/api/movies');
      const data = await res.json();
      setMovies(data);
    } catch (err) {
      console.error('Failed to fetch movies:', err);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Устгах уу?')) return;
    try {
      await fetch(`/api/movies/${id}`, { method: 'DELETE' });
      await fetchMovies();
    } catch (error) {
      console.error('Failed to delete movie:', error);
    }
  };

  // "Засах" товч дархад формд мэдээлэл populate хийх
  const handleEdit = (movie) => {
    setNewMovie({
      title: movie.title || '',
      category: movie.category || '',
      duration: movie.duration || '',
      year: movie.year || '',
      rating: movie.rating || '',
      description: movie.description || '',
      image: movie.image || '',
      poster: movie.poster || '',
      video_path: movie.video_path || '',
      trailer_path: movie.trailer_path || '',
    });
    setEditId(movie._id);
    window.scrollTo({ top: 0, behavior: 'smooth' }); // form руу автоматаар гүйлгэнэ
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.sectionWrapper}>
      <h1 className={styles.title}>Админ хэсэг</h1>
      <div className={styles.formContainer}>
        <h2 className={styles.subtitle}>{editId ? 'Кино засах' : 'Кино нэмэх'}</h2>
        <form className={styles.form} onSubmit={e => e.preventDefault()}>
         
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
          <input
            type="text"
            name="video_path"
            placeholder="Киноны зам"
            value={newMovie.video_path}
            onChange={handleChange}
            className={styles.input}
          />
          <input
            type="text"
            name="trailer_path"
            placeholder="Трейлерын зам"
            value={newMovie.trailer_path}
            onChange={handleChange}
            className={styles.input}
          />
          <button
            type="button"
            onClick={editId ? handleUpdateMovie : handleAddMovie}
            className={styles.button}
          >
            {editId ? 'Шинэчлэх' : 'Нэмэх'}
          </button>
          {editId && (
            <button
              type="button"
              className={styles.button}
              style={{ background: '#888'}}
              onClick={() => {
                setEditId(null);
                setNewMovie({
                  title: '',
                  category: '',
                  duration: '',
                  year: '',
                  rating: '',
                  description: '',
                  image: '',
                  poster: '',
                  video_path  : '',
                  trailer_path: '',
                });
              }}
            >
              Болих
            </button>
          )}
        </form>
        {message && <p className={styles.message}>{message}</p>}
      </div>
      </div>
<div className={styles.sectionWrapper}>
      <h2 className={styles.title}>Нэмэгдсэн кинонууд</h2>
      <div className={styles.tableWrapper}>
        <table className={styles.movieTable}>
          <thead>
            <tr>
              <th>Постер</th>
              <th>Нэр</th>
              <th>Төрөл</th>
              <th>Он</th>
              <th>Үргэлжлэх хугацаа</th>
              <th>Үнэлгээ</th>
              <th>Үйлдэл</th>
            </tr>
          </thead>
          <tbody>
            {movies.map((movie) => (
              <tr key={movie._id}>
                <td>
                  {movie.poster ? (
                    <img src={movie.poster} alt={movie.title} className={styles.posterImg} />
                  ) : (
                    <span>---</span>
                  )}
                </td>
                <td>{movie.title}</td>
                <td>{movie.category}</td>
                <td>{movie.year}</td>
                <td>{movie.duration} мин</td>
                <td>{movie.rating}</td>
                <td>
                  <button className={styles.actionBtn} onClick={() => handleEdit(movie)}>Засах</button>
                  <button className={styles.actionBtn} onClick={() => handleDelete(movie._id)}>Устгах</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </div>
    </div>
  );
}