import axios from 'axios';
const BASE_URL = 'http://127.0.0.1:8000/api'

export default axios.create({
    baseURL: BASE_URL
});

const userEmail = localStorage.getItem('email');

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { 
        'Content-Type': 'application/json',
        'email': userEmail
    },
    withCredentials: true
});