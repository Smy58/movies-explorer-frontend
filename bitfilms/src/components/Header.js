import React from 'react';
import profileIcon from '../images/profile-icon.svg';
import logo from '../images/logo.svg';
import Navigation from './Navigation';

import { Link } from 'react-router-dom';

import menuLogo from '../images/menu-icon.svg';

function Header(props) {
    return (
        <header className={`header ${props.mainMenu ? "header_main-page" : ""}`}>
            <div className="header__left">
                <Link to="/"><img src={logo} alt="Лого" className="header__logo"></img></Link>
                <Navigation isOpen={props.isOpen} onMenu={props.onMenu} mainMenu={props.mainMenu} history={props.history}/>
            </div>
            <Link to="/profile" className="profile">
                <p className={`profile__name ${props.mainMenu ? 'profile__name_main-page' : ""}`}>Аккаунт</p>
                <div className="profile__icon">
                    <img src={profileIcon} alt="Аккаунт"></img>
                </div>
            </Link>
            <div className="header__right">
                <button className="header__menu-button" onClick={props.onMenu}>
                    <img src={menuLogo} alt="Лого меню"></img>
                </button>
            </div>
        </header>
    );
}

export default Header;