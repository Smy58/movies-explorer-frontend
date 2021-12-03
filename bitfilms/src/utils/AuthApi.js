import { apiUrl } from '../constants/constants';

class AuthApi{
  constructor(options ){
    this._options = options;
    this._baseUrl = options.baseUrl;
    this._headers = {headers: options.headers};
    this._headersGet ={
        method: 'GET',
        headers: options.headers
    };
    this._headersPatch ={
        method: 'PATCH',
        headers: options.headers
    };
    this._headersPost ={
        method: 'POST',
        headers: options.headers
    };
    this._headersPut ={
        method: 'PUT',
        headers: options.headers
    };
    this._headersDelete ={
        method: 'DELETE',
        headers: options.headers
    };
  }

  register(password, email, name){
    return fetch(`${this._baseUrl}/signup`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email, password, name})
    })
    .then((res) => {
      return res.ok ? res.json() : Promise.reject(res);
    })
  }

  authorize(email, password){
    return fetch(`${this._baseUrl}/signin`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email, password})
    })
    .then((response => response.json()))
    .then((data) => {
  
      localStorage.setItem('token', data.token);
      localStorage.setItem('email', email);
      
      return data;
    });
  }

  checkToken (token) {
    console.log(token);
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      }
    })
    .then(res => res.json())
    .then(data => {
      return data;
    });
  }

}

const apiAuth = new AuthApi({
  baseUrl: apiUrl,
  headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
  }
})

export default apiAuth;