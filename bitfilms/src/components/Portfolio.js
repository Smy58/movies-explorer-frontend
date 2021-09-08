import React from 'react';
import imgLink from '../images/portfolio.svg';

function Portfolio() {
    return (
        <div className="student__portfolio">
            <h4 className="student__subtitle">Портфолио</h4>
            <div className="student__portfolio-item">
                <p className="student__portfolio-name">Статичный сайт</p>
                <img src={imgLink} alt="Ссылка"></img>
            </div>
            <div className="student__portfolio-item">
                <p className="student__portfolio-name">Адаптивный сайт</p>
                <img src={imgLink} alt="Ссылка"></img>
            </div>
            <div className="student__portfolio-item">
                <p className="student__portfolio-name">Одностраничное приложение</p>
                <img src={imgLink} alt="Ссылка"></img>
            </div>  
        </div>
     );
}
  
export default Portfolio;