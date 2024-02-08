import "./pages/index.css";
//import { initialCards } from "./scripts/cards.js";
import { createCard, deleteCard, likeCard } from "./components/card.js";
import { openPopup, closePopup } from "./components/modal.js";
import {
  enableValidation,
  clearValidation,
  config,
} from "./components/validation.js";
import {
  getUser,
  getCards,
  addCard,
  editAvatar,
  editUser,
} from "./components/api.js";

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
  clearValidation(editFormElement, config);
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
    .then(() => {
      profileName.textContent = nameInput.value;
      profileDescription.textContent = jobInput.value;
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      editButtonText.textContent = "Сохранить";
    });

  closePopup(popupForEdit);
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
      );
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      newCardButtonText.textContent = "Сохранить";
    });

  closePopup(popupNewCard);

  addFormElement.reset();

  newCardButtonText.classList.add("popup__button_disabled");
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
      console.log(link.avatar);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      avatarButtonText.textContent = "Сохранить";
    });

  closePopup(popupForAvatar);

  editAvatarForm.reset();
  avatarButtonText.classList.add("popup__button_disabled");
}

// ВЫЗЫВАЕМ ВАЛИДАЦИЮ

enableValidation(config);
