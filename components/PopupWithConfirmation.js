import Popup from "./Popup.js";
export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, handleConfirmButton, buttonSelector, evt) {
    super(popupSelector);
    this._handleConfirmButton = handleConfirmButton;
    this._confirmButton = this._popupElement.querySelector(buttonSelector);
    this._evt = evt;
    this._popupForm = this._popupElement.querySelector(".form");
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener(
      "submit",
      (evt) => {
        evt.preventDefault();
        this._handleConfirmButton(this._evt);
        this.close();
      },
      { once: true }
    );
  }
}
