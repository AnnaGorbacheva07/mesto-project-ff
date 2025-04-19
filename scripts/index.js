// Получаем элемент методом querySelector и его содержимое свойством content
const cardTemplate = document.querySelector("#card-template").content;

//Создаём контейнер, в котором хранятся карточки//
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
