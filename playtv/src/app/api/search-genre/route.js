import { NextResponse } from 'next/server';

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

export async function GET() {
    const movieRes = await fetch(`${TMDB_BASE_URL}/genre/movie/list?api_key=${TMDB_API_KEY}`);
    const movieData = await movieRes.json();
    const allGenresMap = new Map();
    movieData.genres.forEach(genre => allGenresMap.set(genre.id, genre));
    const sortedGenres = Array.from(allGenresMap.values()).sort((a, b) => a.name.localeCompare(b.name));

    return NextResponse.json({ genres: sortedGenres });
}