import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";
import "./Profile.css";

function Profile({
  handleAddClick,
  weatherData,
  clothingItems,
  handleCardClick,
  currentUser,
  handleEditProfile,
  onDeleteItem,
  handleCardLike,
  handleSignOut,
}) {
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
      />
    </div>
  );
}

export default Profile;
