export const BASE_URL = 'http://bitfilms.api.nomoredomains.monster';

export function patchUserInfo({ name, email }) {
    return fetch(`${BASE_URL}/users/me`, {
        method: "PATCH",
        credentials: "include",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
            name: name,
            email: email,
        }),
    }).then((res) => {
        return res.json();
    }).catch((err) => {
      console.log(`Ошибка регистрации ${err}`);
    });
}