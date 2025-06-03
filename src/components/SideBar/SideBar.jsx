import avatar from "/src/assets/avatar.svg";
import "./SideBar.css";

function SideBar() {
  const username = "Terrence Tegegne"; // This should ideally come from user context or props

  return (
    <div className="sidebar__user-container">
      <section className="sidebar__header">
        <img src={avatar} alt="Terrence Tegegne" className="sidebar__avatar" />
        <p className="sidebar__username">{username}</p>
      </section>
      <section className="sidebar__links"></section>
    </div>
  );
}

export default SideBar;
