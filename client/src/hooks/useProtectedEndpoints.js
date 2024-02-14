import { axiosProtected } from "../api/axios";
import useRefreshToken from "./useRefreshToken";
import useAuth from "./useAuth";
import { useEffect } from "react";

const useProtectedEndpoints = () => {
    const refresh = useRefreshToken();
    const { auth } = useAuth();

    useEffect(() => {

        const requestIntercept = axiosProtected.interceptors.request.use(
            config => {
                if (!config.headers['authorization'] ){
                    config.headers['authorization'] = `Bearer  ${auth?.data?.accessToken}`;
                    console.log("Initial request -\ntoken sent:", auth?.data?.accessToken);
                }
                return config;
            }, (error) => Promise.reject(error)
        );

        const responseIntercept = axiosProtected.interceptors.response.use(
            response => response,
            async (error) => {
                const prevRequest = error?.config;
                if (error?.response?.status === 403 && !prevRequest?.sent){
                    prevRequest.sent = true;
                    const newAccessToken = await refresh();
                    prevRequest.headers['authorization'] = `Bearer ${newAccessToken?.data?.accessToken}`;
                    console.log("Initial request failed -\ntrying again with new token:", newAccessToken?.data?.accessToken);
                    return axiosProtected(prevRequest);
                }
                return Promise.reject(error);
            }
        )

        return () => {
            axiosProtected.interceptors.request.eject(requestIntercept);
            axiosProtected.interceptors.response.eject(responseIntercept);
        }

    }, [auth, refresh])

    return axiosProtected;
}

export default useProtectedEndpoints;