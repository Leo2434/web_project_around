// Busquemos el formulario en el DOM
let formElement = document.querySelector(".form");
let popup = document.querySelector(".popup");
let editProfileButton = document.querySelector(".profile__edit-button");
let closeProfileButton = document.querySelector(".form__close-button");

// Lo siguiente es el manipulador (handler) de entrega de formularios, aunque
// no se enviará en ningún sitio todavía

// Observa que el nombre de la función comienza con un verbo
// y describe exactamente lo que hace la función
function handleProfileFormSubmit(evt) {
  // Esta línea impide que el navegador
  // entregue el formulario en su forma predeterminada.
  evt.preventDefault();
  // Una vez hecho esto, podemos definir nuestra propia forma de entregar el formulario.
  // Lo explicaremos todo con más detalle después.

  // Busquemos los campos del formulario en el DOM
  let nameInput = formElement.querySelector(".form__input_el_name");
  let jobInput = formElement.querySelector(".form__input_el_about");

  // Obtén los valores de cada campo desde la propiedad de valor correspondiente
  let nameInputValue = nameInput.value;
  let jobInputValue = jobInput.value;
  // Selecciona los elementos donde se introducirán los valores de los campos
  let name = document.querySelector(".profile__name");
  let job = document.querySelector(".profile__description");
  // Inserta nuevos valores utilizando el textContent
  // propiedad del método querySelector()
  name.textContent = nameInputValue;
  job.textContent = jobInputValue;
  // Cierra el popup
  handleCloseProfilePopup();
}

function handleOpenProfilePopup() {
  let name = document.querySelector(".profile__name").textContent;
  let job = document.querySelector(".profile__description").textContent;
  formElement.querySelector(".form__input_el_name").value = name;
  formElement.querySelector(".form__input_el_about").value = job;
  popup.classList.add("popup_opened");
}

function handleCloseProfilePopup() {
  popup.classList.remove("popup_opened");
}

// Conecta el manipulador (handler) al formulario:
// se observará el evento de entrega
formElement.addEventListener("submit", handleProfileFormSubmit);
editProfileButton.addEventListener("click", handleOpenProfilePopup);
closeProfileButton.addEventListener("click", handleCloseProfilePopup);
