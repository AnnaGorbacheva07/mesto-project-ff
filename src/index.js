import "./pages/index.css"; // добавьте импорт главного файла стилей
import { initialCards } from "./scripts/cards.js";
import { createCard, likedCard } from "./components/card.js";
import {
  openPopup,
  closePopup,
  handleOverlayClose,
  handleEscClose,
} from "./components/modal.js";
import { clearValidation, enableValidation } from "./components/validation.js";
import {
  getUserData,
  getCards,
  updateUserData,
  addNewCard,
  updateUserAvatar,
  deleteCard,
} from "./components/api.js";

///ПЕРЕМЕННЫЕ

//Создаём контейнер, в котором хранятся карточки.В нашем случае это <ul>//
const placesList = document.querySelector(".places__list");

//Плавное открытие попапа
const popups = document.querySelectorAll(".popup");
popups.forEach((popup) => {
  // Добавляем класс анимации единожды при инициализации
  popup.classList.add("popup_is-animated");
});

//ПЕРЕМЕННЫЕ ДЛЯ РАБОТЫ ПОПАПА "АВАТАР"
const avatarEditButton = document.querySelector(".profile__image-edit");
const popupAvatar = document.querySelector(".popup_type_avatar");
const avatarForm = document.querySelector('form[name="update-avatar"]');
const formAvatarInput = avatarForm.querySelector('input[name="avatar-link"]');
const profileImage = document.querySelector(".profile__image");

///ПЕРЕМЕННЫЕ ДЛЯ РАБОТЫ ПОПАПА "РЕДАКТИРОВАТЬ"
const editButton = document.querySelector(".profile__edit-button");
const popupEdit = document.querySelector(".popup_type_edit");

// Находим форму в DOM

const editFormElement = document.querySelector('form[name="edit-profile"]'); //форма
const editFormInput = editFormElement.querySelector(".popup__input"); //все инпуты в форме

// Находим поля формы в DOM
const formEditNameInput = document.querySelector('input[name="name"]');
const formEditJobInput = document.querySelector('input[name="description"]');

// Выбераем элементы, куда должны быть вставать значения полей
const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__description");

///ПЕРЕМЕННЫЕ ДЛЯ РАБОТЫ ПОПАПА "ДОБАВИТЬ"
const addButton = document.querySelector(".profile__add-button");
const popupNewcard = document.querySelector(".popup_type_new-card");

// Получаем элементы DOM
const popupNewCard = document.querySelector(".popup_type_new-card");
const formAddNewCard = document.querySelector('form[name="new-place"]');
const formAddNameCardInput = document.querySelector('input[name="place-name"]');
const formAddLinkInput = document.querySelector('input[name="link"]');
const saveButton = popupNewCard.querySelector(".popup__button");

///ПЕРЕМЕННЫЕ ДЛЯ РАБОТЫ ПОПАПА "КЛИК ПО ИЗОБРАЖЕНИЮ"
const popupImage = document.querySelector(".popup_type_image");
const imageElement = popupImage.querySelector(".popup__image");
const caption = popupImage.querySelector(".popup__caption");

// Получаем все кнопки закрытия попапов
const closeButtons = document.querySelectorAll(".popup__close");

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

//ВАЛИДАЦИЯ

// Настройки валидации
/*export */ const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

/*// Вынесем все необходимые элементы формы в константы
const form = document.querySelector(config.formSelector);
const formInput = form.querySelector(config.inputSelector);*/

/*// Выбираем элемент ошибки на основе уникального класса
const formError = form.querySelector(`.${formInput.id}-error`);
const buttonElement = form.querySelector(config.submitButtonSelector);*/

// Вызов функции
enableValidation(config);

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
//РАБОТА С ОТКРЫТЫМ ПОПАПОМ "АВАТАР"

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

// Открытие попапа для замены аватара
avatarEditButton.addEventListener("click", () => {
  openPopup(popupAvatar);
  clearValidation(popupAvatar, config);
  avatarForm.reset();
});
// Отправка формы обновления аватара
avatarForm.addEventListener("submit", handleAvatarFormSubmit);

//РАБОТА С ОТКРЫТЫМ ПОПАПОМ "РЕДАКТИРОВАТЬ"

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
            likes: newCard.likes,
          },
          deleteCard,
          likedCard,
          openImagePopup,
          newCard.owner
        );
        placesList.prepend(newCardElement);
        // Закрываем попап
        closePopup(popupNewCard);
        // Сброс формы
        formAddNewCard.reset();
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

// Загружаем данные параллельно при помощи метода Promise.all()
Promise.all([getUserData(), getCards()]).then(([user, cardList]) => {
  /*console.log(cardList);*/
  cardList.forEach(({ name, link, _id, owner, likes }) => {
    const newCard = createCard(
      { name, link, _id, owner, likes },
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
  /*const profileName = document.querySelector(".profile__title");
  const profileJob = document.querySelector(".profile__description");*/
  profileName.textContent = user.name;
  profileJob.textContent = user.about;
});
