import React from 'react';
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Profile(props) {
    const userInfo = React.useContext(CurrentUserContext);
    const [data, setData] = React.useState({name: (userInfo.data ? userInfo.data.name : ''), email: (userInfo.data ? userInfo.data.email : '')});

    function logout() {
        props.exit();
    }

    function handleChange (e) {
        const {name, value} = e.target;
        setData({ ...data, [name]: value });
    }

    function patchProfile(e) {
        e.preventDefault();
        
        props.editProfile(data.name, data.email);
    }

    return (
        <div className="redactor-form">
            <h2 className="redactor-form__title">{`Привет, ${userInfo.data ? userInfo.data.name : ''}`}</h2>
            <form action="" className="form form_type_redactor">
                <fieldset className="form__fieldset">
                    <label className="form__label">
                        <p className="form__option">Имя</p>
                        <input type="text" name="name" id="name" className="form__input" defaultValue={userInfo.data ? userInfo.data.name : ''} onChange={handleChange}></input>
                    </label>
                    <div className="form__line"></div>
                    <label className="form__label">
                        <p className="form__option">E-mail</p>
                        <input type="text" name="email" id="email" className="form__input" defaultValue={userInfo.data ? userInfo.data.email : ''} onChange={handleChange}></input>
                    </label>
                    <button className="form__submit" type="submit" onClick={patchProfile}>Редактировать</button>

                </fieldset>
            </form>
            <button className="redactor-form__logout" onClick={logout}>Выйти из аккаунта</button>
        </div>
    );
}

export default Profile;