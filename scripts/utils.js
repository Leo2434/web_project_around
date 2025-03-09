import Card from "./Card.js";
import {
  cardsContent,
  profilePopup,
  profileForm,
  cardPopup,
  cardForm,
  settings,
} from "./index.js";
import FormValidator from "./FormValidator.js";

export function handleTogglePopup(popupElement) {
  if (
    !popupElement.classList.contains("popup__opened") &&
    popupElement.querySelector(settings.formSelector)
  ) {
    const formElement = popupElement.querySelector(settings.formSelector);
    const formValidator = new FormValidator(settings, formElement);
    formValidator.resetValidation();
  }
  popupElement.classList.toggle("popup__opened");
}

export function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  const nameInput = profileForm.querySelector("#name-input").value;
  const aboutInput = profileForm.querySelector("#about-input").value;

  document.querySelector(".profile__name").textContent = nameInput;
  document.querySelector(".profile__about").textContent = aboutInput;

  handleTogglePopup(profilePopup);
}

export function handleCardFormSubmit(evt) {
  evt.preventDefault();

  const cardNameInput = cardForm.querySelector("#card-name-input").value;
  const linkInput = cardForm.querySelector("#link-input").value;
  const card = new Card(cardNameInput, linkInput);
  cardsContent.prepend(card.getHTMLCard());

  cardForm.querySelector("#card-name-input").value = "";
  cardForm.querySelector("#link-input").value = "";
  handleTogglePopup(cardPopup);
}
