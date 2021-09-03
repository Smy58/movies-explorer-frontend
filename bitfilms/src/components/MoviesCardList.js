import React from 'react';
import MoviesCard from './MoviesCard';

function MoviesCardList(props) {
    return (
        <>
        <div class="cards">
            <MoviesCard type={props.type}/>
            <MoviesCard type={props.type}/>
            <MoviesCard type={props.type}/>
            <MoviesCard type={props.type}/>
            <MoviesCard type={props.type}/>
            <MoviesCard type={props.type}/>
            <MoviesCard type={props.type}/>
            <MoviesCard type={props.type}/>
        </div>

        <button class="load-list">Ещё</button>
        </>
    );
}

export default MoviesCardList;