import React from 'react';
import cardIMG from '../images/card1.png';


function MoviesCard(props) {
    const [isSaved, setSaved] = React.useState(false);

    function handleCardSave(e) {
        setSaved(!isSaved);
    }

    return (
        <div class="card">
            <div class="card__info">
                <div class="card__text">
                    <h2 class="card__title">33 слова о дизайне</h2>
                    <p class="card__duration">1ч 47м</p>
                </div>
                <button class={`card__save-button ${isSaved ? 'card__save-button_saved' : ''}`} onClick={handleCardSave}>
                    <div class={props.type}></div>
                </button>
            </div>
            <img src={cardIMG} alt="Карточка изображения" class="card__image"></img>
        </div>
    );
}

export default MoviesCard;