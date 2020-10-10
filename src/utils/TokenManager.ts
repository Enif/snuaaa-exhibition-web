import Cookies from 'universal-cookie';
import axios from 'axios';

const cookies = new Cookies();

export function getToken() {
    return cookies.get('token');
}

export function setToken(token: string) {
    const cookieOption = {
        path: '/'
    }
    cookies.set('token', token, cookieOption);
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
}

export function removeToken() {
    cookies.remove('token', {
        path: '/'
    })
}