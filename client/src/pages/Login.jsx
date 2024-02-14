import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../api/axios";
import "../styles/authorization.css";
import { useAuth } from "../hooks/useAuth";
import { useAlert } from "../hooks/useAlert";

const Login = () => {

  const showAlert = useAlert();
  const {setAuth} = useAuth();
  const navigate = useNavigate();

  const handleError = (error) => {
    console.log(error);
    showAlert(`Error logging in (${error?.response?.statusText})`, 'error');
  }
  
  const handleSuccess = (data) => {
    showAlert(`Success! Welcome ${data?.data?.username}`, 'success');
    setAuth(data);
    setTimeout(() => {
      navigate("/");
    }, 2000);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(
      "/login",
      {
        ...inputValue,
      },
      { withCredentials: true }
    )
    .then(data => {
      handleSuccess(data);
    })
    .catch(error => {
      if (error?.response?.status === 400){
        console.log("400 - Bad request");
        handleError(error);
      }
      else if (error?.response?.status === 401){
        console.log("401 - Unauthorized");
        handleError(error);
      }
      else if (error?.response?.status === 500){
        console.log("500 - Internal server error");
        handleError(error);
      } else throw new Error(`${error}`)  
    })

    setInputValue({
      ...inputValue,
      email: "",
      password: "",
    });

  };

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
    </div>
  );
};

export default Login;