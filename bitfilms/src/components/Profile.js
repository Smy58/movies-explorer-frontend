import React from 'react';

function Profile() {
    return (
        <div class="redactor-form">
            <h2 class="redactor-form__title">Привет, Виталий!</h2>
            <form action="" class="form form_type_redactor">
                <fieldset class="form__fieldset">
                    <label for="name" class="form__label">
                        <p class="form__option">Имя</p>
                        <input type="text" name="name" id="name" class="form__input" value="Виталий"></input>
                    </label>
                    <div class="form__line"></div>
                    <label for="email" class="form__label">
                        <p class="form__option">E-mail</p>
                        <input type="text" name="email" id="email" class="form__input" value="28092001i@gmail.com"></input>
                    </label>
                    <button class="form__submit" type="submit">Редактировать</button>

                </fieldset>
            </form>
            <button class="redactor-form__logout">Выйти из аккаунта</button>
        </div>
    );
}

export default Profile;