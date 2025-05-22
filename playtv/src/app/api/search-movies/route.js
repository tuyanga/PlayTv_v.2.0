import { NextResponse } from 'next/server';

const TMDB_API_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_API_KEY = process.env.TMDB_API_KEY || '197ee8a497663d5deccdac7f2df9d852';
const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query');
    const page = searchParams.get('page') || '1';

    const tmdbApiUrl = `${TMDB_API_BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(query)}&page=${page}`;

    const tmdbResponse = await fetch(tmdbApiUrl);

    const tmdbData = await tmdbResponse.json();

    const adaptedResults = tmdbData.results.map(movie => ({
        id: movie.id?.toString(),
        tmdb_id: movie.id?.toString(),
        imdb_id: movie.imdb_id,
        title: movie.title || 'Untitled',
        year: movie.release_date ? new Date(movie.release_date).getFullYear() : null,
        rating: movie.vote_average ? parseFloat(movie.vote_average.toFixed(1)) : null,
        description: movie.overview || 'No description available.',
        poster: movie.poster_path ? TMDB_IMAGE_BASE_URL + movie.poster_path : '/placeholder-poster.jpg',
        category: movie.genre_ids?.length > 0 ? movie.genre_ids.join(', ') : 'Movie',
        duration: null,
        isLocal: false,
    }));

    return NextResponse.json({
        results: adaptedResults,
        page: tmdbData.page,
        total_pages: tmdbData.total_pages,
        total_results: tmdbData.total_results,
    });
}