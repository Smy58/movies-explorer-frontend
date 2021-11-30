import React from 'react';

function NotFound(props) {
    return (
        <>
            <div className="not-found-block">
                <h1 className="not-found-block__code">404</h1>
                <p className="not-found-block__desccribe">Страница не найдена</p>
            </div>
            <button className="back-button" onClick={props.history.goBack}>Назад</button>
        </>
     );
}
  
export default NotFound;