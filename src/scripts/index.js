
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
const editButton=document.querySelector('.profile__edit-button');
const addButton=document.querySelector('.profile__add-button');
const image=document.querySelector('.card__image');
const popupEdit=document.querySelector('.popup_type_edit');
const popupNewcard=document.querySelector('.popup_type_new-card');
const popupImage=document.querySelector('.popup_type_image');
const closeButton=document.querySelector('.popup__close');

/// Функция открытия попапа
function openPopup(popup) {
  popup.classList.add('popup_is-opened');
  document.body.style.overflow = 'hidden';
}

// Функция закрытия попапа
function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
  document.body.style.overflow = 'auto';
}


// Добавляем обработчики событий
editButton.addEventListener('click', () => openPopup(popupEdit));
addButton.addEventListener('click', () => openPopup(popupNewcard));
image.addEventListener('click', () => openPopup(popupImage));

// Обработчик для кнопки закрытия попапа
closeButton.addEventListener('click', (event) => {
  const popup = event.target.closest('.popup');
  if (popup) {
    closePopup(popup);
  }
});

//Поиск родительского попапа: event.target указывает на элемент, по которому был произведен клик,
//closest('.popup') ищет ближайший родительский элемент с классом .popup. Это позволяет нам определить, какой именно попап нужно закрыть.
//Проверка наличия попапа if (popup) {
// Если попап найден, закрываем его. Если popup существует, то выполняем закрытие попапа.


