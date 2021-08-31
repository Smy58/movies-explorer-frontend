import React from 'react';
import MoviesCardList from './MoviesCardList';
import SearchForm from './SearchForm';

function SavedMovies() {
    return (
        <>
            <SearchForm/>
            <MoviesCardList/>
        </>
    );
}

export default SavedMovies;