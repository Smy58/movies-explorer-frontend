export const BASE_URL = 'http://bitfilms.api.nomoredomains.monster';

export const register = (password, email, name) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email, password, name})
  })
  .then((response) => {
    return response.json();
  })
  .then((res) => {
    const ress = res;
    console.log(ress);
    return ress;
  })
  .catch((err) => console.log(err));
};

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email, password})
  })
  .then((response => response.json()))
  .then((data) => {
    console.log(data);

    localStorage.setItem('token', data.token);
    localStorage.setItem('email', email);
    
    return data;
  })
  .catch(err => console.log(err))
};

export const checkToken = (token) => {
  console.log(token);
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    }
  })
  .then(res => res.json())
  .then(data => data)
}
