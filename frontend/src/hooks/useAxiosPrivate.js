import { axiosPrivate } from "../api/axios";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import useAuth from "./useAuth";



const useAxiosPrivate = ()=> {
  const refresh = useRefreshToken();
  const { auth } = useAuth();

  useEffect(()=>{

    const responseIntercept = axiosPrivate.interceptors.request.use(
      config => {
        if(!config.headers['Authorization']){
          config.headers['Authorization'] = `Bearer ${auth?.newAccessToken}`;
          return axiosPrivate(prevRequest);
        }
        return Promise.reject(error);
      }
    )

    responseIntercept = axiosPrivate.interceptors.response.use(
      response => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 403 && !prevRequest?.sent){
          prevRequest.sent = True;
          const newAccessToken = await refresh();
          prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
          return axiosPrivate(prevRequest);
        }
      }
    );

    return ()=>{
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    }
  },[auth, refresh])

  return axiosPrivate;
}

export default useAxiosPrivate;