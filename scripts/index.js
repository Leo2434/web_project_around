const profilePopup = document.querySelector("#profile-popup");
// const cardPopup = document.querySelector("#card-popup");
const profileForm = document.querySelector("#profile-form");
// const cardForm = document.querySelector("#card-Form");
const openProfileButton = document.querySelector("#open-profile-button");
// const openCardButton = document.querySelector("#open-card-button");
const closeProfileButton = document.querySelector("#close-profile-button");
// const closeCardButton = document.querySelector("#close-card-button");
const cardTemplate = document.querySelector(".template");
const cardsContent = document.querySelector(".cards__content");

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
    createCard(item.name, item.link);
  });
}

function createCard(name, link) {
  const cardElement = cardTemplate
    .cloneNode(true)
    .content.querySelector(".card");
  const cardImage = cardElement.querySelector(".card__image");
  cardImage.src = link;
  cardImage.alt = name;
  cardElement.querySelector(".card__title").textContent = name;
  cardElement
    .querySelector(".card__like-button")
    .addEventListener("click", function (evt) {
      evt.target.classList.toggle("card__black-like-button");
    });
  // evt.target.style.backgroundImage = "url('../images/cards/black-like.svg')";
  // Esta forma funciona pero no permite volver a poner el corazon blanco

  cardImage.addEventListener("click", function () {
    handleOpenPopup(profilePopup); //cambiar para aparecer el popup de la imagen
  });
  cardsContent.prepend(cardElement);
}

function handleOpenPopup(popupElement) {
  popupElement.classList.add("popup_opened");
}

function handleClosePopup(popupElement) {
  popupElement.classList.remove("popup_opened");
}

openProfileButton.addEventListener("click", function () {
  let name = document.querySelector(".profile__name").textContent;
  let job = document.querySelector(".profile__description").textContent;
  profileForm.querySelector(".form__input_el_name").value = name;
  profileForm.querySelector(".form__input_el_about").value = job;
  handleOpenPopup(profilePopup);
});

// openCardButton.addEventListener("click", function () {
//   handleOpenPopup(popup);
// });

closeProfileButton.addEventListener("click", function () {
  handleClosePopup(profilePopup);
});

// closeCardButton.addEventListener("click", function () {
//   handleClosePopup(popup);
// });

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  let nameInput = profileForm.querySelector(".form__input_el_name").value;
  let jobInput = profileForm.querySelector(".form__input_el_about").value;

  document.querySelector(".profile__name").textContent = nameInput;
  document.querySelector(".profile__description").textContent = jobInput;

  handleClosePopup(profilePopup);
}

loadInitialCards(initialCards);
profileForm.addEventListener("submit", handleProfileFormSubmit);
