import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";

function ClothesSection({
  weatherData,
  clothingItems,
  handleCardClick,
  handleAddClick,
}) {
  return (
    <main className="clothessection__user-container">
      <header className="clothessection__header">
        <p className="clothessection__title">Your Items</p>
        <button
          onClick={handleAddClick}
          type="button"
          className="clothessection__add-new-btn"
        >
          + Add New
        </button>
      </header>
      <section className="clothessection__cards-container">
        <section className="clothessection__cards">
          <ul className="clothessection__cards-list">
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
