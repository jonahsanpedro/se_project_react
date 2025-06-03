import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";
import "./Profile.css";

function Profile({
  handleAddClick,
  weatherData,
  clothingItems,
  handleCardClick,
}) {
  return (
    <div className="profile">
      <SideBar />
      <ClothesSection
        weatherData={weatherData}
        clothingItems={clothingItems}
        handleCardClick={handleCardClick}
        handleAddClick={handleAddClick}
      />
    </div>
  );
}

export default Profile;
