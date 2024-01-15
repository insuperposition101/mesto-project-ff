import "./pages/index.css";
import { initialCards } from "./scripts/cards.js";
import { createCard, deleteCard } from "./components/card.js";
import { openPopup, closePopup } from "./components/modal.js";

const placesList = document.querySelector(".places__list");

initialCards.forEach(function (elem) {
  placesList.append(createCard(elem.name, elem.link, deleteCard));
});

// ПОПАПЫ

const PopupForEdit = document.querySelector(".popup_type_edit");
const PopupNewCard = document.querySelector(".popup_type_new-card");
const PopupImage = document.querySelector(".popup_type_image");

// КНОПКИ ПОПАПОВ + СЛУШАТЕЛИ

const ButtonProfEdit = document.querySelector(".profile__edit-button");
const ButtonNewCard = document.querySelector(".profile__add-button");

ButtonProfEdit.addEventListener("click", () => openPopup(PopupForEdit));
ButtonNewCard.addEventListener("click", () => openPopup(PopupNewCard));

// КПОПКИ-КРЕСТИКИ И ИХ СЛУШАТЕЛИ

const CrossButtonEdit = document.querySelector(
  ".popup_type_edit .popup__close"
);
const CrossButtonNewCard = document.querySelector(
  ".popup_type_new-card .popup__close"
);
const CrossButtonImage = document.querySelector(
  ".popup_type_image .popup__close"
);

CrossButtonEdit.addEventListener("click", () => closePopup(PopupForEdit));
CrossButtonNewCard.addEventListener("click", () => closePopup(PopupNewCard));
CrossButtonImage.addEventListener("click", () => closePopup(PopupImage));

// ФОРМА РЕДАКТИРОВАНИЯ ПРОФИЛЯ

const formElement = document.querySelector('[name="edit-profile"]');

const nameInput = formElement.querySelector('[name="name"]');
const jobInput = formElement.querySelector('[name="description"]');

const ProfileName = document.querySelector(".profile__title");
const ProfileDescription = document.querySelector(".profile__description");

formElement.addEventListener("submit", handleFormSubmit);

function handleFormSubmit(evt) {
  evt.preventDefault();

  ProfileName.textContent = nameInput.value;
  ProfileDescription.textContent = jobInput.value;

  closePopup(PopupForEdit);
}

// ФОРМА ДОБАВЛЕНИЯ КАРТОЧКИ

const addFormElement = document.querySelector('[name="new-place"]');
const TitleValue = addFormElement.querySelector('[name="place-name"]');
const LinkValue = addFormElement.querySelector('[name="link"]');

addFormElement.addEventListener("submit", NewCardHandleFormSubmit);

function NewCardHandleFormSubmit(evt) {
  evt.preventDefault();

  const placeInput = TitleValue.value;
  const linkInput = LinkValue.value;

  placesList.prepend(createCard(placeInput, linkInput));

  closePopup(PopupNewCard);

  TitleValue.value = "";
  LinkValue.value = "";
}
