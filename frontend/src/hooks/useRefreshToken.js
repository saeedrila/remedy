import axios from '../api/axios'
import useAuth from './useAuth'

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {

    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
      return null;
    }
    const response = await axios.post('/token/refresh/', {
      refresh: refreshToken,
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log("Response from useRefreshToken:", response.data);
    const accessToken = response?.data?.access;
    localStorage.setItem('accessToken', accessToken);
    setAuth(prev => {
      return {...prev, accessToken: response.data.accessToken}
    });
    return response.data.accessToken;
  }
  return refresh;
}

export default useRefreshToken