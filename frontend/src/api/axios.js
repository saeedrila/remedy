import axios from 'axios';
const BASE_URL = 'http://127.0.0.1:8000/api'

const setAuthHeaders = () => {
    const accessToken = localStorage.getItem('accessToken');
    const userEmail = localStorage.getItem('email');
  
    return {
      'Content-Type': 'application/json',
      ...(accessToken && { 'Authorization': `Bearer ${accessToken}` }),
      'email': userEmail,
    };
  };


export default axios.create({
    baseURL: BASE_URL,
    
});

const userEmail = localStorage.getItem('email');
console.log('Setting headers:', setAuthHeaders());
export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { 
        'Content-Type': 'application/json',
        'Authorization': setAuthHeaders(),
        'email': userEmail
    },
    withCredentials: true
});