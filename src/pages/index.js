import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import api from "../components/Api.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import PopupWithAvatar from "../components/PopupWithAvatar.js";
const profilePopup = document.querySelector("#profile-popup");
const cardPopup = document.querySelector("#card-popup");
const avatarPopup = document.querySelector("#avatar-popup");
const profileOpenBtn = document.querySelector("#profile-open-btn");
const cardOpenBtn = document.querySelector("#card-open-btn");
const avatarOpenBtn = document.querySelector("#avatar-open-btn");
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

const avatarPopupObj = new PopupWithAvatar(
  "#avatar-popup",
  (data) => {
    api
      .updateAvatar(data)
      .then((user) => {
        // console.log("Avatar actualizado:", user);
        userInfo.setUserAvatar(user.avatar);
      })
      .catch((err) => console.log(err))
      .finally((res) => {
        avatarPopupObj.close();
        avatarPopupObj.renderLoading(false);
      });
  },
  "#link-input"
);

avatarOpenBtn.addEventListener("click", () => {
  const formElement = avatarPopup.querySelector(settings.formSelector);
  const formValidator = new FormValidator(settings, formElement);
  formValidator.resetValidation();
  avatarPopupObj.open();
});

const profilePopupObj = new PopupWithForm(
  "#profile-popup",
  (data) => {
    api
      .updateUserInfo(data.firstInput, data.secondInput)
      .then((user) => {
        // console.log("Usuario actualizado: ", user);

        userInfo.setUserInfo({ name: user.name, about: user.about });
      })
      .catch((err) => console.log(err))
      .finally((res) => {
        profilePopupObj.close();
        profilePopupObj.renderLoading(false);
      });
  },
  { firstSelector: "#name-input", secondSelector: "#about-input" }
);

profileOpenBtn.addEventListener("click", function () {
  const currentUserInfo = userInfo.getUserInfo();
  profilePopupObj.setInputValues(currentUserInfo);

  const formElement = profilePopup.querySelector(settings.formSelector);
  const formValidator = new FormValidator(settings, formElement);
  formValidator.resetValidation();

  profilePopupObj.open();
});

const cardPopupObj = new PopupWithForm(
  "#card-popup",
  (data) => {
    api
      .createCard(data.firstInput, data.secondInput)
      .then((card) => {
        // console.log("Carta creada: ", card);

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
                  const imagePopupObj = new PopupWithImage("#image-popup", evt);
                  imagePopupObj.open();
                },
                (evt) => {
                  const confirmationPopup = new PopupWithConfirmation(
                    "#confirmation-popup",
                    (data) => {
                      api
                        .deleteCard(data.cardId)
                        .then((res) => {
                          const cardItem = data.evt.target.closest(".card");
                          cardItem.remove();
                        })
                        .catch((err) => console.log(err));
                    },
                    evt
                  );
                  confirmationPopup.open();
                }
              ).getHTMLCard();
              cardSection.addItem(objCard);
            },
          },
          cardsContainerSelector
        );
        cardSection.renderItems();
      })
      .catch((err) => console.log(err))
      .finally((res) => {
        cardPopupObj.close();
        cardPopupObj.renderLoading(false);
      });
  },
  {
    firstSelector: "#card-name-input",
    secondSelector: "#link-input",
  }
);

cardOpenBtn.addEventListener("click", function () {
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

const promises = [api.getUserInfo(), api.getInitialCards()];

api
  .confirmPromises(promises)
  .then((results) => {
    const user = results[0];
    const initialCards = results[1];
    userInfo.setUserInfo({ name: user.name, about: user.about });
    userInfo.setUserAvatar(user.avatar);
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
            },
            (evt) => {
              const confirmationPopup = new PopupWithConfirmation(
                "#confirmation-popup",
                (data) => {
                  api
                    .deleteCard(data.cardId)
                    .then((res) => {
                      const cardItem = data.evt.target.closest(".card");
                      cardItem.remove();
                    })
                    .catch((err) => console.log(err));
                },
                evt
              );
              confirmationPopup.open();
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
