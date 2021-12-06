import React from 'react';
import MoviesCard from './MoviesCard';
import { CurrentUserContext } from "../contexts/CurrentUserContext";


function MoviesCardList(props) {
    const userInfo = React.useContext(CurrentUserContext);

    // console.log(props.movies);

    return (
        <>
            <div className="cards">
                {
                    props.movies.map(item => (
                        item.owner ? (
                            userInfo.data._id === item.owner ?
                            <MoviesCard
                                movie = {item}
                                key={item.id ? item.id : item.movieId}
                                type={props.type}
                                onLikeClick={props.onLikeClick}
                            /> : ""
                            ) : 
                            <MoviesCard
                                movie = {item}
                                key={item.id ? item.id : item.movieId}
                                type={props.type}
                                onLikeClick={props.onLikeClick}
                            />
                        )
                    )
                }
            </div>
        </>
    );
}

export default MoviesCardList;