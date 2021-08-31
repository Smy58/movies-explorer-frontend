import React from 'react';
import NavTab from './NavTab';
import logo from '../images/logo.svg';
import logoPrakt from '../images/hero-logo-praktikum.svg';
import { Link } from 'react-router-dom';

function Promo() {
    return (
        <div className="hero">
            <div className="hero__header">
                <Link to="/"><img src={logo} alt="Лого" className="hero__logo"></img></Link>
                <div className="hero__nav">
                    <Link to="/signup" className="hero__nav-link">Регистрация</Link>
                    <Link to="/signin" className="hero__nav-link hero__nav-link_signin">Войти</Link>
                </div>
            </div>
            <div className="hero__description-block">
                <img src={logoPrakt} alt="Яндекс Курсы" className="hero__praktikum-logo"></img>
                <h2 className="hero__title">Учебный проект студента факультета Веб-разработки.</h2>
            </div>
            <NavTab/>
        </div>
    );
}

export default Promo;