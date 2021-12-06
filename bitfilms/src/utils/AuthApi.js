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

  resCheck(res){
    return res.ok ? res.json() : Promise.reject(res);
  }

// {
//   method: 'POST',
//   headers: {
//     'Accept': 'application/json',
//     'Content-Type': 'application/json'
//   },
//   body: JSON.stringify({email, password, name})
// }

  register(password, email, name){
    let head = this._headersPost;
    head.body = JSON.stringify({email, password, name});
    return fetch(`${this._baseUrl}/signup`, head)
    .then((res) => {
      return this.resCheck(res);
    })
  }

  authorize(email, password){
    let head = this._headersPost;
    head.body = JSON.stringify({email, password});
    return fetch(`${this._baseUrl}/signin`, head)
    .then((res) => {
      return this.resCheck(res);
    })
    .then((data) => {
  
      localStorage.setItem('token', data.token);
      localStorage.setItem('email', email);
      
      return data;
    });
  }

  checkToken (token) {
    console.log(token);
    let head = this._headersGet;
    head.headers.authorization = `Bearer ${token}`;
    return fetch(`${this._baseUrl}/users/me`, head)
    .then((res) => {
      return this.resCheck(res);
    })
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