const cardTemplate = document.querySelector(".template");
const cardsContent = document.querySelector(".cards__content");
const profilePopup = document.querySelector("#profile-popup");
const profileForm = document.querySelector("#profile-form");
const profileOpenBtn = document.querySelector("#profile-open-btn");
const profileCloseBtn = document.querySelector("#profile-close-btn");
const cardPopup = document.querySelector("#card-popup");
const cardForm = document.querySelector("#card-form");
const cardOpenBtn = document.querySelector("#card-open-btn");
const cardCloseBtn = document.querySelector("#card-close-btn");
const imagePopup = document.querySelector("#image-popup");
const imageCloseBtn = document.querySelector("#image-close-btn");

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

function loadInitialCards(initialCards) {
  initialCards.forEach(function (item) {
    const card = createCard(item.name, item.link);
    cardsContent.append(card);
  });
}

function createCard(title, link) {
  const cardElement = cardTemplate
    .cloneNode(true)
    .content.querySelector(".card");
  cardElement.querySelector(".card__title").textContent = title;
  const cardImage = cardElement.querySelector(".card__image");
  cardImage.src = link;
  cardImage.alt = title;
  cardElement
    .querySelector(".card__like-btn")
    .addEventListener("click", function (evt) {
      evt.target.classList.toggle("card__black-like-btn");
    });

  // evt.target.style.backgroundImage = "url('../images/cards/black-like.svg')";
  // Esta forma tambien funciona pero no permite alternar la url con cada click

  cardElement
    .querySelector(".card__trash-btn")
    .addEventListener("click", function (evt) {
      const cardItem = evt.target.closest(".card");
      cardItem.remove();
    });

  cardImage.addEventListener("click", function (evt) {
    const link = evt.target.parentElement.querySelector(".card__image").src;
    imagePopup.querySelector(".popup__expanded-image").src = link;

    const title =
      evt.target.parentElement.querySelector(".card__title").textContent;
    imagePopup.querySelector(".popup__image-title").textContent = title;

    handleTogglePopup(imagePopup);
  });
  return cardElement;
}

function handleTogglePopup(popupElement) {
  popupElement.classList.toggle("popup_opened");
}

profileOpenBtn.addEventListener("click", function () {
  const name = document.querySelector(".profile__name").textContent;
  const about = document.querySelector(".profile__about").textContent;
  profileForm.querySelector("#input-profile-name").value = name;
  profileForm.querySelector("#input-profile-about").value = about;
  handleTogglePopup(profilePopup);
});

profileCloseBtn.addEventListener("click", function () {
  handleTogglePopup(profilePopup);
});

cardOpenBtn.addEventListener("click", function () {
  handleTogglePopup(cardPopup);
});

cardCloseBtn.addEventListener("click", function () {
  cardForm.querySelector("#input-card-title").value = "";
  cardForm.querySelector("#input-card-link").value = "";
  handleTogglePopup(cardPopup);
});

imageCloseBtn.addEventListener("click", function () {
  handleTogglePopup(imagePopup);
});

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  const nameInput = profileForm.querySelector("#input-profile-name").value;
  const aboutInput = profileForm.querySelector("#input-profile-about").value;

  document.querySelector(".profile__name").textContent = nameInput;
  document.querySelector(".profile__about").textContent = aboutInput;

  handleTogglePopup(profilePopup);
}

function handleCardFormSubmit(evt) {
  evt.preventDefault();

  const titleInput = cardForm.querySelector("#input-card-title").value;
  const linkInput = cardForm.querySelector("#input-card-link").value;

  const card = createCard(titleInput, linkInput);
  cardsContent.prepend(card);

  handleTogglePopup(cardPopup);
}

loadInitialCards(initialCards);
profileForm.addEventListener("submit", handleProfileFormSubmit);
cardForm.addEventListener("submit", handleCardFormSubmit);
