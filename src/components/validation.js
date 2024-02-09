

// Функция проверки валидности поля

const hasInvalidInput = (inputList) => {
  // проходим по этому массиву методом some
  return inputList.some((inputElement) => {
    // Если поле не валидно, колбэк вернёт true
    // Обход массива прекратится и вся функция
    // hasInvalidInput вернёт true

    return !inputElement.validity.valid;
  });
};

// Функция переключения сотояния кнопки

const toggleButtonState = (inputList, buttonElement, config) => {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
    buttonElement.disabled = true;
    buttonElement.classList.add(config.inactiveButtonClass);
  } else {
    // иначе сделай кнопку активной
    buttonElement.disabled = false;
    buttonElement.classList.remove(config.inactiveButtonClass);
  }
};

const showInputError = (formElement, inputElement, errorMessage, config) => {
  inputElement.classList.add(config.errorClass);

  const formError = formElement.querySelector(
    `.${inputElement.name}__input-error`
  );

  formError.textContent = errorMessage;
  formError.classList.add(config.inputErrorClass);
};

const hideInputError = (formElement, inputElement, config) => {
  inputElement.classList.remove(config.errorClass);

  const formError = formElement.querySelector(
    `.${inputElement.name}__input-error`
  );

  formError.classList.remove(config.inputErrorClass);
  formError.textContent = "";
};

const isValid = (formElement, inputElement, config) => {
  if (inputElement.validity.typeMismatch) {
    // встроенный метод setCustomValidity принимает на вход строку
    // и заменяет ею стандартное сообщение об ошибке
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else if (inputElement.validity.valueMissing) {
    inputElement.setCustomValidity("Вы пропустили это поле.");
  } else {
    // если передать пустую строку, то будут доступны
    // стандартные браузерные сообщения
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, config);
  } else {
    hideInputError(formElement, inputElement, config);
  }
};

const setEventListeners = (formElement, config) => {
  // Находим все поля внутри формы,
  // сделаем из них массив методом Array.from
  const inputList = Array.from(
    formElement.querySelectorAll(config.inputSelector)
  );

  const buttonElement = formElement.querySelector(config.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, config);
  // Обойдём все элементы полученной коллекции
  inputList.forEach((inputElement) => {
    // каждому полю добавим обработчик события input
    inputElement.addEventListener("input", () => {
      // Внутри колбэка вызовем isValid,
      // передав ей форму и проверяемый элемент
      isValid(formElement, inputElement, config);
      toggleButtonState(inputList, buttonElement, config);
    });
  });
};

export const clearValidation = (formElement, config) => {
  // очищает ошибки валидации формы и делает кнопку неактивной
  const inputList = Array.from(
    formElement.querySelectorAll(config.inputSelector)
  );
  const buttonElement = formElement.querySelector(
    config.submitButtonSelector
  );

  toggleButtonState(inputList, buttonElement, config);

  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, config);
  });
};

export const enableValidation = (config) => {
  // Найдём все формы с указанным классом в DOM,
  // сделаем из них массив методом Array.from
  const formList = Array.from(document.querySelectorAll(config.formSelector));

  // Переберём полученную коллекцию
  formList.forEach((formElement) => {
    // Для каждой формы вызовем функцию setEventListeners,
    // передав ей элемент формы
    // formElement.addEventListener('submit', function () {
    //   formElement.preventDefault();
    // })
    setEventListeners(formElement, config);
  });
};
