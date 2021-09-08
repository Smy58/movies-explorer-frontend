import React from 'react';
import logo from '../images/logo.svg';

function Register(){
    return (
        <div class="register">
            <div class="register-header">
                <img src={logo} alt="Лого" class="logo"></img>
                <h2 class="register-header__title">Добро пожаловать!</h2>
            </div>
            <form action="" class="form form_type_register">
                <fieldset class="form__set">
                    <label class="form__field">Имя
                        <input id="name-input" name="name" class="form__input" type="text" placeholder="Название" required minlength='2' maxlength='30'></input>
                        <span class='form__input-error' id='name-input-error'></span>
                    </label>
                    <label class="form__field">E-mail
                        <input id="email-input" name="email" class="form__input" type="email" placeholder="Email" required></input>
                        <span class='form__input-error' id='email-input-error'></span>
                    </label>
                    <label class="form__field">Пароль
                        <input id="password-input" name="password" class="form__input" type="password" placeholder="Пароль" required></input>
                        <span class='form__input-error' id='password-input-error'></span>
                    </label>
                    <button class="form__submit" type="submit">Зарегистрироваться</button>
                </fieldset>
            </form>
            <div class="register__signin">
                <p>Уже зарегистрированы? <a class="register__login-link">Войти</a> </p>
            </div>
        </div>
    );
}

export default Register;