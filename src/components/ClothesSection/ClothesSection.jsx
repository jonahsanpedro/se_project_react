import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";

function ClothesSection({
  weatherData,
  clothingItems,
  handleCardClick,
  handleAddClick,
}) {
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
            {clothingItems.map((filteredCard) => (
              <ItemCard
                key={filteredCard._id}
                item={filteredCard}
                onCardClick={handleCardClick}
              />
            ))}
          </ul>
        </section>
      </section>
    </main>
  );
}

export default ClothesSection;
