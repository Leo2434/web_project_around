import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import Section from "./Section.js";
import PopupWithForm from "./PopupWithForm.js";
import PopupWithImage from "./PopupWithImage.js";
import UserInfo from "./UserInfo.js";
export const profilePopup = document.querySelector("#profile-popup");
export const profileForm = document.querySelector("#profile-form");
export const cardPopup = document.querySelector("#card-popup");
export const cardForm = document.querySelector("#card-form");
const profileOpenBtn = document.querySelector("#profile-open-btn");
const cardOpenBtn = document.querySelector("#card-open-btn");
const cardsContainerSelector = ".cards__content";

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
  const userInfo = new UserInfo({
    userNameSelector: ".profile__name",
    userAboutSelector: ".profile__about",
  });

  const currentUserInfo = userInfo.getUserInfo();

  const profilePopupObj = new PopupWithForm(
    "#profile-popup",
    (data) => {
      userInfo.setUserInfo(data);
    },
    { firstSelector: "#name-input", secondSelector: "#about-input" }
  );

  profilePopupObj.setInputValues(currentUserInfo);

  const formElement = profilePopup.querySelector(settings.formSelector);
  const formValidator = new FormValidator(settings, formElement);
  formValidator.resetValidation();

  profilePopupObj.open();
});

cardOpenBtn.addEventListener("click", function () {
  const cardPopupObj = new PopupWithForm(
    "#card-popup",
    (data) => {
      const cards = [
        {
          name: data.firstInput,
          link: data.secondInput,
        },
      ];
      const cardStn = new Section(
        {
          items: cards,
          renderer: (item) => {
            const card = new Card(item.name, item.link, (evt) => {
              const imagePopupObj = new PopupWithImage("#image-popup", evt);
              imagePopupObj.open();
            }).getHTMLCard();
            cardStn.addItem(card);
          },
        },
        cardsContainerSelector
      );
      cardStn.renderItems();
    },
    {
      firstSelector: "#card-name-input",
      secondSelector: "#link-input",
    }
  );

  const formElement = cardPopup.querySelector(settings.formSelector);
  const formValidator = new FormValidator(settings, formElement);
  formValidator.resetValidation();

  cardPopupObj.open();
});

const cardSection = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = new Card(item.name, item.link, (evt) => {
        const imagePopupObj = new PopupWithImage("#image-popup", evt);
        imagePopupObj.open();
      }).getHTMLCard();
      cardSection.addItem(card);
    },
  },
  cardsContainerSelector
);

function loadInitialCards() {
  cardSection.renderItems();
}

function startValidation(settings) {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));

  formList.forEach((formElement) => {
    const formValidator = new FormValidator(settings, formElement);
    formValidator.enableValidation();
  });
}

loadInitialCards();

startValidation(settings);
