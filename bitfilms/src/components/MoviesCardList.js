import React from 'react';
import MoviesCard from './MoviesCard';

function MoviesCardList(props) {

    // console.log(props.movies);

    return (
        <>
            <div className="cards">
                {
                    props.movies.map(item => (
                        <MoviesCard
                            movie = {item}
                            key={item.id ? item.id : item.movieId}
                            type={props.type}
                            onLikeClick={props.onLikeClick}
                        />)
                    )
                }
            </div>
        </>
    );
}

export default MoviesCardList;