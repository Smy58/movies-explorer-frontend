import React from 'react';

function Techs() {
    return (
        <div className="tech" id="tech">
            <h2 className="tech__title">Технологии</h2>
            <div className="tech__line"></div>
            <div className="tech__subtitle">7 технологий</div>
            <div className="tech__text">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</div>
            
            <div className="tech__elements">
                <div className="tech__element">HTML</div>
                <div className="tech__element">CSS</div>
                <div className="tech__element">JS</div>
                <div className="tech__element">React</div>
                <div className="tech__element">Git</div>
                <div className="tech__element">Express.js</div>
                <div className="tech__element">mongoDB</div>
            </div>
        </div>
     );
}
  
export default Techs;