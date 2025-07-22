import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "./LoginModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { use } from "react";

const Login = ({
  handleLogin,
  onClose,
  isOpen,
  handleRegistrationClick,
  activeModal = "",
}) => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    setData({
      email: "",
      password: "",
    });
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
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
      buttonText="Log in"
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      onSwitch={OnSwitch}
      activeModal={activeModal}
      data={data}
    >
      <div className="login">
        <label htmlFor="login email">Email:</label>
        <input
          id="login email"
          required
          name="email"
          type="email"
          value={data.email}
          onChange={handleChange}
          className="login__input"
          placeholder="Email"
        />
        <label htmlFor="login password">Password:</label>
        <input
          id="login password"
          required
          name="password"
          type="password"
          value={data.password}
          onChange={handleChange}
          className="login__input"
          placeholder="Password"
        />
      </div>
    </ModalWithForm>
  );
};

export default Login;
