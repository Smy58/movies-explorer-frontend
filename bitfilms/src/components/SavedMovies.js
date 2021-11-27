import React from 'react';
import MoviesCardList from './MoviesCardList';
import SearchForm from './SearchForm';

function SavedMovies(props) {
    return (
        <>
            <SearchForm handleRequest={props.handleRequest} shortVideos={props.shortVideos} notShortVideos={props.notShortVideos} shortMovieToggle={props.shortMovieToggle}/>
            <MoviesCardList movies={props.movies} type={'card__unsave-icon'} onLikeClick={props.onLikeClick}/>
        </>
    );
}

export default SavedMovies;