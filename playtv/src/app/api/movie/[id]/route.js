import { NextResponse } from 'next/server';

const localData = [
    {
        id: 'local-didi', title: "Didi", category: "Инээдмийн", duration: 110, year: 2024, rating: 4.5, description: "Нэгэн өсвөр насны хүү хичээл орохоос өмнө амжиж гэр бүлийнхэн нь зааж чадахгүй нэлээд хэдэн зүйлсийг сурахаар шийднэ. Жишээ нь: скейтбордоор гулгах, хэрхэн зөв сээтгэнэх гэх мэт.", image: "/images/Didi__lookhorizontal.jpg", poster: "/posters/DidiHBO_vertical.jpg", isLocal: true, stream_url: '/videos/didi.mp4'
    },
    {
        id: 'local-amidrah-saihan', title: "Амьдрах Сайхан", category: "Драм", duration: 120, year: 2024, rating: 3.5, description: "Амьдралын утга учир, хайр дурлал, гэр бүл, найз нөхөд, амжилт, алдаа, уналт, босолт, итгэл найдвар, хүсэл мөрөөдөл зэргийг хөндсөн энэхүү кино нь бидний амьдралын хамгийн чухал мөчүүдийг харуулсан бүтээл юм.", image: "/images/Didi__lookhorizontal.jpg", poster: "/posters/AmidrahSaihanS01_vertical.jpg", isLocal: true, stream_url: '/videos/amidrah-saihan.mp4'
    },
    {
        id: 'local-mahan-bombog', title: "Махан Бөмбөг", category: "Анимейшн", duration: 90, year: 2021, rating: 4.5, description: "...", image: "/images/Didi__lookhorizontal.jpg", poster: "/posters/CloudyWithAChanceOfMeatballs_vertical.jpg", isLocal: true, stream_url: '/videos/mahan-bombog.mp4'
    },
    {
        id: 'local-despicableme4', title: "DespicableMe 4", category: "Анимейшн", duration: 100, year: 2024, rating: 5, description: "...", image: "/images/Didi__lookhorizontal.jpg", poster: "/posters/DespicableMe4HBO_vertical.jpg", isLocal: true, stream_url: '/videos/despicableme4.mp4'
    },
    {
        id: 'local-kungfupanda4', title: "KungFu Panda 4", category: "Анимейшн", duration: 115, year: 2024, rating: 5, description: "...", image: "/images/Didi__lookhorizontal.jpg", poster: "/posters/KungfuPanda4HBO_vertical.jpg", isLocal: true, stream_url: '/videos/kungfupanda4.mp4'
    },
    {
        id: 'local-ov-zalgamjlagch', title: "Өв Залгамжлагч", category: "Инээдмийн", duration: 120, year: 2024, rating: 2.5, description: "...", image: "/images/Didi__lookhorizontal.jpg", poster: "/posters/OvZalgamchlagchS01_verticalnotag.jpg", isLocal: true, stream_url: '/videos/ov-zalgamjlagch.mp4'
    },
    {
        id: 'local-ratatouille', title: "Ratatouille", category: "Анимейшн", duration: 130, year: 2014, rating: 5, description: "...", image: "/images/Didi__lookhorizontal.jpg", poster: "/posters/Ratatouille_vertical.jpg", isLocal: true, stream_url: '/videos/ratatouille.mp4'
    },
    {
        id: 'local-skyscraper', title: "Skyscraper", category: "Адал явдалт", duration: 105, year: 2023, rating: 4.0, description: "...", image: "/images/Didi__lookhorizontal.jpg", poster: "/posters/Skyscraper_vertical.jpg", isLocal: true, stream_url: '/videos/skyscraper.mp4'
    },
    {
        id: 'local-zura', title: "Zura", category: "Адал явдаlt", duration: 125, year: 2020, rating: 1.5, description: "...", image: "/images/Didi__lookhorizontal.jpg", poster: "/posters/ztsuram_vertical.jpg", isLocal: true, stream_url: '/videos/zura.mp4'
    },
];

const TMDB_API_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_API_KEY = process.env.TMDB_API_KEY || '197ee8a497663d5deccdac7f2df9d852';

export async function GET(request, { params }) {
    const { id: idParam } = params;

    const localMovie = localData.find(movie => movie.id === idParam);

    if (localMovie) {
        return NextResponse.json(localMovie);
    }

    const tmdbApiUrl = `${TMDB_API_BASE_URL}/movie/${idParam}?api_key=${TMDB_API_KEY}`;

    const tmdbResponse = await fetch(tmdbApiUrl);

    if (!tmdbResponse.ok) {
        const tmdbTvApiUrl = `${TMDB_API_BASE_URL}/tv/${idParam}?api_key=${TMDB_API_KEY}`;
        const tmdbTvResponse = await fetch(tmdbTvApiUrl);

        const tmdbTvData = await tmdbTvResponse.json();
        return NextResponse.json({
            id: tmdbTvData.id.toString(),
            tmdb_id: tmdbTvData.id.toString(),
            title: tmdbTvData.name,
            overview: tmdbTvData.overview || 'No description available.',
            backdrop_path: tmdbTvData.backdrop_path,
            poster_path: tmdbTvData.poster_path,
            release_date: tmdbTvData.first_air_date,
            category: tmdbTvData.genres?.map(g => g.name).join(', ') || 'TV Show',
            duration: tmdbTvData.episode_run_time ? tmdbTvData.episode_run_time[0] : null,
            year: tmdbTvData.first_air_date ? new Date(tmdbTvData.first_air_date).getFullYear() : null,
            rating: tmdbTvData.vote_average ? parseFloat(tmdbTvData.vote_average.toFixed(1)) : null,
            isLocal: false,
            media_type: 'tv',
            imdb_id: tmdbTvData.external_ids?.imdb_id || null,
        });
    }

    const tmdbData = await tmdbResponse.json();

    const externalMovieData = {
        id: tmdbData.id.toString(),
        tmdb_id: tmdbData.id.toString(),
        imdb_id: tmdbData.imdb_id,
        title: tmdbData.title,
        category: tmdbData.genres?.map(g => g.name).join(', ') || 'Movie',
        duration: tmdbData.runtime || 0,
        year: tmdbData.release_date ? new Date(tmdbData.release_date).getFullYear() : null,
        rating: tmdbData.vote_average ? parseFloat(tmdbData.vote_average.toFixed(1)) : null,
        description: tmdbData.overview || 'No description available.',
        backdrop_path: tmdbData.backdrop_path,
        poster_path: tmdbData.poster_path,
        isLocal: false,
        media_type: 'movie',
    };

    return NextResponse.json(externalMovieData);
}