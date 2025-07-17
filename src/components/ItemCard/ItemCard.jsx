import "./ItemCard.css";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";
import likebutton from "../../assets/likebutton.svg";

function ItemCard({ onCardClick, item, onCardLike }) {
  const handleCardClick = () => {
    onCardClick(item);
  };

  const currentUser = useContext(CurrentUserContext);

  console.log("Item data:", item);
  // Check if current user has liked this item
  const isLiked = item?.likes?.some((id) => id === currentUser._id) || false;

  // Handle like button click
  const handleLike = () => {
    onCardLike({ id: item._id, isLiked });
  };

  // Dynamic className for like button
  const itemLikeButtonClassName = `card__like-button ${
    isLiked ? "card__like-button_active" : ""
  }`;

  return (
    <li className="card">
      <h2 className="card__name">{item.name}</h2>
      <img
        onClick={handleCardClick}
        className="card__image"
        src={item.imageUrl}
        alt={item.name}
      />

      {currentUser && (
        <button className={itemLikeButtonClassName} onClick={handleLike}>
          <img src={likebutton} alt="Like button" />
        </button>
      )}
    </li>
  );
}

export default ItemCard;
