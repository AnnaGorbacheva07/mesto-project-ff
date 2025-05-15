// Получаем элемент методом querySelector и его содержимое свойством content
const cardTemplate = document.querySelector("#card-template").content;

//Создаём контейнер, в котором хранятся карточки.В нашем случае это <ul>//
const placesList = document.querySelector(".places__list");

// Функция создания карточки
function createCard({ name, link }, deleteCard) {
  // Клонируем содержимое тега template
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);

  // Находим и Устанавливаем значения элементов
  const deleteButton = cardElement.querySelector(".card__delete-button");
  cardElement.querySelector(".card__image").src = link;
  cardElement.querySelector(".card__title").textContent = name;
  cardElement.querySelector(".card__image").alt = name;

  // Добавляем обработчик клика на кнопку удаления и функцию удаления
  deleteButton.addEventListener("click", () => {
    deleteCard(cardElement);
  });
  return cardElement;
}

/// Функция удаления  карточки
function deleteCard(cardElement) {
  cardElement.remove();
}

///Перебираем массив,создаем переменную карточки,вызывая функцию создания карточки и выводим на страницу ///

initialCards.forEach(({ name, link }) => {
  const card = createCard({ name, link }, deleteCard);
  placesList.append(card);
});

/// ПР 6 спринт

///Получаем элементы DOM
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const image = document.querySelector(".card__image");
const popupEdit = document.querySelector(".popup_type_edit");
const popupNewcard = document.querySelector(".popup_type_new-card");
const popupImage = document.querySelector(".popup_type_image");
const closeButton = document.querySelector(".popup__close");

/// Функция открытия попапа
function openPopup(popup) {
  popup.classList.add("popup_is-opened");
  document.body.style.overflow = "hidden";
}

// Функция закрытия попапа
function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
  document.body.style.overflow = "auto";
}

// Добавляем обработчики событий
editButton.addEventListener("click", () => openPopup(popupEdit));
addButton.addEventListener("click", () => openPopup(popupNewcard));
image.addEventListener("click", () => openPopup(popupImage));

// Обработчик для кнопки закрытия попапа
closeButton.addEventListener("click", (event) => {
  const popup = event.target.closest(".popup");
  if (popup) {
    closePopup(popup);
  }
});

//Поиск родительского попапа: event.target указывает на элемент, по которому был произведен клик,
//closest('.popup') ищет ближайший родительский элемент с классом .popup. Это позволяет нам определить, какой именно попап нужно закрыть.
//Проверка наличия попапа if (popup) {
// Если попап найден, закрываем его. Если popup существует, то выполняем закрытие попапа.

import "./pages/index.css"; // добавьте импорт главного файла стилей
import { initialCards } from "./scripts/cards.js";

// Получаем элемент методом querySelector и его содержимое свойством content
const cardTemplate = document.querySelector("#card-template").content;

//Создаём контейнер, в котором хранятся карточки.В нашем случае это <ul>//
const placesList = document.querySelector(".places__list");
///Элементы для работы клика по изображению карточки
const popupImage = document.querySelector(".popup_type_image");
const imageElement = popupImage.querySelector(".popup__image");
const caption = popupImage.querySelector(".popup__caption");
// Функция создания карточки перенести в кард жс
function createCard({ name, link }, deleteCard, likedCard, openImagePopup) {
  // Клонируем содержимое тега template
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);

  // Находим и Устанавливаем значения элементов
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  cardElement.querySelector(".card__image").src = link;
  cardElement.querySelector(".card__title").textContent = name;
  cardElement.querySelector(".card__image").alt = name;
  const image = cardElement.querySelector(".card__image");

  // Добавляем обработчик клика на кнопку удаления и функцию удаления
  deleteButton.addEventListener("click", () => {
    deleteCard(cardElement);
  });
  //Обработчик лайка
  likeButton.addEventListener("click", () => {
    likedCard(event);
  });

  /// Открытие изображения в попапе
  image.addEventListener("click", () => {
    openImagePopup(link, name);
  });
  return cardElement;
}
//Функция лайка в кард жс
function likedCard(event) {
  /*// Получаем кнопку лайка
  const likeButton = cardElement.querySelector(".card__like-button");*/
  // Меняем состояние кнопки
  event.target.classList.toggle("card__like-button_is-active");
}
/// Функция удаления  карточки в кард жс
function deleteCard(cardElement) {
  cardElement.remove();
}

// Функция для открытия изображения в попапе в модал жс
function openImagePopup(src, name) {
  imageElement.src = src;
  imageElement.alt = name;
  caption.textContent = name;
  openPopup(popupImage);
}

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

/// ПР 6 спринт

