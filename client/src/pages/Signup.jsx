import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../api/axios";
import { useAlert } from "../hooks/useAlert";
import "../styles/authorization.css";

const Signup = () => {

  const showAlert = useAlert();
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
    username: "",
  });
  const { email, password, username } = inputValue;
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleError = (error) => {
    showAlert(`Error logging in (${error?.response?.statusText})`, 'error')
  }
    
  const handleSuccess = (data) => {
    console.log(data);
    showAlert(`Success! Enjoy your stay ${data?.data?.user?.username}`, 'success')
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(
      "/signup",
      {
        ...inputValue,
      },
      { withCredentials: true }
    )
    .then((data) => {
      handleSuccess(data);
      setTimeout(() => {
        navigate("/");
      }, 1000);
    })
    .catch((error) => {
      handleError(error);
    })
    setInputValue({
      ...inputValue,
      email: "",
      password: "",
      username: "",
    });
  };

  return (
    <div className="form_container">
      <h2>Skapa konto</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-field">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            placeholder="Enter your email"
            onChange={handleOnChange}
          />
        </div>
        <div className="input-field">
          <label htmlFor="email">Username</label>
          <input
            type="text"
            name="username"
            value={username}
            placeholder="Enter your username"
            onChange={handleOnChange}
          />
        </div>
        <div className="input-field">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            placeholder="Enter your password"
            onChange={handleOnChange}
          />
        </div>
        <button className="submit-button" type="submit">Skicka</button>
        <span>
          Har du redan ett konto? <Link to={"/login"}>Logga in</Link>
        </span>
      </form>
    </div>
  );
};

export default Signup;