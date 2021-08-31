import React from 'react';
import logo from '../images/logo.svg';

function Login() {
    return (
        <div class="login">
            <div class="login-header">
                <img src={logo} alt="Лого" class="logo"></img>
                <h2 class="login-header__title">Добро пожаловать!</h2>
            </div>
            <form action="" class="form form_type_login">
                <fieldset class="form__set">
                    <label class="form__field">E-mail
                        <input id="email-input" name="email" class="form__input" type="email" placeholder="Email" required></input>
                        <span class='form__input-error' id='email-input-error'></span>
                    </label>
                    <label class="form__field">Пароль
                        <input id="password-input" name="password" class="form__input" type="password" placeholder="Пароль" required></input>
                        <span class='form__input-error' id='password-input-error'></span>
                    </label>
                    <button class="form__submit" type="submit">Войти</button>
                </fieldset>
            </form>
            <div class="register__signin">
                <p>Ещё не зарегистрированы? <a class="register__login-link">Регистрация</a> </p>
            </div>
        </div>  
    );
}

export default Login;