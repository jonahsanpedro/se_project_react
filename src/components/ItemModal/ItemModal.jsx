import "./ItemModal.css";
import close from "../../assets/closewhite.svg";

function ItemModal({ isOpen, onClose, card, onDeleteItem }) {
  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
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
            <button
              onClick={() => onDeleteItem(card)}
              type="button"
              className="modal__delete-button"
            >
              Delete item
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
