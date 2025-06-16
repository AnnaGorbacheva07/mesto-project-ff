

// Функция, которая добавляет класс с ошибкой
const showInputError = (formElement, inputElement, errorMessage,config) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(config.inputErrorClass);
  // Показываем сообщение об ошибке
  errorElement.classList.add(config.errorClass);
  // Заменим содержимое span с ошибкой на переданный параметр
  errorElement.textContent = errorMessage;
};

// Функция, которая удаляет класс с ошибкой
const hideInputError = (formElement, inputElement,config) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(config.inputErrorClass);
  // Скрываем сообщение об ошибке
  errorElement.classList.remove(config.errorClass);
  // Очистим ошибку
  errorElement.textContent = "";
};

const checkInputValidity = (formElement, inputElement,config) => {
  if (inputElement.validity.patternMismatch) {
    // встроенный метод setCustomValidity принимает на вход строку
    // и заменяет ею стандартное сообщение об ошибке
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    // если передать пустую строку, то будут доступны
    // стандартные браузерные сообщения
    inputElement.setCustomValidity("");
  }
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage,config);
  } else {
    hideInputError(formElement, inputElement,config);
  }
};

// Функция принимает массив полей формы и возвращает true, если в нём хотя бы одно поле не валидно, и false, если все валидны.

const hasInvalidInput = (inputList) => {
  // проходим по этому массиву методом some
  return inputList.some((inputElement) => {
    // Если поле не валидно, колбэк вернёт true
    // Обход массива прекратится и вся функция
    // hasInvalidInput вернёт true

    return !inputElement.validity.valid;
  });
};
// Функция деактивации кнопки
function disableSubmitButton (buttonElement, config) {
  buttonElement.disabled = true;
    buttonElement.classList.add(config.inactiveButtonClass);
}

// Функция активации кнопки
function enableSubmitButton (buttonElement, config) {
  buttonElement.disabled = false;
    buttonElement.classList.remove(config.inactiveButtonClass);
}
// Функция переключает состояние кнопки

const toggleButtonState = (inputList, buttonElement,config) => {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
    disableSubmitButton(buttonElement, config);
  } else {
    // иначе сделай кнопку активной
    enableSubmitButton(buttonElement, config);
  }
};

const setEventListeners = (formElement,config) => {
  // Находим все поля внутри формы,
  // сделаем из них массив методом Array.from
  const inputList = Array.from(
    formElement.querySelectorAll(config.inputSelector)
  );
  const buttonElement = formElement.querySelector(config.submitButtonSelector);
  // Вызовем toggleButtonState, чтобы не ждать ввода данных в поля
  toggleButtonState(inputList, buttonElement,config);
  // Обойдём все элементы полученной коллекции
  inputList.forEach((inputElement) => {
    // каждому полю добавим обработчик события input
    inputElement.addEventListener("input", () => {
      // Внутри колбэка вызовем isValid,
      // передав ей форму и проверяемый элемент
      checkInputValidity(formElement, inputElement,config);
      // Вызовем toggleButtonState и передадим ей массив полей и кнопку
      toggleButtonState(inputList, buttonElement,config);
    });
  });
};
export const clearValidation = (formElement,config) => {
  const inputList = Array.from(
    formElement.querySelectorAll(config.inputSelector)
  );
  const buttonElement = formElement.querySelector(config.submitButtonSelector);

  // Очищаем все ошибки для всех инпутов
  inputList.forEach((input) => {
    hideInputError(formElement, input,config);
  });

  // Делаем кнопку неактивной
  disableSubmitButton(buttonElement, config);
};
export const enableValidation = (config) => {
  // Найдём все формы с указанным классом в DOM,
  // сделаем из них массив методом Array.from
  const formList = Array.from(document.querySelectorAll(config.formSelector));

  // Переберём полученную коллекцию 
  formList.forEach((formElement) => { 
    // Для каждой формы вызовем функцию setEventListeners, 
    // передав ей элемент формы 
    setEventListeners(formElement,config); 
  }); 
};
