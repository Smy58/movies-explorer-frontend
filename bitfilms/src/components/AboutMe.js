import React from 'react';
import Portfolio from './Portfolio';

import ava from '../images/ouhfQ_j7ycA.jpg';

function AboutMe() {
    return (
        <div className="student" id="student">
            <h2 className="student__title">Студент</h2>
            <div className="student__line"></div>

            <div className="student__card">
                <div className="student__info">
                    <div className="student__text">
                        <div className="student__name">Ильшат</div>
                        <div className="student__proff">Фронтенд-разработчик, 20 лет</div>
                        <div className="student__bio">Я родился и живу в Алмате, учусь на факультете инженерии СДУ. Я люблю слушать музыку, а ещё увлекаюсь волейболом. Начал кодить еще в 8 классе. После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.</div>
                    </div>

                    <div className="student__social-links">
                        <a href="#" className="student__social-link">Facebook</a>
                        <a href="#" className="student__social-link">Github</a>
                    </div>
                </div>
                <img src={ava} alt="Аватар" className="student__ava"></img>
            </div>

            <Portfolio/>
        </div>
     );
}
  
export default AboutMe;