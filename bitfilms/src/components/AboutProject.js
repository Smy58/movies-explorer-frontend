import React from 'react';

function AboutProject() {
    return (
        <div className="about" id="about">
            <h2 className="about__title">О проекте</h2>
            <div className="about__line"></div>
            <div className="about__paragrah">
                <div className="about__column">
                    <div className="about__subtitle">Дипломный проект включал 5 этапов</div>
                    <div className="about__text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</div>
                </div>
                <div className="about__column">
                    <div className="about__subtitle">На выполнение диплома ушло 5 недель</div>
                    <div className="about__text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</div>
                </div>
            </div>
            <div className="diagram">
                <div className="diagram__part diagram__part_back">
                    <div className="diagram__part-time">1 неделя</div>
                    <div className="diagram__part-name">Back-end</div>
                </div>
                <div className="diagram__part diagram__part_front">
                    <div className="diagram__part-time">4 неделя</div>
                    <div className="diagram__part-name">Front-end</div>
                </div>
            </div>
        </div>
     );
}
  
export default AboutProject;