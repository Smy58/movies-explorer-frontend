import React from 'react';
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Profile(props) {
    const userInfo = React.useContext(CurrentUserContext);
    const [sameValues, setSameValues] = React.useState(false);
    const defData = {name: (userInfo.data ? userInfo.data.name : ''), email: (userInfo.data ? userInfo.data.email : '')};
    const [data, setData] = React.useState(defData);

    const [errors, setErrors] = React.useState({});
    const [isValid, setIsValid] = React.useState(false);

    

    const reset = React.useCallback(
        (newValues = defData, newErrors = {}, newIsValid = false) => {
            setData(defData);
            setErrors(newErrors);
            setIsValid(newIsValid);
            
        },
        [setData, setErrors, setIsValid]
    );

    React.useEffect(() => reset({}), [reset, props.history]);

    function logout() {
        props.exit();
    }

    function handleChange (e) {
        const {name, value} = e.target;
        setData({ ...data, [name]: value });

        if (e.target.validity.patternMismatch) {
            name === "email" && e.target.setCustomValidity("Введите корректный email");
        } else {
            e.target.setCustomValidity("");
        }

        setData({ ...data, [name]: value });
        setErrors({ ...errors, [name]: e.target.validationMessage });
        setIsValid(e.target.closest("form").checkValidity());
    }

    function patchProfile(e) {
        e.preventDefault();
        
        props.editProfile(data.name, data.email);

        setSameValues(false);
    }

    function compareValues() {
        
        if (
            (userInfo.data.name !== data.name &&
            data.name !== undefined) ||
            (userInfo.data.email !== data.email &&
            data.email !== undefined)
        ) {
            setSameValues(true);
        } else {
            setSameValues(false);
        }
    }
    React.useEffect(() => {
        compareValues();
    }, [data]);


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
                    <button className={`${!isValid || !sameValues ? "form__submit_disabled" : "form__submit"}`} type="submit" onClick={patchProfile} disabled={ !isValid || !sameValues }> { !isValid || !sameValues ? "Редактировать" : "Сохранить"} </button>

                </fieldset>
            </form>
            <button className="redactor-form__logout" onClick={logout}>Выйти из аккаунта</button>
        </div>
    );
}

export default Profile;