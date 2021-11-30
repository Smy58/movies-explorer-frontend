import React from 'react';
import { Link } from 'react-router-dom';

import menuClose from '../images/menu-close.svg';
import profileIcon from '../images/profile-icon.svg';

function Navigation(props) {
    
    return (
        <>
            <div className="navigation">
                <Link to="/movies" className={`navigation__link ${ props.history ? (props.history.location.pathname === "/movies" ? "navigation__link_taget" : "" ) : "" } ${props.mainMenu ? 'navigation__link_main-page' : ""} `}>Фильмы</Link>
                <Link to="/saved-movies" className={`navigation__link ${props.history ? (props.history.location.pathname === "/movies" ? "navigation__link_taget" : "" ) : "" } navigation__link_taget ${props.mainMenu ? 'navigation__link_main-page' : ""} `}>Сохранённые фильмы</Link>
            </div>
            <div className={`menu ${props.isOpen ? 'menu_opened' : ''}`}>
                <button className="menu__colse-icon" onClick={props.onMenu}>
                    <img src={menuClose} alt="Закрыть меню"></img>
                </button>
                <div className="menu__links">
                    <Link to="/" className="menu__link">Главная</Link>
                    <Link to="/movies" className={`menu__link ${props.history ? (props.history.location.pathname === "/movies" ? "menu__link_taget" : "") : "" }`}>Фильмы</Link>
                    <Link to="/saved-movies" className={`menu__link ${props.history ? (props.history.location.pathname === "/saved-movies" ? "menu__link_taget" : "") : "" } ${props.mainMenu ? "menu__link_main-page" : ""}`}>Сохранённые фильмы</Link>
                    <Link to="/profile" className={`profile profile_menu`}>
                        <p className="profile__name">Аккаунт</p>
                        <div className="profile__icon">
                            <img src={profileIcon} alt="Аккаунт"></img>
                        </div>
                    </Link>
                </div>
            </div>
        </>
    );
}


export default Navigation;