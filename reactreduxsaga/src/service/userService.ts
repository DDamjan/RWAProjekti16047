
import { User } from '../models/user';

const baseURL = 'http://localhost:8080/users/';

export function dbRegisterUser(user: User) {
    const url = baseURL + 'register';

    return fetch(url, { method: "POST", body: JSON.stringify(user), headers: { "Content-Type": "application/json" } }).
        then(res => res.json());
}

export function dbAuthUser(username: string, password: string) {
    const url = baseURL + 'auth';
    const data = {
        username,
        password
    }

    return fetch(url, { method: "POST", body: JSON.stringify(data), headers: { "Content-Type": "application/json" } }).
        then(res => res.json());
}

export function dbGetUserByID(ID: number) {
    const url = baseURL + `?id=${ID}`;

    return fetch(url).
        then(res => res.json());
}