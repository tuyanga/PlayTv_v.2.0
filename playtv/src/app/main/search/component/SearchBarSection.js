'use client';

import React, { useState } from 'react';
import styles from './styles/SearchBarSection.module.css';

export default function SearchBarSection({
    searchTerm, setSearchTerm,
    selectedGenre, setSelectedGenre, genresOptions,
    selectedYear, setSelectedYear,
    sortBy, setSortBy,
    selectedCountry, setSelectedCountry,
    mediaType, setMediaType,
    onSearch
}) {
    const [isFilterVisible, setIsFilterVisible] = useState(false);

    const currentYear = new Date().getFullYear();
    const years = ['Any', ...Array.from({ length: 125 }, (_, i) => currentYear - i).map(String)];

    const sortOptions = [
        { label: 'Most Popular', value: 'popularity.desc' },
        { label: 'Least Popular', value: 'popularity.asc' },
        { label: 'Latest Release', value: 'release_date.desc' },
        { label: 'Oldest Release', value: 'release_date.asc' },
        { label: 'Highest Rated', value: 'vote_average.desc' },
        { label: 'Lowest Rated', value: 'vote_average.asc' },
        { label: 'Alphabetical A-Z', value: 'original_title.asc' },
        { label: 'Alphabetical Z-A', value: 'original_title.desc' },
    ];

    const countries = [
        'Any', 'US', 'GB', 'CA', 'AU', 'IN', 'JP', 'KR', 'FR', 'DE', 'MN', 'CN', 'ES', 'BR', 'MX', 'RU', 'IT', 'CH', 'SE', 'DK', 'NO', 'NL'
    ];

    const toggleFilterOptions = (event) => {
        event.stopPropagation();
        setIsFilterVisible(prev => !prev);
    };

    const handleInputChange = (setter, value) => {
        setter(value);
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        if (onSearch) {
            onSearch({
                query: searchTerm,
                genre: selectedGenre,
                year: selectedYear,
                sortBy: sortBy,
                country: selectedCountry,
                type: mediaType,
            });
        }
    };

    return (
        <form onSubmit={handleFormSubmit} className={styles['search-bar-section']}>
            <div className={styles['secondary-header']}>
                <div className={styles['header-left-group']}>
                    <div className={styles['nav-buttons']}>
                        <button className={styles['nav-btn']} type="button"><i className="fas fa-chevron-left"></i></button>
                        <button className={styles['nav-btn']} type="button"><i className="fas fa-chevron-right"></i></button>
                    </div>
                    <div className={styles['explore-title']}>Кино Сан</div>
                </div>
                <div className={styles['secondary-search-box']}>
                    <i className="fas fa-search"></i>
                    <input
                        type="text"
                        placeholder="Хайх..."
                        value={searchTerm}
                        onChange={(e) => handleInputChange(setSearchTerm, e.target.value)}
                        className={styles['searchInput']}
                    />
                    <select
                        className={styles['movie-select']}
                        value={mediaType}
                        onChange={(e) => handleInputChange(setMediaType, e.target.value)}
                    >
                        <option value="movie">Movie</option>
                        <option value="tv">TV Show</option>
                    </select>
                    <button
                        className={styles['filter-btn']}
                        onClick={toggleFilterOptions}
                        style={{ backgroundColor: isFilterVisible ? '#02BCB5' : '#333' }}
                        type="button"
                    >
                         {isFilterVisible ? ( <i className="fas fa-filter" style={{ color: '#FDFDFF' }}></i> ) : ( <i className="fas fa-filter" style={{ color: '#999' }}></i> )}
                    </button>
                </div>
            </div>

            <div className={`${styles['filter-options']} ${isFilterVisible ? styles.active : ''}`}>
                <div className={styles['filter-row']}>
                    <div className={styles['filter-group']}>
                        <label>GENRE</label>
                        <select
                            value={selectedGenre}
                            onChange={(e) => handleInputChange(setSelectedGenre, e.target.value)}
                            className={styles['filter-select']}
                        >
                            {genresOptions.map(option => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className={styles['filter-group']}>
                        <label>YEAR</label>
                        <select
                            value={selectedYear}
                            onChange={(e) => handleInputChange(setSelectedYear, e.target.value)}
                            className={styles['filter-select']}
                        >
                            {years.map(year => (
                                <option key={year} value={year}>{year}</option>
                            ))}
                        </select>
                    </div>

                    <div className={styles['filter-group']}>
                        <label>SORT BY</label>
                        <select
                            value={sortBy}
                            onChange={(e) => handleInputChange(setSortBy, e.target.value)}
                            className={styles['filter-select']}
                        >
                            {sortOptions.map(option => (
                                <option key={option.value} value={option.value}>{option.label}</option>
                            ))}
                        </select>
                    </div>

                    <div className={styles['filter-group']}>
                        <label>COUNTRY</label>
                        <select
                            value={selectedCountry}
                            onChange={(e) => handleInputChange(setSelectedCountry, e.target.value)}
                            className={styles['filter-select']}
                        >
                            {countries.map(country => (
                                <option key={country} value={country}>{country}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
            <button type="submit" style={{ display: 'none' }} aria-hidden="true"></button>
        </form>
    );
}