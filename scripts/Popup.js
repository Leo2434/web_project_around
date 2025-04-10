export default class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
  }

  open() {
    this._popupElement.classList.add("popup__opened");
    this.setEventListeners();
  }

  close() {
    this._popupElement.classList.remove("popup__opened");
    //eliminar detectores luego de cerrar el popup
    this._popupElement
      .querySelector(".popup__close")
      .removeEventListener("click", () => {
        this.close();
      });
    this._popupElement.removeEventListener("click", (evt) => {
      if (evt.target.classList.contains("popup__opened")) {
        this.close();
      }
    });
    document.removeEventListener("keydown", (evt) => {
      if (
        evt.key === "Escape" &&
        this._popupElement.classList.contains("popup__opened")
      ) {
        this.close();
      }
    });
  }

  setEventListeners() {
    this._popupElement
      .querySelector(".popup__close")
      .addEventListener("click", () => {
        this.close();
      });

    this._popupElement.addEventListener("click", (evt) => {
      // Verifica si el clic ocurrió fuera de la ventana modal
      if (evt.target.classList.contains("popup__opened")) {
        this.close();
      }
    });

    this._handleEscClose();
  }

  _handleEscClose() {
    document.addEventListener("keydown", (evt) => {
      if (
        evt.key === "Escape" &&
        this._popupElement.classList.contains("popup__opened")
      ) {
        this.close();
      }
    });
  }
}
