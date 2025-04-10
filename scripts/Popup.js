export default class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
  }

  open() {
    this._popupElement.classList.add("popup__opened");
    //llamar a agregar detector
    this.setEventListeners();
  }

  close() {
    this._popupElement.classList.remove("popup__opened");
    //eliminar el detector luego de cerrar el popup, remove eventlisteners, FALTA DE esc y somb
    this._popupElement
      .querySelector(".popup__close")
      .removeEventListener("click", () => {
        this.close();
      });
  }

  setEventListeners() {
    //agregar detector para cerrar el popup con boton
    this._popupElement
      .querySelector(".popup__close")
      .addEventListener("click", () => {
        this.close();
      });

    // this._handleEscClose();

    //agregar detector para cerrar el popup con area de sombreado
  }

  _handleEscClose() {
    //almacena la lógica para cerrar el popup al pulsar la tecla Esc
  }
}
