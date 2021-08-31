import React from 'react';
import AboutMe from './AboutMe';
import AboutProject from './AboutProject';
import Promo from './Promo';
import Techs from './Techs';

function Main() {
    return (
        <div className='page'>
            <Promo/>
            <AboutProject/>
            <Techs/>
            <AboutMe/>
        </div>
    );
}

export default Main;