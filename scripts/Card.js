import imagePopup from "./index.js";
import { handleTogglePopup } from "./utils.js";
const cardTemplate = document.querySelector(".template");

export default class Card {
  constructor(name, link) {
    this.name = name;
    this.link = link;
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

    this.cardImage.addEventListener("click", function (evt) {
      const link = evt.target.parentElement.querySelector(".card__image").src;
      imagePopup.querySelector(".popup__expanded-image").src = link;

      const name =
        evt.target.parentElement.querySelector(".card__name").textContent;
      imagePopup.querySelector(".popup__image-name").textContent = name;

      handleTogglePopup(imagePopup);
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
