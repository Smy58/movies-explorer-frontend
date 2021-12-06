import React from 'react';

function MoviesCard(props) {
    const [isSaved, setSaved] = React.useState(props.movie.like);
    //console.log(props.movie.trailerLink);
    //console.log(props.movie);

    function handleLikeClick(){
        console.log(props.movie);
        //console.log(props.movie.like);
        props.onLikeClick(props.movie);
        setSaved(!isSaved);
    }

    return (
        <div className="card">
            <div className="card__info">
                <div className="card__text">
                    <h2 className="card__title">{props.movie.nameRU}</h2>
                    <p className="card__duration">{`${props.movie.duration >= 60 ? `${Math.ceil(props.movie.duration / 60) - 1} ч ` : ''}${(props.movie.duration % 60)} м`}</p>
                </div>
                <button type="button" className={`card__save-button ${isSaved ? 'card__save-button_saved' : ''}`} onClick={handleLikeClick}>
                    <div className={props.type}></div>
                </button>
            </div>
            <a href={props.movie.trailerLink == null ? 'no links' : props.movie.trailerLink}>
                <img src={props.movie.image.url ? 'https://api.nomoreparties.co' + props.movie.image.url : props.movie.image} alt="Карточка изображения" className="card__image"></img>
            </a>
        </div>
    );
}

export default MoviesCard;