import React from 'react';
import MoviesCardList from './MoviesCardList';
import SearchForm from './SearchForm';

function Movies() {

    return (
        <>
            <SearchForm/>
            <MoviesCardList type={'card__save-icon'}/>
            
        </>
    );
}

export default Movies;