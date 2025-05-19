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

///Перебираем массив,создаем переменную карточки,вызывая функцию создания карточки и выводим на страницу ///
initialCards.forEach(({ name, link }) => {
  const card = createCard(
    { name, link },
    deleteCard,
    likedCard,
    openImagePopup
  );
  placesList.append(card);
});

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

//ЗАКРЫТИЕ И ОТКРЫТИЕ ПОПАПОВ

// Получаем все кнопки закрытия попапов
const closeButtons = document.querySelectorAll(".popup__close");
// Функция открытия попапа "редактировать"

// Добавляем обработчики событий
editButton.addEventListener("click", () => {
  setProfileInputs(); // заполняем попап данными
  openPopup(popupEdit); // открываем его
});

addButton.addEventListener("click", () => openPopup(popupNewcard));

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

const editFormElement = document.querySelector('form[name="edit-profile"]');

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

  // Вставляем новые значения с помощью textContent
  profileName.textContent = nameValue;
  profileJob.textContent = jobValue;

  //Сбрасываем
  formEditNameInput.value = "";
  formEditJobInput.value = "";
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
  const nameCardValue = formAddNameCardInput.value;
  const linkInputValue = formAddLinkInput.value;

  const newCardElement = createCard(
    { name: nameCardValue, link: linkInputValue },
    deleteCard,
    likedCard,
    openImagePopup
  );
  placesList.prepend(newCardElement);

  // Используем reset() для сброса формы
  formAddNewCard.reset();
  
  closePopup(popupNewCard);
});

// Функция для открытия изображения в попапе
function openImagePopup(src, name) {
  imageElement.src = src;
  imageElement.alt = name;
  caption.textContent = name;
  openPopup(popupImage);
}
