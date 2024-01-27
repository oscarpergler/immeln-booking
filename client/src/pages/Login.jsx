import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../api/axios";
import "../styles/authorization.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useAuth from "../hooks/useAuth";

const Login = () => {

  const {setAuth} = useAuth();
  const navigate = useNavigate();

  // This code is unecessary as we don't need to rerender the app every time an input is made into the input-field
  // We only care about what is submitted, validation is handled by HTML.
  // ------------
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });
  const { email, password } = inputValue;
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };
  // ------------

  const handleError = (err) => {
    toast.error(err)
  }
  
  const handleSuccess = (msg) => {
    toast.success(msg)
    setTimeout(() => {
      navigate("/");
    }, 1000);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "/login",
        {
          ...inputValue,
        },
        { withCredentials: true }
      );
      const { success, message } = data;
      if (success) {
        setAuth(data.accessToken)
        console.log(data)
        console.log(data.accessToken)
        handleSuccess(message);
      } else {
        handleError(message);
      }
    } catch (error) {
      console.log(error);
    }
    setInputValue({
      ...inputValue,
      email: "",
      password: "",
    });
  };

  return (
    <div className="form_container">
      <h2>Logga in</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-field">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            placeholder="Enter your email"
            onChange={handleOnChange} // Not required
          />
        </div>
        <div className="input-field">
          <label htmlFor="password">Lösenord</label>
          <input
            type="password"
            name="password"
            value={password}
            placeholder="Enter your password"
            onChange={handleOnChange} // Not required
          />
        </div>
        <button className="submit-button" type="submit">Skicka</button>
        <span>
          Inget konto? <Link to={"/signup"}>Skapa konto</Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Login;