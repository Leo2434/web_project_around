import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import {
  handleTogglePopup,
  handleProfileFormSubmit,
  handleCardFormSubmit,
} from "./utils.js";
import Section from "./Section.js";
import PopupWithForm from "./PopupWithForm.js";
import PopupWithImage from "./PopupWithImage.js";
import UserInfo from "./UserInfo.js";

export const cardsContent = ".cards__content";
export const profilePopup = document.querySelector("#profile-popup");
export const profileForm = document.querySelector("#profile-form");
export const cardPopup = document.querySelector("#card-popup");
export const cardForm = document.querySelector("#card-form");
const profileOpenBtn = document.querySelector("#profile-open-btn");
// const profileCloseBtn = document.querySelector("#profile-close-btn");
const cardOpenBtn = document.querySelector("#card-open-btn");
// const cardCloseBtn = document.querySelector("#card-close-btn");
// const imagePopup = document.querySelector("#image-popup");
// const imageCloseBtn = document.querySelector("#image-close-btn");
// const nameInput = "#name-input";
// const aboutInput = "#about-input";

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

  //reset.validation SUPUESTAMENTE

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
        cardsContent
      );
      cardStn.renderItems();
    },
    {
      firstSelector: "#card-name-input",
      secondSelector: "#link-input",
    }
  );
  cardPopupObj.open();
});

document.addEventListener("keydown", function (event) {
  // if (
  //   event.key === "Escape" &&
  //   imagePopup.classList.contains("popup__opened")
  // ) {
  //   handleTogglePopup(imagePopup);
  // } else if (
  //   event.key === "Escape" &&
  //   cardPopup.classList.contains("popup__opened")
  // ) {
  //   handleTogglePopup(cardPopup);
  // } else if (
  //   event.key === "Escape" &&
  //   profilePopup.classList.contains("popup__opened")
  // ) {
  //   handleTogglePopup(profilePopup);
  // }
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
  cardsContent
);

function loadInitialCards() {
  // initialCards.forEach(function (item) {
  //   const card = new Card(item.name, item.link);
  //   cardsContent.append(card.getHTMLCard());
  // });
  //nuevo proceso con relaciones flexibles
  cardSection.renderItems();
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

loadInitialCards();

startValidation(settings);
