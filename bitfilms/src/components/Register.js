import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logo.svg';

function Register(props){
    const [val, setVal] = React.useState({ name: '', email: '', password: '' });
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

        if (e.target.validity.patternMismatch) {
            name === "email" && e.target.setCustomValidity("Введите корректный email");
        } else {
            e.target.setCustomValidity("");
        }

        setVal({ ...val, [name]: value });
        setErrors({ ...errors, [name]: e.target.validationMessage });
        setIsValid(e.target.closest("form").checkValidity());
    }

    function handleSubmit(e){
        e.preventDefault();
        console.log(val.password + " " + val.email + " " + val.name);
        props.onRegistered(val.name, val.email, val.password);
    }


    console.log(errors);
    return (
        <div className="register">
            <div className="register-header">
                <Link to="/"><img src={logo} alt="Лого" className="logo"></img></Link>
                <h2 className="register-header__title">Добро пожаловать!</h2>
            </div>
            <form onSubmit={handleSubmit} className="form form_type_register">
                <fieldset className="form__set">
                    <label className="form__field">Имя
                        <input id="name-input" name="name" className={`form__input ${errors.name ? "form__input_erfoc" : "form__input_foc"}`} type="text" placeholder="Название" onChange={handleChange} required minLength={2} maxLength={30}></input>
                        <span className='form__input-error' id='name-input-error'>{errors.name}</span>
                    </label>
                    <label className="form__field">E-mail
                        <input id="email-input" name="email" className={`form__input ${errors.email ? "form__input_erfoc" : "form__input_foc"}`} type="email" placeholder="Email" onChange={handleChange} required minLength={2} maxLength={30} pattern="^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$"></input>
                        <span className='form__input-error' id='email-input-error'>{errors.email}</span>
                    </label>
                    <label className="form__field">Пароль
                        <input id="password-input" name="password" className={`form__input ${errors.password ? "form__input_erfoc" : "form__input_foc"}`} type="password" placeholder="Пароль" onChange={handleChange} required minLength={3}></input>
                        <span className='form__input-error' id='password-input-error'>{errors.password}</span>
                    </label>
                    <button onSubmit={handleSubmit} className={`${!isValid ? "form__submit_disabled" : "form__submit"}`} type="submit">Зарегистрироваться</button>
                </fieldset>
            </form>
            <div className="register__signin">
                <p>Уже зарегистрированы? <Link to="/signin" className="register__login-link">Войти</Link> </p>
            </div>
        </div>
    );
}

export default Register;