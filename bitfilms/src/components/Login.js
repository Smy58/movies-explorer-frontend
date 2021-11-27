import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logo.svg';
import * as auth from '../utils/auth.js';

class Login extends React.Component{
    constructor(props){
        super(props);
        this.state = {
          username: '',
          password: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    
    }
    handleChange = (e) => {
        const {name, value} = e.target;
        this.setState({
          [name]: value
        });
    }
    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state);
        if (!this.state.username || !this.state.password){
            return;
        }
    
        auth.authorize(this.state.username, this.state.password)
        .then((data) => {
            //console.log(data.message);
            if (!data.message){
                this.setState({email: '', password: ''} ,() => {
                    this.props.handleLogin();
                    this.props.history.push('/movies');
                })
            }else{
                this.props.onRegistered(false);
                this.props.onInfoTooltip();
            }
        })
        .catch(err => console.log(err));
    
    }

    render() {
        return (
            <div className="login">
                <div className="login-header">
                    <img src={logo} alt="Лого" className="logo"></img>
                    <h2 className="login-header__title">Добро пожаловать!</h2>
                </div>
                <form onSubmit={this.handleSubmit} className="form form_type_login">
                    <fieldset className="form__set">
                        <label className="form__field">E-mail
                            <input onChange={this.handleChange} id="email-input" name="username" className="form__input" type="email" placeholder="Email" required></input>
                            <span className='form__input-error' id='email-input-error'></span>
                        </label>
                        <label className="form__field">Пароль
                            <input onChange={this.handleChange} id="password-input" name="password" className="form__input" type="password" placeholder="Пароль" required></input>
                            <span className='form__input-error' id='password-input-error'></span>
                        </label>
                        <button onSubmit={this.handleSubmit} className="form__submit" type="submit">Войти</button>
                    </fieldset>
                </form>
                <div className="register__signin">
                    <p>Ещё не зарегистрированы? <Link to="/signup" className="register__login-link">Регистрация</Link> </p>
                </div>
            </div>  
        );
}
}

export default Login;