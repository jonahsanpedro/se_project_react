import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";
import "./Profile.css";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";

function Profile({
  handleAddClick,
  weatherData,
  clothingItems,
  handleCardClick,
  handleEditProfile,
  onDeleteItem,
  handleCardLike,
  handleSignOut,
  isLoggedIn,
}) {
  const currentUser = useContext(CurrentUserContext);

  console.log(
    "Profile component mounted, token from localStorage:",
    localStorage.getItem("token")
  );

  return (
    <div className="profile">
      <SideBar
        currentUser={currentUser}
        handleEditProfile={handleEditProfile}
        handleSignOut={handleSignOut}
      />
      <ClothesSection
        weatherData={weatherData}
        clothingItems={clothingItems}
        handleCardClick={handleCardClick}
        handleAddClick={handleAddClick}
        onDeleteItem={onDeleteItem}
        handleCardLike={handleCardLike}
        isLoggedIn={isLoggedIn}
      />
    </div>
  );
}

export default Profile;
