import "./SideBar.css";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";
import { useContext } from "react";

function SideBar({ handleEditProfile, handleSignOut }) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <div className="sidebar">
      <div className="sidebar__user-container">
        <img
          className="sidebar__avatar"
          src={currentUser.avatar}
          alt={currentUser.name}
        />
        <p className="sidebar__username">{currentUser.name}</p>
      </div>
      <button className="sidebar__edit-button" onClick={handleEditProfile}>
        Change profile data
      </button>
      <button className="sidebar__signout-button" onClick={handleSignOut}>
        Sign out
      </button>
    </div>
  );
}

export default SideBar;
