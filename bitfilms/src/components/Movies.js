import React from 'react';
import MoviesCardList from './MoviesCardList';
import SearchForm from './SearchForm';

function Movies(props) {
    //console.log(props.movies);

    return (
        <>
            <SearchForm handleRequest={props.handleRequest} shortVideos={props.shortVideos} notShortVideos={props.notShortVideos} shortMovieToggle={props.shortMovieToggle}/>
            <MoviesCardList movies={props.movies} type={'card__save-icon'} onLikeClick={props.onLikeClick} />
            <button className={`load-list ${ props.isHiddenButton ? 'load-list_hidden' : ''}`} onClick={props.uploadingСards}>Ещё</button>
        </>
    );
}

export default Movies;