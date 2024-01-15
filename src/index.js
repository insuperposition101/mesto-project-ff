import "./pages/index.css";
import { initialCards } from "./scripts/cards.js";
import { createCard, deleteCard, likeCard } from "./components/card.js";
import { openPopup, closePopup } from "./components/modal.js";

const placesList = document.querySelector(".places__list");

initialCards.forEach(function (elem) {
  placesList.append(
    createCard(elem.name, elem.link, deleteCard, likeCard, makeImagePopup)
  );
});

// ПОПАПЫ

const popupForEdit = document.querySelector(".popup_type_edit");
const popupNewCard = document.querySelector(".popup_type_new-card");
const popupImage = document.querySelector(".popup_type_image");

// КНОПКИ ПОПАПОВ + СЛУШАТЕЛИ

const buttonProfEdit = document.querySelector(".profile__edit-button");
const buttonNewCard = document.querySelector(".profile__add-button");

buttonProfEdit.addEventListener("click", function () {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
  openPopup(popupForEdit);
});

buttonNewCard.addEventListener("click", () => openPopup(popupNewCard));

// КПОПКИ-КРЕСТИКИ И ИХ СЛУШАТЕЛИ

const crossButtonEdit = document.querySelector(
  ".popup_type_edit .popup__close"
);
const crossButtonNewCard = document.querySelector(
  ".popup_type_new-card .popup__close"
);
const crossButtonImage = document.querySelector(
  ".popup_type_image .popup__close"
);

crossButtonEdit.addEventListener("click", () => closePopup(popupForEdit));
crossButtonNewCard.addEventListener("click", () => closePopup(popupNewCard));
crossButtonImage.addEventListener("click", () => closePopup(popupImage));

// ФОРМА РЕДАКТИРОВАНИЯ ПРОФИЛЯ

const editFormElement = document.querySelector('[name="edit-profile"]');

const nameInput = editFormElement.querySelector('[name="name"]');
const jobInput = editFormElement.querySelector('[name="description"]');

const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

editFormElement.addEventListener("submit", profEditHandleFormSubmit);

function profEditHandleFormSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;

  closePopup(popupForEdit);
}

// ФОРМА ДОБАВЛЕНИЯ КАРТОЧКИ

const addFormElement = document.querySelector('[name="new-place"]');
const titleValue = addFormElement.querySelector('[name="place-name"]');
const linkValue = addFormElement.querySelector('[name="link"]');

addFormElement.addEventListener("submit", newCardHandleFormSubmit);

function newCardHandleFormSubmit(evt) {
  evt.preventDefault();

  const placeInput = titleValue.value;
  const linkInput = linkValue.value;

  placesList.prepend(
    createCard(placeInput, linkInput, deleteCard, likeCard, makeImagePopup)
  );

  closePopup(popupNewCard);

  addFormElement.reset();
}

// СОЗДАНИЕ ПОПАП-ИЗОБРАЖЕНИЯ

function makeImagePopup(link, name) {
  const popupImage = document.querySelector(".popup_type_image");

  const image = document.querySelector(".popup__image");
  const place = document.querySelector(".popup__caption");
  image.src = link;
  image.alt = name;
  place.textContent = name;
  openPopup(popupImage);
}
