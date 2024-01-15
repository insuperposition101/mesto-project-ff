import { openPopup } from "./modal.js";

export function createCard(name, link, deleteCard) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const ButtonDelete = cardElement.querySelector(".card__delete-button");

  cardElement.querySelector(".card__image").src = link;
  cardElement.querySelector(".card__image").alt = name;
  cardElement.querySelector(".card__title").textContent = name;
  ButtonDelete.addEventListener("click", function (event) {
    deleteCard(event);
  });

  const imageButton = cardElement.querySelector(".card__image");
  const PopupImage = document.querySelector(".popup_type_image");
  imageButton.addEventListener("click", function () {
    const image = document.querySelector(".popup__image");
    const place = document.querySelector(".popup__caption");
    image.src = link;
    image.alt = name;
    place.textContent = name;
    openPopup(PopupImage);
  });

  const buttonLike = cardElement.querySelector(".card__like-button");
  buttonLike.addEventListener("click", likeCard);

  return cardElement;
}

export function deleteCard(event) {
  const listItem = event.target.closest(".card");
  listItem.remove();
}

function likeCard(event) {
  event.target.classList.toggle("card__like-button_is-active");
}
