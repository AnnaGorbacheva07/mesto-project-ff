/*console.log("Hello, World!");
const numbers = [2, 3, 5];

// Стрелочная функция. Не запнётся ли на ней Internet Explorer?
const doubledNumbers = numbers.map((number) => number * 2);

console.log(doubledNumbers); // 4, 6, 10*/

import "./pages/index.css"; // добавьте импорт главного файла стилей
import { initialCards } from "./scripts/cards.js";

// Получаем элемент методом querySelector и его содержимое свойством content
const cardTemplate = document.querySelector("#card-template").content;

//Создаём контейнер, в котором хранятся карточки.В нашем случае это <ul>//
const placesList = document.querySelector(".places__list");

// Функция создания карточки
function createCard({ name, link }, deleteCard, likedCard) {

  // Клонируем содержимое тега template
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);

  // Находим и Устанавливаем значения элементов
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton=cardElement.querySelector(".card__like-button");
  cardElement.querySelector(".card__image").src = link;
  cardElement.querySelector(".card__title").textContent = name;
  cardElement.querySelector(".card__image").alt = name;

  // Добавляем обработчик клика на кнопку удаления и функцию удаления
  deleteButton.addEventListener("click", () => {
    deleteCard(cardElement);
  
  });
//Обработчик лайка
likeButton.addEventListener("click", () => {
  likedCard(cardElement);
});
  return cardElement;
}
//Функция лайка
function likedCard(cardElement) {
  // Получаем кнопку лайка
  const likeButton = cardElement.querySelector(".card__like-button");
  // Меняем состояние кнопки
  likeButton.classList.toggle("card__like-button_is-active");
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

//Получаем элементы DOM
///Элементы для работы кнопки "редактировать"
const editButton = document.querySelector(".profile__edit-button");
const popupEdit = document.querySelector(".popup_type_edit");

///Элементы для работы кнопки "добавить"
const addButton = document.querySelector(".profile__add-button");
const popupNewcard = document.querySelector(".popup_type_new-card");

///Элементы для работы клика по изображению карточки
const popupImage = document.querySelector(".popup_type_image");
const imageElement = popupImage.querySelector(".popup__image");


//ЗАКРЫТИЕ И ОТКРЫТИЕ ПОПАПОВ

// Получаем все кнопки закрытия попапов
const closeButtons = document.querySelectorAll(".popup__close");

/// Функция открытия попапа
function openPopup(popup) {
popup.classList.add("popup_is-opened");
document.body.style.overflow = "hidden";
openForm();
}

// Функция закрытия попапа//
function closePopup(popup) {
popup.classList.remove("popup_is-opened");
document.body.style.overflow = "auto";
}

// Добавляем обработчики событий
editButton.addEventListener("click", () => openPopup(popupEdit));
addButton.addEventListener("click", () => openPopup(popupNewcard));

// Обработчик для всех кнопок закрытия попапов
closeButtons.forEach((button) => {
button.addEventListener("click", (event) => {
/*profileName.textContent != nameInput.value;
profileJob.textContent != jobInput.value; как сделать чтобы данные не сохранялись*/
const popup = event.target.closest(".popup");
if (popup) {
closePopup(popup);
}
});
});


// Добавляем закрытие попапов по клику на оверлей КАК СДЕЛАТЬ ЧТОБЫ ТОЛЬКО ПО ЧЕРНОМУ ФОНУ
document.addEventListener('click', (event) => {
const popup = event.target.closest('.popup');
if (event.target.classList.contains('popup__close') || event.target === popup) {
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
const nameCardInput = popupNewCard.querySelector(".popup__input_type_card-name");
const linkInput = popupNewCard.querySelector(".popup__input_type_url");
const saveButton = popupNewCard.querySelector(".popup__button");

// Обработчик события submit
popupNewCard.addEventListener("submit", (evt) => {
 evt.preventDefault();
  const nameCardValue = nameCardInput.value;
  const linkInputValue = linkInput.value;

  const newCardElement = createCard({ name: nameCardValue, link: linkInputValue }, deleteCard, likedCard);
  document.querySelector(".places__list").prepend(newCardElement);

  nameCardInput.value = "";
  linkInput.value = "";
  closePopup(popupNewCard);

});

// Открытие изображения в попапе
 newCardElement.querySelector(".card__image").addEventListener("click", () => {
 const src = newCardElement.querySelector(".card__image").src;
 openImagePopup(src);
 });

// Функция для открытия изображения в попапе
function openImagePopup(src) {
 imageElement.src = src;
 imageElement.alt = "Изображение";
 openPopup(popupImage);
}

//ДОБАВЛЕНИЕ КАРТОЧКИ ЧЕРЕЗ +

/*// Функция для добавления новой карточки
function addNewCard(deleteCard) {

  // Клонируем шаблон
  const newCardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);

  // Получаем значения из полей ввода
  const nameCardValue = nameCardInput.value;
  const linkInputValue = linkInput.value;

  // Заполняем поля карточки
  newCardElement.querySelector(".card__image").src = linkInputValue;
  newCardElement.querySelector(".card__title").textContent = nameCardValue;
  newCardElement.querySelector(".card__image").alt = nameCardValue;

  // Добавляем карточку в начало контейнера
  document.querySelector(".places__list").prepend(newCardElement);

  // Очищаем поля ввода
  nameCardInput.value = "";
  linkInput.value = "";

  /// Закрываем попап
  closePopup(popupNewCard);


}*/
 /*
// Добавляем обработчик клика на изображение
newCardElement.querySelector(".card__image").addEventListener("click", () => {
openImagePopup(linkInputValue);
});
*/

/*//РАБОТА С ПОПАПОМ "ДОБАВИТЬ КАРТОЧКУ"

const nameCardInput = popupNewcard.querySelector(
".popup__input_type_card-name"
);
const linkInput = popupNewcard.querySelector(".popup__input_type_url");
const saveButton = popupNewcard.querySelector(".popup__button");

function addNewCard() {
  // Клонируем содержимое тега template
  const newCardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);
//Получаем значение
const nameCardValue = nameCardInput.value;
const linkInputValue = linkInput.value;

    // Находим и Устанавливаем значения элементов
newCardElement.querySelector(".card__image").src = linkInputValue;
 newCardElement.querySelector(".card__title").textContent = nameCardValue;
  newCardElement.querySelector(".card__image").alt = 'Изображение';

// Добавляем карточку в начало контейнера
document.querySelector(".places__list").prepend(newCardElement);


  // Закрываем попап
newCardElement.classList.remove("popup_is-opened");

}
// Обработчик события submit
newCardElement.addEventListener("submit", (evt) => {
evt.preventDefault();
addNewCard();
});

*/


//РАБОТА С ПОПАПОМ "ДОБАВИТЬ КАРТОЧКУ"
/*
//Создание карточки по клику на "+"

const popupNewCard = document.querySelector(".popup_type_new-card");
const nameCardInput = popupNewcard.querySelector(
".popup__input_type_card-name"
);
const linkInput = popupNewcard.querySelector(".popup__input_type_url");
const saveButton = popupNewcard.querySelector(".popup__button");

// Функция для добавления новой карточки
function addNewCard() {
const nameCardValue = nameCardInput.value;
const linkInputValue = linkInput.value; // Получаем значение полей nameCardInput и linkInput из свойства value

// Создаем новый элемент карточки
const newCard = document.createElement("div");
newCard.classList = "places__item card";
newCard.innerHTML = `
<h2>${nameCardValue}</h2>
<img src="${linkInputValue}" alt="Image">
`;

// Добавляем карточку в начало контейнера
document.querySelector(".places__list").prepend(newCard);

nameCardInput.value = "";
linkInput.value = "";

// Закрываем попап
popupNewcard.classList.remove("popup_is-opened");

}
// Обработчик события submit
popupNewcard.addEventListener("submit", (evt) => {
evt.preventDefault();
addNewCard();
});
*/

