import axios from "../api/axios";
import { useAuth } from  './useAuth';

const useRefreshToken = () => {

    const {setAuth} = useAuth();

    const refresh = async () => {
        const response = await axios.get('/refresh', {
            withCredentials: true
        });
        setAuth(prev => {
            console.log("REFRESH - Previous token:", JSON.stringify(prev?.data?.accessToken));
            console.log("REFRESH - New token: ", response?.data?.accessToken);
            return {...prev, accessToken: response}
        });
        return response;
    }

    return refresh;
}

export default useRefreshToken;