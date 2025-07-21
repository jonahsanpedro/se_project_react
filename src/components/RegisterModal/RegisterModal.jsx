import { Link } from "react-router-dom";
import { useState, useEffect, act } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./RegisterModal.css";
import { use } from "react";

const Register = ({
  handleRegistration,
  onClose,
  isOpen,
  handleLoginClick,
  activeModal = "",
}) => {
  const [data, setData] = useState({
    name: "",
    avatar: "",
    email: "",
    password: "",
  });

  const handleNameChange = (e) => {
    setData({ ...data, name: e.target.value });
  };

  const handleAvatarChange = (e) => {
    setData({ ...data, avatar: e.target.value });
  };

  const handleEmailChange = (e) => {
    setData({ ...data, email: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setData({ ...data, password: e.target.value });
  };

  useEffect(() => {
    setData({
      name: "",
      avatar: "",
      email: "",
      password: "",
    });
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegistration(data);
  };

  const onSwitch = () => {
    onClose();
    handleLoginClick();
  };

  return (
    <ModalWithForm
      title="Sign Up"
      name="email"
      password="password"
      buttonText="Sign up"
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      onSwitch={onSwitch}
      activeModal={activeModal}
      data={data}
    >
      <div className="register">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="Email"
          value={data.email}
          onChange={handleEmailChange}
          className="register__input"
          required
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Password"
          value={data.password}
          onChange={handlePasswordChange}
          className="register__input"
          required
        />
        <label htmlFor="name">Name</label>
        <input
          id="name"
          name="name"
          type="text"
          placeholder="Name"
          value={data.name}
          onChange={handleNameChange}
          className="register__input"
          required
        />
        <label htmlFor="avatar">Avatar URL:</label>
        <input
          id="avatar"
          name="avatar"
          type="url"
          placeholder="Avatar URL"
          value={data.avatar}
          onChange={handleAvatarChange}
          className="register__input"
          required
        />
      </div>
    </ModalWithForm>
  );
};

export default Register;
