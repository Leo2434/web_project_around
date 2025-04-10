import { handleTogglePopup } from "./utils.js";
const cardTemplate = document.querySelector(".template");
const imagePopup = document.querySelector("#image-popup");

export default class Card {
  constructor(name, link, handleCardClick) {
    this.name = name;
    this.link = link;
    this._handleCardClick = handleCardClick;
  }

  _setEventListeners() {
    this.card
      .querySelector(".card__like-btn")
      .addEventListener("click", function (evt) {
        evt.target.classList.toggle("card__black-like-btn");
      });

    this.card
      .querySelector(".card__trash-btn")
      .addEventListener("click", function (evt) {
        const cardItem = evt.target.closest(".card");
        cardItem.remove();
      });

    this.cardImage.addEventListener("click", (evt) => {
      this._handleCardClick(evt);
    });
  }

  _cloneTemplate() {
    return cardTemplate.cloneNode(true).content.querySelector(".card");
  }

  _generateCard() {
    this.card = this._cloneTemplate();

    this.cardName = this.card.querySelector(".card__name");
    this.cardName.textContent = this.name;

    this.cardImage = this.card.querySelector(".card__image");
    this.cardImage.src = this.link;
    this.cardImage.alt = this.name;

    this._setEventListeners();

    return this.card;
  }

  getHTMLCard() {
    return this._generateCard();
  }
}
