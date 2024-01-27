import '../styles/home.css';
import '../styles/app.css';
import Navigation from '../components/Navigation';
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import CustomButton from '../components/CustomButton.jsx';
import useAuth from "../hooks/useAuth";

function Account() {
    const navigate = useNavigate();
    const {setAuth} = useAuth();

    const Logout = () => {
        setAuth({});
        navigate("/login");
    };

    return (
    <>
        <Navigation />
        <div className="account view">
            <CustomButton 
            content="Logga ut" 
            width="150px"
            onClick={Logout}
            />
        </div>
    </>
    );
}

export default Account;