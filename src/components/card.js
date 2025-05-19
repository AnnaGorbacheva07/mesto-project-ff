// Получаем элемент методом querySelector и его содержимое свойством content
const cardTemplate = document.querySelector("#card-template").content;

// Функция создания карточки
export function createCard(
  { name, link },
  deleteCard,
  likedCard,
  openImagePopup,
  handleOverlayClose,
  handleEscClose
) {
  // Клонируем содержимое тега template
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);

  // Находим и Устанавливаем значения элементов
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  const image = cardElement.querySelector(".card__image");
  image.src = link;
  cardElement.querySelector(".card__title").textContent = name;
  image.alt = name;

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
//Функция лайка
export function likedCard(event) {
  /*// Получаем кнопку лайка
  const likeButton = cardElement.querySelector(".card__like-button");*/
  // Меняем состояние кнопки
  event.target.classList.toggle("card__like-button_is-active");
}
/// Функция удаления  карточки
export function deleteCard(cardElement) {
  cardElement.remove();
}
