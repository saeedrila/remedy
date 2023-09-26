import axios from '../api/axios'
import useAuth from './useAuth'

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const response = await axios.post('/token/refresh/', {
      refresh: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTY5NTg0NzE4MiwiaWF0IjoxNjk1NzYwNzgyLCJqdGkiOiI4YzFiMzk5OWYzYWY0ODk5YTI3YzUwZmYzNDZmZmVjZCIsInVzZXJfaWQiOjI1fQ.SCB5a_7TQ2RYUVQUQUgFjP9KH1jh_JcRyWvLcRAYOGw',
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    setAuth(prev => {
      console.log("Prev:", JSON.stringify(prev));
      console.log("Response.data.access:", response.data.access);
      return {...prev, accessToken: response.data.accessToken}
    });
    return response.data.accessToken;
  }
  return refresh;
}

export default useRefreshToken