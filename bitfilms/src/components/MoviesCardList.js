import React from 'react';
import MoviesCard from './MoviesCard';

function MoviesCardList() {
    return (
        <>
        <div class="cards">
            <MoviesCard/>
            <MoviesCard/>
            <MoviesCard/>
            <MoviesCard/>
            <MoviesCard/>
            <MoviesCard/>
            <MoviesCard/>
            <MoviesCard/>
        </div>

        <button class="load-list">Ещё</button>
        </>
    );
}

export default MoviesCardList;