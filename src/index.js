import "./pages/index.css"; // добавьте импорт главного файла стилей
import { initialCards } from "./scripts/cards.js";
import { createCard, likedCard, deleteCard } from "./components/card.js";
import {
  openPopup,
  closePopup,
  handleOverlayClose,
  handleEscClose,
} from "./components/modal.js";

//Создаём контейнер, в котором хранятся карточки.В нашем случае это <ul>//
const placesList = document.querySelector(".places__list");

const popups = document.querySelectorAll(".popup");

popups.forEach((popup) => {
  // Добавляем класс анимации единожды при инициализации
  popup.classList.add("popup_is-animated");
});
//РАБОТА С API
//Информация о пользователе с сервера
const getUserData = () => {
  return fetch("https://mesto.nomoreparties.co/v1/wff-cohort-40/users/me", {
    method: "GET",
    headers: {
      Authorization: "d40019f3-d207-40df-a273-89cf4c1c6a66",
    },
  }).then((res) => res.json());
};

//запрос на массив карточек
const getCards = () => {
  return fetch("https://mesto.nomoreparties.co/v1/wff-cohort-40/cards", {
    headers: {
      Authorization: "d40019f3-d207-40df-a273-89cf4c1c6a66",
    },
  }).then((res) => res.json());
};

// Загружаем данные параллельно при помощи метода Promise.all()
await Promise.all([getUserData(), getCards()]).then(([user, cardList]) => {
  /*console.log(cardList);*/
  cardList.forEach(({ name, link, _id, owner }) => {
    const newCard = createCard(
      { name, link, _id, owner },
      deleteCard,
      likedCard,
      openImagePopup,
      user
    );
    placesList.append(newCard);
  });
  // Загружаем аватар
  const profileImage = document.querySelector(".profile__image");
  if (user.avatar) {
    profileImage.style.backgroundImage = `url(${user.avatar})`;
  }
  // Если аватар отсутствует
  else {
    profileImage.style.backgroundImage = "none";
  }
  //Данные профиля
  const profileName = document.querySelector(".profile__title");
  const profileJob = document.querySelector(".profile__description");
  profileName.textContent = user.name;
  profileJob.textContent = user.about;
});

const updateUserData = (newName, newAbout) => {
  return fetch("https://mesto.nomoreparties.co/v1/wff-cohort-40/users/me", {
    method: "PATCH",
    headers: {
      authorization: "d40019f3-d207-40df-a273-89cf4c1c6a66",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: newName,
      about: newAbout,
    }),
  }).then((res) => {
    if (!res.ok) {
      throw new Error("Ошибка обновления профиля");
    }
    return res.json();
  });
};

