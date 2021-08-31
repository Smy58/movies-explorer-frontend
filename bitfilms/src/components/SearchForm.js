import React from 'react';

import findImg from '../images/find-button.svg';

function SearchForm() {
    return (
        <div className="search">
            <div className="search__block">
                <div className="search__box">
                    <input type="text" name="search-input" id="search-input" className="search__input" placeholder="Фильм"></input>
                    <button type="submit" className="search__find-button">
                        <img src={findImg} alt="Найти"></img>
                    </button>
                </div>
                <div className="search__filter">
                    <label for="filter" className="search__filter-label">Короткометражки</label>
                    <input type="checkbox" name="filter" id="filter" className="search__filter-button"></input>
                </div>
            </div>
            <div className="search__line"></div>
        </div>
    );
}

export default SearchForm;