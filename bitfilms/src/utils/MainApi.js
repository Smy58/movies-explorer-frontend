import { apiUrl } from '../constants/constants';

class MainApi{
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

    patchUserInfo({ name, email }) {
        console.log("! " + name + " " + email);
        return fetch(`${this._baseUrl}/users/me`, {
            method: "PATCH",
            credentials: "include",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify({
                name,
                email,
            }),
        }).then((res) => {
            return res.json();
        })
    }
}

const apiMain = new MainApi({
    baseUrl: apiUrl,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }
})

export default apiMain;