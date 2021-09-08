import React from 'react';
import { Link } from 'react-router-dom';

import menuClose from '../images/menu-close.svg';
import profileIcon from '../images/profile-icon.svg';

function Navigation(props) {
    return (
        <>
            <div className="navigation">
                <Link to="/movies" className="navigation__link navigation__link_taget">Фильмы</Link>
                <Link to="/saved-movies" className="navigation__link">Сохранённые фильмы</Link>
            </div>
            <div className={`menu ${props.isOpen ? 'menu_opened' : ''}`}>
                <button className="menu__colse-icon" onClick={props.onMenu}>
                    <img src={menuClose}></img>
                </button>
                <div className="menu__links">
                    <Link to="/" className="menu__link">Главная</Link>
                    <Link to="/movies" className="menu__link menu__link_taget">Фильмы</Link>
                    <Link to="/saved-movies" className="menu__link">Сохранённые фильмы</Link>
                    <Link to="/profile" className="profile profile_menu">
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