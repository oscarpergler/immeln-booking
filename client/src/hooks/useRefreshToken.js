import axios from "../api/axios";
import useAuth from  './useAuth';

const useRefreshToken = () => {

    const { setAuth } = useAuth();

    const refresh = async () => {
        const response = axios.get('/refresh', {
            withCredentials: true
        });
        setAuth(prev => {
            console.log(JSON.stringify(prev));
            console.log(response);
            return {...prev, accessToken: response}
        });
        return response;
    }

    return refresh;
}

export default useRefreshToken;