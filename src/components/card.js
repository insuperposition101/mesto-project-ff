export function createCard(name, link, deleteCard, likeCard, makeImagePopup) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  cardElement.querySelector(".card__image").src = link;
  cardElement.querySelector(".card__image").alt = name;
  cardElement.querySelector(".card__title").textContent = name;

  // КНОПКА УДАЛЕНИЯ
  const buttonDelete = cardElement.querySelector(".card__delete-button");
  buttonDelete.addEventListener("click", deleteCard);

  // КНОПКА-ИЗОБРАЖЕНИЕ
  const imageButton = cardElement.querySelector(".card__image");
  imageButton.addEventListener("click", function (event) {
    makeImagePopup(link, name);
  });

  // КНОПКА ЛАЙКА
  const buttonLike = cardElement.querySelector(".card__like-button");
  buttonLike.addEventListener("click", likeCard);

  return cardElement;
}

export function deleteCard(event) {
  const listItem = event.target.closest(".card");
  listItem.remove();
}

export function likeCard(event) {
  event.target.classList.toggle("card__like-button_is-active");
}
