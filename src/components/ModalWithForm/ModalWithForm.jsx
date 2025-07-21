import close from "../../assets/closedark.svg";
import "./ModalWithForm.css";
import { useEffect, useRef } from "react";

function ModalWithForm({
  children,
  buttonText,
  title,
  isOpen,
  onClose,
  onSubmit,
  onSwitch,
  activeModal = "",
  data = {},
}) {
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

  const formRef = useRef(null);

  const isFormValid = () => {
    const form = formRef.current;
    if (!form) return false;
    return form.checkValidity();
  };

  return (
    <div
      className={`modal ${isOpen ? "modal_opened" : ""}`}
      onClick={handleBackdropClick}
    >
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button onClick={onClose} type="button" className="modal__close">
          <img src={close} alt="Close" className="modal__close-icon" />
        </button>
        <form onSubmit={onSubmit} className="modal__form" ref={formRef}>
          {children}
          <div className="modal__buttons">
            <button
              type="submit"
              className="modal__submit"
              disabled={!isFormValid()}
            >
              {buttonText}
            </button>
            {onSwitch && ["register", "login"].includes(activeModal) && (
              <button
                type="button"
                className="modal__switch"
                onClick={onSwitch}
              >
                {activeModal === "register" ? "or Log in" : "or Sign up"}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
