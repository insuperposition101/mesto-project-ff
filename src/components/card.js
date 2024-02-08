import { deleteCardApi, likeCardApi, unlikeCardApi } from "./api.js";

export function createCard(
  card,
  name,
  link,
  userDataId,
  deleteCard,
  likeCard,
  makeImagePopup
) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  cardElement.querySelector(".card__image").src = link;
  cardElement.querySelector(".card__image").alt = name;
  cardElement.querySelector(".card__title").textContent = name;

  // КНОПКА УДАЛЕНИЯ
  const buttonDelete = cardElement.querySelector(".card__delete-button");

  if (userDataId === card.owner._id) {
    buttonDelete.addEventListener("click", function () {
      deleteCard(card._id, cardElement);
    });
  } else {
    buttonDelete.remove();
  }

  // КНОПКА-ИЗОБРАЖЕНИЕ
  const imageButton = cardElement.querySelector(".card__image");
  imageButton.addEventListener("click", function (event) {
    makeImagePopup(link, name);
  });

  // КНОПКА ЛАЙКА
  const buttonLike = cardElement.querySelector(".card__like-button");

  const likesContainer = cardElement.querySelector(".likes-counter");
  likesContainer.textContent = card.likes.length;

  if (card.likes.some((likeOwner) => likeOwner._id === userDataId)) {
    buttonLike.classList.add("card__like-button_is-active");
  }

  buttonLike.addEventListener("click", function () {
    likeCard(buttonLike, card._id, likesContainer);
  });

  return cardElement;
}

export function deleteCard(id, cardElement) {
  deleteCardApi(id)
    .then(() => {
      cardElement.remove();
    })
    .catch((err) => {
      console.log(err);
    });
}

export function likeCard(likeButton, cardId, likesContainer) {
  if (!likeButton.classList.contains("card__like-button_is-active")) {
    likeCardApi(cardId)
      .then((card) => {
        console.log(card);
        likesContainer.textContent = card.likes.length;
        likeButton.classList.add("card__like-button_is-active");
      })
      .catch((err) => {
        console.log(err);
      });
  } else if (likeButton.classList.contains("card__like-button_is-active")) {
    unlikeCardApi(cardId)
      .then((card) => {
        likesContainer.textContent = card.likes.length;
        likeButton.classList.remove("card__like-button_is-active");
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
