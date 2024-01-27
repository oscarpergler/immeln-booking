import { useContext } from "react";
import AuthContext from "../context/AuthProvider";

/* 
    Not really a good example of the idea and how it is used,
    but I do this to limit the amount of exports required to use certain components.
    In this case it goes from 2 to 1 required imports to use the Auth context :^)
*/

const useAuth = () => {
    return useContext(AuthContext);
}

export default useAuth;