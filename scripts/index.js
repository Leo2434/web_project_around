import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import {
  handleTogglePopup,
  handleProfileFormSubmit,
  handleCardFormSubmit,
} from "./utils.js";

export const cardsContent = document.querySelector(".cards__content");
export const profilePopup = document.querySelector("#profile-popup");
export const profileForm = document.querySelector("#profile-form");
export const cardPopup = document.querySelector("#card-popup");
export const cardForm = document.querySelector("#card-form");
const profileOpenBtn = document.querySelector("#profile-open-btn");
const profileCloseBtn = document.querySelector("#profile-close-btn");
const cardOpenBtn = document.querySelector("#card-open-btn");
const cardCloseBtn = document.querySelector("#card-close-btn");
const imagePopup = document.querySelector("#image-popup");
const imageCloseBtn = document.querySelector("#image-close-btn");
export default imagePopup;

const initialCards = [
  {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lake-louise.jpg",
  },
  {
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/latemar.jpg",
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lago.jpg",
  },
];

export const settings = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__submit-btn",
  inactiveButtonClass: "form__submit-btn_disabled",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error_visible",
};

profileOpenBtn.addEventListener("click", function () {
  const name = document.querySelector(".profile__name").textContent;
  const about = document.querySelector(".profile__about").textContent;
  profileForm.querySelector("#name-input").value = name;
  profileForm.querySelector("#about-input").value = about;
  handleTogglePopup(profilePopup);
});

cardOpenBtn.addEventListener("click", function () {
  handleTogglePopup(cardPopup);
});

profileCloseBtn.addEventListener("click", function () {
  handleTogglePopup(profilePopup);
});

cardCloseBtn.addEventListener("click", function () {
  cardForm.querySelector("#card-name-input").value = "";
  cardForm.querySelector("#link-input").value = "";

  handleTogglePopup(cardPopup);
});

imageCloseBtn.addEventListener("click", function () {
  handleTogglePopup(imagePopup);
});

document.addEventListener("keydown", function (event) {
  if (
    event.key === "Escape" &&
    imagePopup.classList.contains("popup__opened")
  ) {
    handleTogglePopup(imagePopup);
  } else if (
    event.key === "Escape" &&
    cardPopup.classList.contains("popup__opened")
  ) {
    handleTogglePopup(cardPopup);
  } else if (
    event.key === "Escape" &&
    profilePopup.classList.contains("popup__opened")
  ) {
    handleTogglePopup(profilePopup);
  }
});

const setPopupEventListeners = (settings) => {
  const popupList = Array.from(
    document.querySelectorAll(settings.popupSelector)
  );
  popupList.forEach((popupElement) => {
    // Cerrar cualquier formulario abierto al dar click en la superposición
    popupElement.addEventListener("click", function (evt) {
      // Verifica si el clic ocurrió fuera de la ventana modal
      if (evt.target.classList.contains(settings.popupOpenedClass)) {
        handleTogglePopup(evt.target);
      }
    });
  });
};

function loadInitialCards(initialCards) {
  initialCards.forEach(function (item) {
    const card = new Card(item.name, item.link);
    cardsContent.append(card.getHTMLCard());
  });
}

function startValidation(settings) {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));

  formList.forEach((formElement) => {
    const formValidator = new FormValidator(settings, formElement);
    formValidator.enableValidation();
  });
}

setPopupEventListeners({
  popupSelector: ".popup",
  popupOpenedClass: "popup__opened",
});
profileForm.addEventListener("submit", handleProfileFormSubmit);
cardForm.addEventListener("submit", handleCardFormSubmit);
loadInitialCards(initialCards);

startValidation(settings);
