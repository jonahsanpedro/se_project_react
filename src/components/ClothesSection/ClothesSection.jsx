import { useContext } from "react";
import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";

function ClothesSection({
  clothingItems,
  handleCardClick,
  handleAddClick,
  handleCardLike,
  isLoggedIn,
}) {
  const currentUser = useContext(CurrentUserContext);

  console.log("isLoggedIn:", isLoggedIn, "currentUser:", currentUser);

  return (
    <main className="clothes-section__user-container">
      <header className="clothes-section__header">
        <p className="clothes-section__title">Your Items</p>
        <button
          onClick={handleAddClick}
          type="button"
          className="clothes-section__add-new-btn"
        >
          + Add New
        </button>
      </header>
      <section className="clothes-section__cards-container">
        <section className="clothes-section__cards">
          <ul className="clothes-section__cards-list">
            {clothingItems
              .filter((filteredCard) => filteredCard.owner === currentUser._id)
              .map((filteredCard) => (
                <ItemCard
                  key={filteredCard._id}
                  item={filteredCard}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  isLoggedIn={isLoggedIn}
                />
              ))}
          </ul>
        </section>
      </section>
    </main>
  );
}

export default ClothesSection;
