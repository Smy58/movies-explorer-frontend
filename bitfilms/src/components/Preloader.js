import React from 'react'

const Preloader = ({isCheckingToken}) => {
    return (
        <div className={`preloader ${isCheckingToken ? "preloader_center" : ""}`}>
            <div className="preloader__container">
                <span className="preloader__round"></span>
            </div>
        </div>
    )
};

export default Preloader