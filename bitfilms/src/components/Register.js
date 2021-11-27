import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logo.svg';
import * as auth from '../utils/auth.js';

class Register extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){

    }

    handleChange = (e) => {
        const {name, value} = e.target;
        this.setState({
          [name]: value
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state.password + " " + this.state.email + " " + this.state.name);
        auth.register(this.state.password, this.state.email, this.state.name).then((res) => {
          console.log(res);
          if(!res.error){
            this.props.history.push('/signin');
            this.props.onRegistered(true);
          }else{        
            this.props.onRegistered(false);
          }
          this.props.onInfoTooltip();
        });
    }

    render() {
        return (
            <div className="register">
                <div className="register-header">
                    <img src={logo} alt="Лого" className="logo"></img>
                    <h2 className="register-header__title">Добро пожаловать!</h2>
                </div>
                <form onSubmit={this.handleSubmit} className="form form_type_register">
                    <fieldset className="form__set">
                        <label className="form__field">Имя
                            <input id="name-input" name="name" className="form__input" type="text" placeholder="Название" onChange={this.handleChange} required minLength='2' maxLength='30'></input>
                            <span className='form__input-error' id='name-input-error'></span>
                        </label>
                        <label className="form__field">E-mail
                            <input id="email-input" name="email" className="form__input" type="email" placeholder="Email" onChange={this.handleChange} required></input>
                            <span className='form__input-error' id='email-input-error'></span>
                        </label>
                        <label className="form__field">Пароль
                            <input id="password-input" name="password" className="form__input" type="password" placeholder="Пароль" onChange={this.handleChange} required></input>
                            <span className='form__input-error' id='password-input-error'></span>
                        </label>
                        <button onSubmit={this.handleSubmit} className="form__submit" type="submit">Зарегистрироваться</button>
                    </fieldset>
                </form>
                <div className="register__signin">
                    <p>Уже зарегистрированы? <Link to="/signin" className="register__login-link">Войти</Link> </p>
                </div>
            </div>
        );
    }
}

export default Register;