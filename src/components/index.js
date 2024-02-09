import "./pages/index.css";
//import { initialCards } from "./scripts/cards.js";
import { createCard, deleteCard, likeCard } from ".card.js";
import { openPopup, closePopup } from "./modal.js";
import {
  enableValidation,
  clearValidation,
} from "./validation.js";
import {
  getUser,
  getCards,
  addCard,
  editAvatar,
  editUser,
} from "./api.js";

const placesList = document.querySelector(".places__list");
const avatarImg = document.querySelector(".profile__image");

// ВЫВОДИМ ДАННЫЕ ПОЛЬЗОВАТЕЛЯ, ВЫВОДИМ КАРТОЧКИ
Promise.all([getUser(), getCards()])
  .then(([userData, cardData]) => {
    profileName.textContent = userData.name;
    profileDescription.textContent = userData.about;
    avatarImg.style.backgroundImage = `url(${userData.avatar})`;

    cardData.forEach(function (elem) {
      placesList.append(
        createCard(
          elem,
          elem.name,
          elem.link,
          userData._id,
          deleteCard,
          likeCard,
          makeImagePopup
        )
      );
    });
  })
  .catch((err) => {
    console.log(err);
  });

// ПОПАПЫ

const popupForEdit = document.querySelector(".popup_type_edit");
const popupNewCard = document.querySelector(".popup_type_new-card");
const popupImage = document.querySelector(".popup_type_image");
const popupForAvatar = document.querySelector(".popup_type_avatar");

// КНОПКИ "СОХРАНИТЬ"

const editButtonText = popupForEdit.querySelector(".popup__button");
const newCardButtonText = popupNewCard.querySelector(".popup__button");
const avatarButtonText = popupForAvatar.querySelector(".popup__button");

// КНОПКИ ПОПАПОВ + СЛУШАТЕЛИ

const buttonProfEdit = document.querySelector(".profile__edit-button");
const buttonNewCard = document.querySelector(".profile__add-button");
const buttonAvatarEdit = document.querySelector(".profile__image");

buttonProfEdit.addEventListener("click", function () {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
  clearValidation(editFormElement, apiConfig);
  openPopup(popupForEdit);
});

buttonNewCard.addEventListener("click", () => openPopup(popupNewCard));
buttonAvatarEdit.addEventListener("click", () => openPopup(popupForAvatar));

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
const crossButtonAvatarEdit = document.querySelector(
  ".popup_type_avatar .popup__close"
);

crossButtonEdit.addEventListener("click", () => closePopup(popupForEdit));
crossButtonNewCard.addEventListener("click", () => closePopup(popupNewCard));
crossButtonImage.addEventListener("click", () => closePopup(popupImage));
crossButtonAvatarEdit.addEventListener("click", () =>
  closePopup(popupForAvatar)
);

// ФОРМА РЕДАКТИРОВАНИЯ ПРОФИЛЯ

const editFormElement = document.querySelector('[name="edit-profile"]');

const nameInput = editFormElement.querySelector('[name="name"]');
const jobInput = editFormElement.querySelector('[name="description"]');

const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

editFormElement.addEventListener("submit", profEditHandleFormSubmit);

function profEditHandleFormSubmit(evt) {
  editButtonText.textContent = "Сохранение...";
  evt.preventDefault();

  editUser({
    name: nameInput.value,
    about: jobInput.value,
  })
    .then((data) => {
      profileName.textContent = data.name;
      profileDescription.textContent = data.about;
      closePopup(popupForEdit);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      editButtonText.textContent = "Сохранить";
    });
}

// ФОРМА ДОБАВЛЕНИЯ КАРТОЧКИ

const addFormElement = document.querySelector('[name="new-place"]');
const titleValue = addFormElement.querySelector('[name="place-name"]');
const linkValue = addFormElement.querySelector('[name="link"]');

addFormElement.addEventListener("submit", newCardHandleFormSubmit);

function newCardHandleFormSubmit(evt) {
  newCardButtonText.textContent = "Сохранение...";
  evt.preventDefault();

  addCard({
    name: titleValue.value,
    link: linkValue.value,
  })
    .then((res) => {
      placesList.prepend(
        createCard(
          res,
          res.name,
          res.link,
          res.owner._id,
          deleteCard,
          likeCard,
          makeImagePopup
        )
      )
      closePopup(popupNewCard);
      addFormElement.reset();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      newCardButtonText.textContent = "Сохранить";
    });
  clearValidation(addFormElement, apiConfig);
  newCardButtonText.classList.add("popup__button_disabled");
}

// СОЗДАНИЕ ПОПАП-ИЗОБРАЖЕНИЯ

const imageForPopup = document.querySelector(".popup__image");
const placeForPopup = document.querySelector(".popup__caption");

function makeImagePopup(link, name) {
  imageForPopup.src = link;
  imageForPopup.alt = name;
  placeForPopup.textContent = name;
  openPopup(popupImage);
}

// ФОРМА РЕДАКТИРОВАНИЯ АВАТАРА

const editAvatarForm = document.querySelector('[name="edit-avatar"]');
const avatarLinkValue = editAvatarForm.querySelector('[name="link"]');

editAvatarForm.addEventListener("submit", editAvatarHandleFormSubmit);

function editAvatarHandleFormSubmit(evt) {
  avatarButtonText.textContent = "Сохранение...";
  evt.preventDefault();

  const link = { avatar: avatarLinkValue.value };

  editAvatar(link)
    .then((link) => {
      avatarImg.style.backgroundImage = `url(${link.avatar})`;
      closePopup(popupForAvatar);
      editAvatarForm.reset();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      avatarButtonText.textContent = "Сохранить";
    });
  clearValidation(editAvatarForm, apiConfig);
  avatarButtonText.classList.add("popup__button_disabled");
}

// ВЫЗЫВАЕМ ВАЛИДАЦИЮ

export const apiConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

enableValidation(apiConfig);
