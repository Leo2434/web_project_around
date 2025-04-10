import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(
    popupSelector,
    handleFormSubmit,
    { firstSelector, secondSelector }
  ) {
    super(popupSelector);
    this._popupForm = this._popupElement.querySelector(".form");
    this._handleFormSubmit = handleFormSubmit;
    this._firstSelector = firstSelector;
    this._secondSelector = secondSelector;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      const data = this._getInputValues();
      this._handleFormSubmit(data);
      this.close();
    });
  }

  _getInputValues() {
    return {
      firstInput: this._popupForm.querySelector(this._firstSelector).value,
      secondInput: this._popupForm.querySelector(this._secondSelector).value,
    };
  }

  close() {
    super.close();
    this._popupForm.querySelector(this._firstSelector).value = "";
    this._popupForm.querySelector(this._secondSelector).value = "";
  }

  setInputValues({ userName, userAbout }) {
    this._popupForm.querySelector(this._firstSelector).value = userName;
    this._popupForm.querySelector(this._secondSelector).value = userAbout;
  }
}
