'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import Header from '../components/header';
import MovieList from './component/MovieList';
import SearchBarSection from './component/SearchBarSection';

import styles from './page.module.css';

function debounce(func, delay) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

const localMoviesData = [
    { id: 'local-didi', title: "Didi", category: "Инээдмийн", duration: 110, year: 2024, rating: 4.5, description: "Энэ бол Диди.", posterPath: "/posters/DidiHBO_vertical.jpg", isLocal: true },
    { id: 'local-amidrah-saihan', title: "Амьдрах Сайхан", category: "Драм", duration: 120, year: 2024, rating: 3.5, description: "Амьдралын тухай.", posterPath: "/posters/AmidrahSaihanS01_vertical.jpg", isLocal: true },
];

export default function SearchPage() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [searchTerm, setSearchTerm] = useState(searchParams.get('query') || '');
    const [selectedGenre, setSelectedGenre] = useState(searchParams.get('genre') || 'Any');
    const [selectedYear, setSelectedYear] = useState(searchParams.get('year') || 'Any');
    const [sortBy, setSortBy] = useState(searchParams.get('sortBy') || 'popularity.desc');
    const [selectedCountry, setSelectedCountry] = useState(searchParams.get('country') || 'Any');
    const [mediaType, setMediaType] = useState(searchParams.get('type') || 'movie');

    const [displayedMovies, setDisplayedMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(parseInt(searchParams.get('page') || '1'));
    const [totalPages, setTotalPages] = useState(1);
    const [genresOptions, setGenresOptions] = useState([]);
    const [isInitialLoad, setIsInitialLoad] = useState(true);

    useEffect(() => {
        const fetchGenres = async () => {
            const res = await fetch('/api/genres');
            const data = await res.json();

            const options = [{ value: 'Any', label: 'Any' }];
            if (data.genres && Array.isArray(data.genres)) {
                options.push(...data.genres.map(g => ({ value: g.name, label: g.name })));
            }
            setGenresOptions(options);
        };
        fetchGenres();
    }, []);

    const fetchMovies = useCallback(async (filters, page) => {
        setIsLoading(true);

        const params = new URLSearchParams();
        if (filters.query) params.append('query', filters.query);
        if (filters.genre && filters.genre !== 'Any') params.append('genre', filters.genre);
        if (filters.year && filters.year !== 'Any') params.append('year', filters.year);
        if (filters.sortBy) params.append('sortBy', filters.sortBy);
        if (filters.country && filters.country !== 'Any') params.append('country', filters.country);
        if (filters.type) params.append('type', filters.type);
        params.append('page', page.toString());

        router.push(`/main/search?${params.toString()}`, undefined, { shallow: true });

        const response = await fetch(`/api/search?${params.toString()}`);
        const data = await response.json();

        const filteredLocalMovies = filters.query
            ? localMoviesData.filter(movie =>
                  movie.title.toLowerCase().includes(filters.query.toLowerCase()) ||
                  movie.description?.toLowerCase().includes(filters.query.toLowerCase()) ||
                  movie.category?.toLowerCase().includes(filters.query.toLowerCase()) ||
                  movie.year?.toString().includes(filters.query.toLowerCase())
              )
            : [];

        const externalResultsFiltered = data.results.filter(externalMovie =>
            !localMoviesData.some(localMovie => localMovie.id === externalMovie.id.toString())
        );

        if (page === 1) {
            setDisplayedMovies([...filteredLocalMovies, ...externalResultsFiltered]);
        } else {
            setDisplayedMovies(prevMovies => {
                const existingIds = new Set(prevMovies.map(m => m.id));
                const newMoviesToAppend = externalResultsFiltered.filter(m => m.id != null && !existingIds.has(m.id));
                return [...prevMovies, ...newMoviesToAppend];
            });
        }

        setTotalPages(data.totalPages);
        setIsInitialLoad(false);
        setIsLoading(false);
    }, [router, localMoviesData]);

    const debouncedFetchMovies = useCallback(
        debounce((filters, page) => fetchMovies(filters, page), 500),
        [fetchMovies]
    );

    useEffect(() => {
        const currentFilters = {
            query: searchTerm,
            genre: selectedGenre,
            year: selectedYear,
            sortBy: sortBy,
            country: selectedCountry,
            type: mediaType,
        };
        debouncedFetchMovies(currentFilters, currentPage);
    }, [searchTerm, selectedGenre, selectedYear, sortBy, selectedCountry, mediaType, currentPage, debouncedFetchMovies]);

    const handleSearch = (newFilters) => {
        let stateChanged = false;
        if (newFilters.query !== searchTerm) { setSearchTerm(newFilters.query); stateChanged = true; }
        if (newFilters.genre !== selectedGenre) { setSelectedGenre(newFilters.genre); stateChanged = true; }
        if (newFilters.year !== selectedYear) { setSelectedYear(newFilters.year); stateChanged = true; }
        if (newFilters.sortBy !== sortBy) { setSortBy(newFilters.sortBy); stateChanged = true; }
        if (newFilters.country !== selectedCountry) { setSelectedCountry(newFilters.country); stateChanged = true; }
        if (newFilters.type !== mediaType) { setMediaType(newFilters.type); stateChanged = true; }

        if (stateChanged || (newFilters.query !== searchTerm && searchTerm === '')) {
            setCurrentPage(1);
        }
    };

    const handleNextPage = () => {
        if (!isLoading && currentPage < totalPages) {
            setCurrentPage(prev => prev + 1);
        } else if (!isLoading && totalPages === 1 && displayedMovies.length > 0 && !searchTerm) {
            setCurrentPage(prev => prev + 1);
        }
    };

    const handlePrevPage = () => {
        if (!isLoading && currentPage > 1) {
            setCurrentPage(prev => prev - 1);
        }
    };

    const isSearchActive = !!searchTerm || selectedGenre !== 'Any' || selectedYear !== 'Any' || selectedCountry !== 'Any' || mediaType !== 'movie';

  return (
    <div className={styles['page-container']}>
        <Header />
        <SearchBarSection
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedGenre={selectedGenre}
            setSelectedGenre={setSelectedGenre}
            genresOptions={genresOptions}
            selectedYear={selectedYear}
            setSelectedYear={setSelectedYear}
            sortBy={sortBy}
            setSortBy={setSortBy}
            selectedCountry={selectedCountry}
            setSelectedCountry={setSelectedCountry}
            mediaType={mediaType}
            setMediaType={setMediaType}
            onSearch={handleSearch}
        />

        {isLoading && <p className={styles.loadingMessage}>Loading movies...</p>}
        {!isLoading && displayedMovies.length === 0 && !isInitialLoad && (
            <p className={styles.noResultsText}>No movies found matching your criteria.</p>
        )}
        {!isLoading && displayedMovies.length === 0 && isInitialLoad && (
            <p className={styles.noResultsText}>Use the search bar or filters to find movies and TV shows.</p>
        )}

        <MovieList
            movies={displayedMovies}
            currentPage={currentPage}
            totalPages={totalPages}
            handleNextPage={handleNextPage}
            handlePrevPage={handlePrevPage}
            isLoading={isLoading}
            isSearchActive={isSearchActive}
            canGoNext={!isLoading && currentPage < totalPages}
            canGoPrev={!isLoading && currentPage > 1}
        />
    </div>
  );
}