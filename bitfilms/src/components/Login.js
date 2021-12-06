import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logo.svg';
import apiAuth from '../utils/AuthApi.js';

function Login(props) {

    const [val, setVal] = React.useState({ email: '', password: '' });
    const [errors, setErrors] = React.useState({});
    const [isValid, setIsValid] = React.useState(false);

    const reset = React.useCallback(
        (newValues = {}, newErrors = {}, newIsValid = false) => {
            setVal(newValues);
            setErrors(newErrors);
            setIsValid(newIsValid);
        },
        [setVal, setErrors, setIsValid]
    );

    React.useEffect(() => reset({}), [reset]);
    
    function handleChange(e){
        const {name, value} = e.target;
        setVal({
            [name]: value
        });

        console.log("+ ", e.target.validity.patternMismatch);
        if (e.target.validity.patternMismatch) {
            if (name === "email" || name === "username"){
                e.target.setCustomValidity("Введите корректный email");
            }
        } else {
            e.target.setCustomValidity("");
        }

        setVal({ ...val, [name]: value });
        setErrors({ ...errors, [name]: e.target.validationMessage });
        setIsValid(e.target.closest("form").checkValidity());
    }

    function handleSubmit(e) {
        e.preventDefault();
        console.log(val);
        if (!val.username || !val.password){
            return;
        }
        props.handleLog(val.username, val.password);
        setVal({email: '', password: ''});
    
    }

    console.log(isValid);
    console.log(errors);

    return (
        <div className="login">
            <div className="login-header">
                <Link to="/"><img src={logo} alt="Лого" className="logo"></img></Link>
                <h2 className="login-header__title">Добро пожаловать!</h2>
            </div>
            <form onSubmit={handleSubmit} className="form form_type_login">
                <fieldset className="form__set">
                    <label className="form__field">E-mail
                        <input onChange={handleChange} id="email-input" name="username" className={`form__input ${errors.username ? "form__input_erfoc" : "form__input_foc"}`} type="email" placeholder="Email" required minLength={2} maxLength={30} pattern="^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$"></input>
                        <span className='form__input-error' id='email-input-error'>{errors.username}</span>
                    </label>
                    <label className="form__field">Пароль
                        <input onChange={handleChange} id="password-input" name="password" className={`form__input ${errors.password ? "form__input_erfoc" : "form__input_foc"}`} type="password" placeholder="Пароль" required minLength={3}></input>
                        <span className='form__input-error' id='password-input-error'>{errors.password}</span>
                    </label>
                    <button onSubmit={handleSubmit} className={`${!isValid ? "form__submit_disabled" : "form__submit"}`} type="submit" disabled={!isValid}>Войти</button>
                </fieldset>
            </form>
            <div className="register__signin">
                <p>Ещё не зарегистрированы? <Link to="/signup" className="register__login-link">Регистрация</Link> </p>
            </div>
        </div>  
    );
}

export default Login;