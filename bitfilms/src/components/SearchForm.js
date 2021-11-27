import React from 'react';

import findImg from '../images/find-button.svg';

function SearchForm(props) {

    const [query, setQuery] = React.useState("");
    const [checked, setChecked] = React.useState(false);

    function handleSearchChange(e) {
        setQuery(e.target.value);
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();
        if (query.length > 0) {
          return props.handleRequest(query);
        }
    };

    function handleCheckbox() {
        setChecked(!checked);
        if (!checked) {
          props.shortVideos();
        } else {
          props.notShortVideos();
        }
      }

    return (
        <div className="search">
            <div className="search__block">
                <div className="search__box">
                    <input type="text" name="search-input" id="search-input" className="search__input" placeholder="Фильм" required onChange={handleSearchChange}></input>
                    <button type="submit" className="search__find-button" onClick={handleSubmit}>
                        <img src={findImg} alt="Найти"></img>
                    </button>
                </div>
                <div className="search__filter">
                    <label className="search__filter-label">Короткометражки</label>
                    <input type="checkbox" name="filter" id="filter" className="search__filter-button" onChange={handleCheckbox}></input>
                </div>
            </div>
            <div className="search__line"></div>
        </div>
    );
}

export default SearchForm;