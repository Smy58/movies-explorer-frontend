import React from 'react';

function Footer() {
    return (
        <footer className="footer">
            <p className="footer__about">Учебный проект Яндекс.Практикум х BeatFilm.</p>
            <div className="footer__line"></div>
            <div className="footer__info">
                <p className="footer__copyright">© 2020</p>
                <div className="footer__links">
                    <a href="#" className="footer__link">Яндекс.Практикум</a>
                    <a href="#" className="footer__link">Github</a>
                    <a href="#" className="footer__link">Facebook</a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;