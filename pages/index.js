import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import api from "../components/Api.js";
const profilePopup = document.querySelector("#profile-popup");
const cardPopup = document.querySelector("#card-popup");
const profileOpenBtn = document.querySelector("#profile-open-btn");
const cardOpenBtn = document.querySelector("#card-open-btn");
const cardsContainerSelector = ".cards__content";

const settings = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__submit-btn",
  inactiveButtonClass: "form__submit-btn_disabled",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error_visible",
};

const userInfo = new UserInfo({
  userNameSelector: ".profile__name",
  userAboutSelector: ".profile__about",
  userAvatarSelector: ".profile__avatar",
});

profileOpenBtn.addEventListener("click", function () {
  const profilePopupObj = new PopupWithForm(
    "#profile-popup",
    (data) => {
      api
        .updateUserInfo(data.firstInput, data.secondInput)
        .then((user) => {
          console.log("Usuario actualizado: ", user);

          userInfo.setUserInfo({ name: user.name, about: user.about });
        })
        .catch((err) => console.log(err));
    },
    { firstSelector: "#name-input", secondSelector: "#about-input" }
  );

  const currentUserInfo = userInfo.getUserInfo();
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
      api
        .createCard(data.firstInput, data.secondInput)
        .then((card) => {
          console.log("Carta creada: ", card);

          const cards = [
            {
              name: card.name,
              link: card.link,
              id: card._id,
              isLiked: card.isLiked,
            },
          ];
          const cardSection = new Section(
            {
              items: cards,
              renderer: (item) => {
                const objCard = new Card(
                  item.name,
                  item.link,
                  item.id,
                  item.isLiked,
                  (evt) => {
                    const imagePopupObj = new PopupWithImage(
                      "#image-popup",
                      evt
                    );
                    imagePopupObj.open();
                  }
                ).getHTMLCard();
                cardSection.addItem(objCard);
              },
            },
            cardsContainerSelector
          );
          cardSection.renderItems();
        })
        .catch((err) => console.log(err));
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

function startValidation(settings) {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));

  formList.forEach((formElement) => {
    const formValidator = new FormValidator(settings, formElement);
    formValidator.enableValidation();
  });
}

startValidation(settings);

api
  .getUserInfo()
  .then((user) => {
    // console.log(user);
    userInfo.setUserInfo({ name: user.name, about: user.about });
    userInfo.setUserAvatar(user.avatar);
  })
  .catch((err) => console.log(err));

api
  .getInitialCards()
  .then((initialCards) => {
    // console.log(initialCards);
    const cardSection = new Section(
      {
        items: initialCards,
        renderer: (item) => {
          const card = new Card(
            item.name,
            item.link,
            item._id,
            item.isLiked,
            (evt) => {
              const imagePopupObj = new PopupWithImage("#image-popup", evt);
              imagePopupObj.open();
            }
          ).getHTMLCard();
          cardSection.addItem(card);
        },
      },
      cardsContainerSelector
    );

    cardSection.renderItems();
  })
  .catch((err) => console.log(err));