const addNewCard = (newNameCard, newLink) => {
  return fetch("https://mesto.nomoreparties.co/v1/wff-cohort-40/cards", {
    method: "POST",
    headers: {
      authorization: "d40019f3-d207-40df-a273-89cf4c1c6a66",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: newNameCard,
      link: newLink,
    }),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Ошибка при добавлении карточки: статус ${res.status}`);
      }
      return res.json();
    })
    .then((newCard) => {
      console.log("Новая карточка успешно добавлена:", newCard);
      return newCard;
    })
    .catch((error) => {
      console.error("Ошибка добавления карточки:", error);
      return null;
    });
};
//РАБОТА С ЛАЙКАМИ

//ЗАПРОСЫ ПУТ И ДЕЛИТ
export const putLike = (_id) => {
  return fetch(
    `https://mesto.nomoreparties.co/v1/wff-cohort-40/cards/likes/${_id}`,
    {
      method: "PUT",
      headers: {
        authorization: "d40019f3-d207-40df-a273-89cf4c1c6a66",
      },
    }
  )
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Ошибка при лайке карточки: статус ${res.status}`);
      }
      return res.json();
    })
    .catch((error) => {
      console.error("Ошибка при установке лайка:", error);
      return null;
    });
};
export const deleteLike = (_id) => {
  return fetch(
    `https://mesto.nomoreparties.co/v1/wff-cohort-40/cards/likes/${_id}`,
    {
      method: "DELETE",
      headers: {
        authorization: "d40019f3-d207-40df-a273-89cf4c1c6a66",
      },
    }
  )
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Ошибка при лайке карточки: статус ${res.status}`);
      }
      return res.json();
    })
    .catch((error) => {
      console.error("Ошибка при удалении лайка:", error);
      return null;
    });
};
///ОБНОВЛЕНИЕ АВАТАРКИ
///ЗАПРОС
const updateUserAvatar = (newAvatar) => {
  return fetch(
    "https://mesto.nomoreparties.co/v1/wff-cohort-40/users/me/avatar",
    {
      method: "PATCH",
      headers: {
        authorization: "d40019f3-d207-40df-a273-89cf4c1c6a66",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: newAvatar,
      }),
    }
  ).then((res) => {
    return res.json();
  });
};
///ФУНКЦИЯ

//Элементы для работы кнопки "аватар"
const avatarEditButton = document.querySelector(".profile__image-edit");
const popupAvatar = document.querySelector(".popup_type_avatar");
const avatarForm = document.querySelector('form[name="update-avatar"]');
const formAvatarInput = avatarForm.querySelector('input[name="avatar-link"]');
const profileImage = document.querySelector(".profile__image");

// Функция для изменения текста кнопки в зависимости от состояния загрузки
function renderLoading(
  isLoading,
  button,
  buttonText = "Сохранить",
  loadingText = "Сохранение..."
) {
  if (isLoading) {
    button.textContent = loadingText;
  } else {
    button.textContent = buttonText;
  }
}

// Обработчик отправки формы обновления аватара
function handleAvatarFormSubmit(evt) {
  evt.preventDefault();

  // Получаем значение из инпута
  const avatarLink = formAvatarInput.value;

  // Получаем кнопку отправки формы через event.submitter
  const submitButton = evt.submitter;
  // Сохраняем оригинальный текст кнопки
  const originalButtonText = submitButton.textContent;
  // Включаем индикацию загрузки
  renderLoading(true, submitButton, originalButtonText);

  // Отправляем запрос на сервер для обновления аватара
  updateUserAvatar(avatarLink)
    .then((userData) => {
      // Обновляем аватар на странице
      profileImage.style.backgroundImage = `url(${userData.avatar})`;
      // Закрываем попап
      closePopup(popupAvatar);
      // Сбрасываем форму
      avatarForm.reset();
    })
    .catch((err) => {
      console.error(`Ошибка обновлениz аватара: ${err}`);
    })
    .finally(() => {
      // Выключаем индикацию загрузки
      renderLoading(false, submitButton, originalButtonText);
    });
}

/* */
// Открытие попапа для замены аватара
avatarEditButton.addEventListener("click", () => {
  openPopup(popupAvatar);
  clearValidation(popupAvatar, config);
  avatarForm.reset();
});
// Отправка формы обновления аватара
avatarForm.addEventListener("submit", handleAvatarFormSubmit);

///Элементы для работы кнопки "редактировать"
const editButton = document.querySelector(".profile__edit-button");
const popupEdit = document.querySelector(".popup_type_edit");

///Элементы для работы кнопки "добавить"
const addButton = document.querySelector(".profile__add-button");
const popupNewcard = document.querySelector(".popup_type_new-card");

///Элементы для работы клика по изображению карточки
const popupImage = document.querySelector(".popup_type_image");
const imageElement = popupImage.querySelector(".popup__image");
const caption = popupImage.querySelector(".popup__caption");

//ВАЛИДАЦИЯ

// Настройки валидации
const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};
// Вынесем все необходимые элементы формы в константы
const form = document.querySelector(config.formSelector);
const formInput = form.querySelector(config.inputSelector);
// Выбираем элемент ошибки на основе уникального класса
const formError = form.querySelector(`.${formInput.id}-error`);
const buttonElement = form.querySelector(config.submitButtonSelector);

// Функция, которая добавляет класс с ошибкой
const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(config.inputErrorClass);
  // Показываем сообщение об ошибке
  errorElement.classList.add(config.errorClass);
  // Заменим содержимое span с ошибкой на переданный параметр
  errorElement.textContent = errorMessage;
};

// Функция, которая удаляет класс с ошибкой
const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(config.inputErrorClass);
  // Скрываем сообщение об ошибке
  errorElement.classList.remove(config.errorClass);
  // Очистим ошибку
  errorElement.textContent = "";
};

const checkInputValidity = (formElement, inputElement) => {
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
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
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
// Функция принимает массив полей ввода
// и элемент кнопки, состояние которой нужно менять

const toggleButtonState = (inputList, buttonElement) => {
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
const setEventListeners = (formElement) => {
  // Находим все поля внутри формы,
  // сделаем из них массив методом Array.from
  const inputList = Array.from(
    formElement.querySelectorAll(config.inputSelector)
  );
  const buttonElement = formElement.querySelector(config.submitButtonSelector);
  // Вызовем toggleButtonState, чтобы не ждать ввода данных в поля
  toggleButtonState(inputList, buttonElement);
  // Обойдём все элементы полученной коллекции
  inputList.forEach((inputElement) => {
    // каждому полю добавим обработчик события input
    inputElement.addEventListener("input", () => {
      // Внутри колбэка вызовем isValid,
      // передав ей форму и проверяемый элемент
      checkInputValidity(formElement, inputElement);
      // Вызовем toggleButtonState и передадим ей массив полей и кнопку
      toggleButtonState(inputList, buttonElement);
    });
  });
};

const enableValidation = (formElement) => {
  // Найдём все формы с указанным классом в DOM,
  // сделаем из них массив методом Array.from
  const formList = Array.from(document.querySelectorAll(config.formSelector));

  // Переберём полученную коллекцию
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    // Для каждой формы вызовем функцию setEventListeners,
    // передав ей элемент формы
    setEventListeners(formElement);
  });
};
// Вызовем функцию
enableValidation();

export const clearValidation = (formElement, config) => {
  const inputList = Array.from(
    formElement.querySelectorAll(config.inputSelector)
  );
  const buttonElement = formElement.querySelector(config.submitButtonSelector);

  // Очищаем все ошибки для всех инпутов
  inputList.forEach((input) => {
    hideInputError(formElement, input);
  });

  // Делаем кнопку неактивной
  buttonElement.disabled = true;
  buttonElement.classList.add(config.inactiveButtonClass);
};

//ЗАКРЫТИЕ И ОТКРЫТИЕ ПОПАПОВ

// Получаем все кнопки закрытия попапов
const closeButtons = document.querySelectorAll(".popup__close");
// Функция открытия попапа "редактировать"

// Добавляем обработчики событий
editButton.addEventListener("click", () => {
  setProfileInputs(); // заполняем попап данными
  openPopup(popupEdit); // открываем его
  clearValidation(popupEdit, config);
});

addButton.addEventListener("click", () => {
  openPopup(popupNewCard);
  clearValidation(popupNewCard, config);
  formAddNewCard.reset();
});

// Обработчик для всех кнопок закрытия попапов
closeButtons.forEach((button) => {
  //Цикл forEach проходит по всем кнопкам в массиве closeButtons.
  button.addEventListener("click", (event) => {
    //При нажатии на любую из этих кнопок выполняется анонимная функция
    const popup = event.target.closest(".popup"); //Находит ближайший родительский элемент с классом .popup от места, где был нажат элемент.
    if (popup) {
      closePopup(popup); //Если такой элемент найден (popup), вызывается функция closePopup(popup), чтобы закрыть попап.
    }
  });
});

//РАБОТА С ОТКРЫТЫМ ПОПАПОМ "РЕДАКТИРОВАТЬ"
// Находим форму в DOM

const editFormElement = document.querySelector('form[name="edit-profile"]'); //форма
const editFormInput = editFormElement.querySelector(".popup__input"); //все инпуты в форме

// Находим поля формы в DOM
const formEditNameInput = document.querySelector('input[name="name"]');
const formEditJobInput = document.querySelector('input[name="description"]');

// Выберите элементы, куда должны быть вставлены значения полей
const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__description");

function setProfileInputs() {
  // Заполняем поля формы текущими значениями
  formEditNameInput.value = profileName.textContent;
  formEditJobInput.value = profileJob.textContent;
}
/// Обработчик «отправки» формы

function handleProfileFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // Получаем значение полей jobInput и nameInput из свойства value
  const nameValue = formEditNameInput.value;
  const jobValue = formEditJobInput.value;
  //Сбрасываем
  formEditNameInput.value = "";
  formEditJobInput.value = "";
  // Получаем кнопку отправки формы через event.submitter
  const submitButton = evt.submitter;
  // Сохраняем оригинальный текст кнопки
  const originalButtonText = submitButton.textContent;
  // Включаем индикацию загрузки
  renderLoading(true, submitButton, originalButtonText);
  /*// Вставляем новые значения с помощью textContent
  profileName.textContent = nameValue;
  profileJob.textContent = jobValue;*/
  updateUserData(nameValue, jobValue)
    .then((updateUser) => {
      if (updateUser) {
        profileName.textContent = updateUser.name;
        profileJob.textContent = updateUser.about;
        console.log("Данные профиля успешно обновлены:", updateUser);
        closePopup(popupEdit);
        return updateUser;
      }
    })
    .catch((error) => {
      console.error("Произошла ошибка при обновлении профиля:", error);
    })
    .finally(() => {
      // Выключаем индикацию загрузки
      renderLoading(false, submitButton, originalButtonText);
    });
}

// Прикрепляем обработчик к форме, он будет следить за событием “submit” - «отправка»
editFormElement.addEventListener("submit", handleProfileFormSubmit);

//РАБОТА С ПОПАПОМ "ДОБАВИТЬ КАРТОЧКУ"

// Получаем элементы DOM
const popupNewCard = document.querySelector(".popup_type_new-card");
const formAddNewCard = document.querySelector('form[name="new-place"]');
const formAddNameCardInput = document.querySelector('input[name="place-name"]');
const formAddLinkInput = document.querySelector('input[name="link"]');
const saveButton = popupNewCard.querySelector(".popup__button");
// Обработчик события submit
formAddNewCard.addEventListener("submit", (evt) => {
  evt.preventDefault();
  //Получаем значения полей
  const nameCardValue = formAddNameCardInput.value;
  const linkInputValue = formAddLinkInput.value;
  // Получаем кнопку отправки формы через event.submitter
  const submitButton = evt.submitter;
  // Сохраняем оригинальный текст кнопки
  const originalButtonText = submitButton.textContent;
  // Включаем индикацию загрузки
  renderLoading(true, submitButton, originalButtonText);
  //вызываем функцию
  addNewCard(nameCardValue, linkInputValue)
    .then((newCard) => {
      if (newCard) {
        // Создаем элемент карточки только после успешного добавления
        const newCardElement = createCard(
          {
            name: newCard.name,
            link: newCard.link,
            _id: newCard._id,
            owner: newCard.owner._id,
          },
          deleteCard,
          likedCard,
          openImagePopup,
          newCard.owner
          /*handleLike,*/
        );
        placesList.prepend(newCardElement);

        // Сброс формы
        formAddNewCard.reset();

        // Закрываем попап
        closePopup(popupNewCard);
      }
    })
    .catch((error) => {
      console.error("Произошла ошибка при добавлении карточки:", error);
    })
    .finally(() => {
      // Выключаем индикацию загрузки
      renderLoading(false, submitButton, originalButtonText);
    });
});

// Функция для открытия изображения в попапе
function openImagePopup(src, name) {
  imageElement.src = src;
  imageElement.alt = name;
  caption.textContent = name;
  openPopup(popupImage);
}