//Получаем элементы DOM
///Элементы для работы кнопки "редактировать"
const editButton = document.querySelector(".profile__edit-button");
const popupEdit = document.querySelector(".popup_type_edit");

///Элементы для работы кнопки "добавить"
const addButton = document.querySelector(".profile__add-button");
const popupNewcard = document.querySelector(".popup_type_new-card");

//ЗАКРЫТИЕ И ОТКРЫТИЕ ПОПАПОВ

// Получаем все кнопки закрытия попапов
const closeButtons = document.querySelectorAll(".popup__close");

/// Функция открытия попапа в модал жс
function openPopup(popup) {
  popup.classList.add("popup_is-animated"); // Добавляем класс анимации
  popup.classList.add("popup_is-opened");
  document.body.style.overflow = "hidden";
  openForm();
}

// Функция закрытия попапа// в модал жс
function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
  // После завершения анимации (600мс) полностью скрываем попап
  setTimeout(() => {
    popup.classList.remove("popup_is-animated");
    document.body.style.overflow = "auto";
  }, 600);
} //Функция closePopup принимает один аргумент popup, который является элементом попапа.

// Добавляем обработчики событий
editButton.addEventListener("click", () => openPopup(popupEdit));
addButton.addEventListener("click", () => openPopup(popupNewcard));

// Обработчик для всех кнопок закрытия попапов
closeButtons.forEach((button) => {
  //Цикл forEach проходит по всем кнопкам в массиве closeButtons.
  button.addEventListener("click", (event) => {
    //При нажатии на любую из этих кнопок выполняется анонимная функция
    /*profileName.textContent != nameInput.value;
profileJob.textContent != jobInput.value; как сделать чтобы данные не сохранялись*/
    const popup = event.target.closest(".popup"); //Находит ближайший родительский элемент с классом .popup от места, где был нажат элемент.
    if (popup) {
      closePopup(popup); //Если такой элемент найден (popup), вызывается функция closePopup(popup), чтобы закрыть попап.
    }
  });
});

// Добавляем закрытие попапов по клику на оверлей КАК СДЕЛАТЬ ЧТОБЫ ТОЛЬКО ПО ЧЕРНОМУ ФОНУ
document.addEventListener("click", (event) => {
  const popup = event.target.closest(".popup");
  if (
    event.target.classList.contains("popup__close") ||
    event.target === popup
  ) {
    closePopup(popup);
  }
});

// Добавляем закрытие попапов по Esc
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    const popup = document.querySelector(".popup_is-opened");
    if (popup) {
      closePopup(popup);
    }
  }
});

//РАБОТА С ОТКРЫТЫМ ПОПАПОМ "РЕДАКТИРОВАТЬ"

// Находим форму в DOM
const formElement = document.querySelector(".popup__form");

// Находим поля формы в DOM
const nameInput = formElement.querySelector(".popup__input_type_name");
const jobInput = formElement.querySelector(".popup__input_type_description");

// Выберите элементы, куда должны быть вставлены значения полей
const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__description");

// Получаем начальные значения при загрузке страницы
const beginName = profileName.textContent;
const beginJob = profileJob.textContent;

// Функция открытия попапа "редактировать"
function openForm() {
  // Заполняем поля формы текущими значениями
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

// Обработчик «отправки» формы

function handleFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

  // Получаем значение полей jobInput и nameInput из свойства value
  const nameValue = nameInput.value;
  const jobValue = jobInput.value;

  // Вставляем новые значения с помощью textContent
  profileName.textContent = nameValue;
  profileJob.textContent = jobValue;

  // Сохраняем новые значения как начальные
  beginName = nameValue;
  beginJob = jobValue;

  //Сбрасываем
  nameInput.value = "";
  jobInput.value = "";
}

// Прикрепляем обработчик к формеб он будет следить за событием “submit” - «отправка»
formElement.addEventListener("submit", handleFormSubmit);

//РАБОТА С ПОПАПОМ "ДОБАВИТЬ КАРТОЧКУ"

// Получаем элементы DOM
const popupNewCard = document.querySelector(".popup_type_new-card");
const nameCardInput = popupNewCard.querySelector(
  ".popup__input_type_card-name"
);
const linkInput = popupNewCard.querySelector(".popup__input_type_url");
const saveButton = popupNewCard.querySelector(".popup__button");

// Обработчик события submit
popupNewCard.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const nameCardValue = nameCardInput.value;
  const linkInputValue = linkInput.value;

  const newCardElement = createCard(
    { name: nameCardValue, link: linkInputValue },
    deleteCard,
    likedCard,
    openImagePopup
  );
  document.querySelector(".places__list").prepend(newCardElement);

  nameCardInput.value = "";
  linkInput.value = "";
  closePopup(popupNewCard);
});
