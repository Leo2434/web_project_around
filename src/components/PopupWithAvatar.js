import Popup from "./Popup.js";

export default class PopupWithAvatar extends Popup {
  constructor(popupSelector, handleFormSubmit, linkSelector) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._popupForm = this._popupElement.querySelector(".form");
    this._linkElement = this._popupForm.querySelector(linkSelector);
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener(
      "submit",
      (evt) => {
        evt.preventDefault();
        this.renderLoading(true);
        const data = this._getInputValue();
        this._handleFormSubmit(data);
      },
      { once: true }
    );
  }

  _getInputValue() {
    return this._linkElement.value;
  }

  close() {
    super.close();
    this._popupForm.reset();
  }
}
