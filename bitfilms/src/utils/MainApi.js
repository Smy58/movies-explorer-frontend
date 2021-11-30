export const BASE_URL = 'https://bitfilms.api.nomoredomains.monster';

export function patchUserInfo({ name, email }) {
    console.log("! " + name + " " + email);
    return fetch(`${BASE_URL}/users/me`, {
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