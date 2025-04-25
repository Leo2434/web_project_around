import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(
    popupSelector,
    handleFormSubmit,
    { firstSelector, secondSelector }
  ) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._popupForm = this._popupElement.querySelector(".form");
    this._firstElement = this._popupForm.querySelector(firstSelector);
    this._secondElement = this._popupForm.querySelector(secondSelector);
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener(
      "submit",
      (evt) => {
        evt.preventDefault();
        this.renderLoading(true);
        const data = this._getInputValues();
        this._handleFormSubmit(data);
      },
      { once: true }
    );
  }

  _getInputValues() {
    return {
      firstInput: this._firstElement.value,
      secondInput: this._secondElement.value,
    };
  }

  close() {
    super.close();
    this._popupForm.reset();
  }

  setInputValues({ name, about }) {
    this._firstElement.value = name;
    this._secondElement.value = about;
  }
}
