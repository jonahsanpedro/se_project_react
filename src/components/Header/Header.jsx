import { NavLink } from "react-router-dom";
import hamburger from "../../assets/hamburger.svg";
import { useContext } from "react";
import "./Header.css";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch.jsx";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";

function Header({
  handleAddClick,
  weatherData,
  handleRegistrationClick,
  handleLoginClick,
  isLoggedIn,
}) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  const currentUser = useContext(CurrentUserContext);

  const renderUserAvatar = () => {
    if (currentUser?.avatar) {
      return (
        <img
          src={currentUser.avatar}
          alt={currentUser.name}
          className="header__avatar"
        />
      );
    } else {
      const firstLetter = currentUser?.name?.charAt(0)?.toUpperCase() || "?";
      return <div className="header__avatar-placeholder">{firstLetter}</div>;
    }
  };

  return (
    <header className="header">
      <NavLink to="/" className="header__logo-link">
        <img className="header__logo" src={logo} alt="WTWR Logo" />
      </NavLink>
      <p className="header__date-and-location">
        {currentDate}, {weatherData.city}
      </p>
      <ToggleSwitch />
      {isLoggedIn && (
        <button
          onClick={handleAddClick}
          type="button"
          className="header__add-clothes-btn"
        >
          + Add clothes
        </button>
      )}

      <div className="header__user-section">
        {isLoggedIn ? (
          currentUser ? (
            <NavLink to="/profile" className="header__user-info">
              <span className="header__username">{currentUser.name}</span>
              {renderUserAvatar()}
            </NavLink>
          ) : (
            <div className="header__user-info">Loading...</div>
          )
        ) : (
          <div className="header__auth-buttons">
            <button
              onClick={handleRegistrationClick}
              type="button"
              className="header__register-btn"
            >
              Sign Up
            </button>
            <button
              onClick={handleLoginClick}
              type="button"
              className="header__login-btn"
            >
              Sign In
            </button>
          </div>
        )}
      </div>
      <button className="header__hamburger-btn">
        <img
          src={hamburger}
          alt="hamburger menu icon"
          className="hamburger__icon"
        />
      </button>
    </header>
  );
}

export default Header;
