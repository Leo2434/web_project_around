import api from "./Api.js";

export default class Card {
  constructor(name, link, id, isLiked, handleCardClick) {
    this.name = name;
    this.link = link;
    this.id = id;
    this.isLiked = isLiked;
    this._handleCardClick = handleCardClick;
    this._cardTemplate = document.querySelector(".template");
  }

  _like() {
    this.isLiked = !this.isLiked;
  }

  _setEventListeners() {
    this.card
      .querySelector(".card__like-btn")
      .addEventListener("click", (evt) => {
        if (!this.isLiked) {
          api
            .likeCard(this.id)
            .then((res) => {
              this._like();
              evt.target.classList.toggle("card__black-like-btn");
            })
            .catch((err) => console.log(err));
        } else {
          api
            .dislikeCard(this.id)
            .then((res) => {
              this._like();
              evt.target.classList.toggle("card__black-like-btn");
            })
            .catch((err) => console.log(err));
        }
      });

    this.card
      .querySelector(".card__trash-btn")
      .addEventListener("click", (evt) => {
        api
          .deleteCard(this.id)
          .then((res) => {
            // console.log("Carta eliminada:", res);
            const cardItem = evt.target.closest(".card");
            cardItem.remove();
          })
          .catch((err) => console.log(err));
      });

    this.cardImage.addEventListener("click", (evt) => {
      this._handleCardClick(evt);
    });
  }

  _cloneTemplate() {
    return this._cardTemplate.cloneNode(true).content.querySelector(".card");
  }

  _generateCard() {
    this.card = this._cloneTemplate();

    this.cardName = this.card.querySelector(".card__name");
    this.cardName.textContent = this.name;

    this.cardImage = this.card.querySelector(".card__image");
    this.cardImage.src = this.link;
    this.cardImage.alt = this.name;

    if (this.isLiked) {
      this.card
        .querySelector(".card__like-btn")
        .classList.toggle("card__black-like-btn");
    }

    this._setEventListeners();

    return this.card;
  }

  getHTMLCard() {
    return this._generateCard();
  }
}
