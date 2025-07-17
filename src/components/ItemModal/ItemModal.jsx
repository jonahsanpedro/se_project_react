import "./ItemModal.css";
import close from "../../assets/closedark.svg";
import { useEffect, useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";

function ItemModal({ isOpen, onClose, card, onDeleteItem, selectedCard }) {
  const currentUser = useContext(CurrentUserContext);

  const isOwn =
    currentUser && selectedCard && selectedCard.owner === currentUser._id;

  const itemDeleteButtonClassName = `modal__delete-button ${
    isOwn ? "" : "modal__delete-button-hidden"
  }`;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    if (!isOpen) return;

    const handleEscapeKey = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscapeKey);
    return () => document.removeEventListener("keydown", handleEscapeKey);
  }, [isOpen, onClose]);

  return (
    <div
      className={`modal ${isOpen ? "modal_opened" : ""}`}
      onClick={handleBackdropClick}
    >
      <div className="modal__content modal__content_type_image">
        <button onClick={onClose} type="button" className="modal__close">
          <img src={close} alt="Close" className="modal__close-icon" />
        </button>
        <img src={card.imageUrl} alt="garment image" className="modal__image" />
        <div className="modal__footer">
          <div>
            <h2 className="modal__caption">{card.name}</h2>
            <p className="modal__weather">Weather: {card.weather}</p>
          </div>
          <div>
            {isOwn && (
              <button
                onClick={() => onDeleteItem(card)}
                type="button"
                className={itemDeleteButtonClassName}
              >
                Delete item
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
