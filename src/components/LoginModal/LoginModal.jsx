import { Link } from "react-router-dom";
import { useState } from "react";
import "./LoginModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const Login = ({ handleLogin, onClose, isOpen, handleRegistrationClick }) => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    console.log("handleSubmit called");
    console.log("data:", data);
    e.preventDefault();
    handleLogin(data);
  };

  const OnSwitch = () => {
    onClose();
    handleRegistrationClick();
  };

  return (
    <ModalWithForm
      title="Login"
      name="email"
      buttonText="Log in"
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      onSwitch={OnSwitch}
    >
      <div className="login">
        <label htmlFor="name">Email:</label>
        <input
          id="email"
          required
          name="email"
          type="email"
          value={data.email}
          onChange={handleChange}
          className="login__input"
          placeholder="Email"
        />
        <label htmlFor="password">Password:</label>
        <input
          id="password"
          required
          name="password"
          type="password"
          value={data.password}
          onChange={handleChange}
          className="login__input"
          placeholder="Password"
        />

        <div className="login__signup">
          <button onClick={OnSwitch} className="login__signup-link">
            or Sign up
          </button>
        </div>
      </div>
    </ModalWithForm>
  );
};

export default Login;
