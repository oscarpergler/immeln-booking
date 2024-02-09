import { axiosProtected } from "../api/axios";
import { useRefreshToken } from "./useRefreshToken";
import { useAuth } from "./useAuth";
import { useEffect } from "react";

const useProtectedEndpoints = () => {
    const refresh = useRefreshToken();
    const auth = useAuth();

    useEffect(() => {

        const requestIntercept = axiosProtected.interceptors.request.use(
            config => {
                if (!config.headers['Authorization-token']){
                    config.headers['Authorization-token'] = `Bearer  ${auth}`;
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
                    prevRequest.headers['Authorization-token'] = `Bearer ${newAccessToken}`;
                    return axiosProtected(prevRequest);
                }
                return Promise.reject(error);
            }
        )

        return () => {
            axiosProtected.interceptors.eject(requestIntercept);
            axiosProtected.interceptors.eject(responseIntercept);
        }

    }, [auth, refresh])
}

export default useProtectedEndpoints;