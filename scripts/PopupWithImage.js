import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector, evt) {
    super(popupSelector);
    this._evt = evt;
  }

  open() {
    super.open();

    const link =
      this._evt.target.parentElement.querySelector(".card__image").src;
    this._popupElement.querySelector(".popup__expanded-image").src = link;

    const name =
      this._evt.target.parentElement.querySelector(".card__name").textContent;
    this._popupElement.querySelector(".popup__image-name").textContent = name;
  }
}
