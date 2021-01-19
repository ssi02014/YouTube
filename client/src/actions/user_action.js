import axios from 'axios';
import { LOGIN_USER, REGISTER_USER, AUTH_USER } from './types';

//액션 생성 함수
export function loginUser(dataToSubmit) {

    const request = axios.post('/api/users/login', dataToSubmit)
        .then(response => response.data);

    return {
        type: LOGIN_USER,
        payload: request
    }
}

export function registerUser(dataToSubmit) {

    const request = axios.post('/api/users/register', dataToSubmit)
        .then(response => response.data);

    return {
        type: REGISTER_USER,
        payload: request
    }
}

//get 메서드이기 때문에 auth() 안에 파라미터 필요없음
export function auth() {
    const request = axios.get('/api/users/auth')
        .then(response => response.data);
    
    return {
        type: AUTH_USER,
        payload: request
    }
}