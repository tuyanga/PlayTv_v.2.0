import { NextResponse } from 'next/server';

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const VIDSCR_BASE_URL = process.env.VIDSCR_BASE_URL || 'https://vidsrc.xyz';

let genreMap = null;
let genresFetchedPromise = null;

async function ensureGenreMap() {
    if (genreMap) return;
    if (genresFetchedPromise) return genresFetchedPromise;

    genresFetchedPromise = (async () => {
        const movieRes = await fetch(`${TMDB_BASE_URL}/genre/movie/list?api_key=${TMDB_API_KEY}`);
        const tvRes = await fetch(`${TMDB_BASE_URL}/genre/tv/list?api_key=${TMDB_API_KEY}`);

        const movieGenres = await movieRes.json();
        const tvGenres = await tvRes.json();

        const tempGenreMap = {};
        [...movieGenres.genres, ...tvGenres.genres].forEach(genre => {
            tempGenreMap[genre.name.toLowerCase()] = genre.id;
        });
        genreMap = tempGenreMap;
    })();
    return genresFetchedPromise;
}

ensureGenreMap();

export async function GET(request) {
    const { searchParams } = new URL(request.url);

    const query = searchParams.get('query') || '';
    const genreName = searchParams.get('genre') || 'Any';
    const genreIdFromParam = searchParams.get('genreId');
    const year = searchParams.get('year') || 'Any';
    const sortBy = searchParams.get('sortBy') || 'popularity.desc';
    const countryCode = searchParams.get('country') || 'Any';
    const mediaType = searchParams.get('type') || 'movie';
    const page = searchParams.get('page') || '1';

    await ensureGenreMap();

    let tmdbUrl;
    const tmdbQueryParams = new URLSearchParams();
    tmdbQueryParams.append('api_key', TMDB_API_KEY);
    tmdbQueryParams.append('language', 'en-US');
    tmdbQueryParams.append('page', page);

    if (query) {
        tmdbUrl = `${TMDB_BASE_URL}/search/${mediaType}`;
        tmdbQueryParams.append('query', query);
    } else {
        tmdbUrl = `${TMDB_BASE_URL}/discover/${mediaType}`;
        tmdbQueryParams.append('include_adult', 'false');
        tmdbQueryParams.append('include_video', 'false');
        tmdbQueryParams.append('sort_by', sortBy);

        if (genreIdFromParam) {
            tmdbQueryParams.append('with_genres', genreIdFromParam);
        } else if (genreName !== 'Any' && genreMap && genreMap[genreName.toLowerCase()]) {
            tmdbQueryParams.append('with_genres', genreMap[genreName.toLowerCase()]);
        }

        if (year !== 'Any') {
            if (mediaType === 'movie') {
                tmdbQueryParams.append('primary_release_year', year);
            } else {
                tmdbQueryParams.append('first_air_date_year', year);
            }
        }
        if (countryCode !== 'Any') {
            tmdbQueryParams.append('with_origin_country', countryCode);
        }
    }

    let tmdbResponseData;
    const response = await fetch(`${tmdbUrl}?${tmdbQueryParams.toString()}`);
    tmdbResponseData = await response.json();

    const enrichedResults = await Promise.all(tmdbResponseData.results.map(async (item) => {
        let imdbId = item.imdb_id;
        if (!imdbId && item.id && mediaType === 'movie') {
            const externalIdsRes = await fetch(`${TMDB_BASE_URL}/movie/${item.id}/external_ids?api_key=${TMDB_API_KEY}`);
            if (externalIdsRes.ok) {
                const externalIdsData = await externalIdsRes.json();
                imdbId = externalIdsData.imdb_id;
            }
        }

        const streamingLinks = [];
        if (imdbId) {
            streamingLinks.push({
                source: 'Vidsrc',
                url: `${VIDSCR_BASE_URL}/embed/${mediaType}?imdb=${imdbId}`
            });
        }

        return {
            id: item.id.toString(),
            title: item.title || item.name || 'Untitled',
            releaseDate: item.release_date || item.first_air_date,
            voteAverage: item.vote_average,
            overview: item.overview,
            posterPath: item.poster_path ? `https://image.tmdb.org/t/p/w500${item.poster_path}` : '/placeholder-poster.jpg',
            backdropPath: item.backdrop_path ? `https://image.tmdb.org/t/p/original${item.backdrop_path}` : null,
            genreIds: item.genre_ids,
            mediaType: item.media_type || mediaType,
            imdbId: imdbId,
            streamingLinks: streamingLinks,
            popularity: item.popularity,
        };
    }));

    return NextResponse.json({
        results: enrichedResults,
        page: tmdbResponseData.page,
        totalPages: tmdbResponseData.total_pages,
        totalResults: tmdbResponseData.total_results,
    });
}