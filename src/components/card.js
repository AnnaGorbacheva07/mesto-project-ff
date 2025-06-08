// Получаем элемент методом querySelector и его содержимое свойством content
const cardTemplate = document.querySelector("#card-template").content;

// Функция создания карточки
export function createCard(
  { name, link, _id, owner },
  deleteCard,
  likedCard,
  openImagePopup //если эту удалить тогда не будет открываться изображение по клику на него, т.к.выдает ошибку 
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

  /*// Добавляем обработчик клика на кнопку удаления и функцию удаления
  deleteButton.addEventListener("click", () => {
    deleteCard(cardElement);
  });*/

  
  
  // Проверяем, принадлежит ли карточка текущему пользователю
  if (_id === owner._id) {
    deleteButton.style.display = 'block';
    deleteButton.addEventListener("click", () => {
      deleteCard(cardElement,_id); // Передаем ID карточки в функцию удаления
    });
  } else {
   deleteButton.style.display = 'none';
  }
  
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
export function deleteCard(cardElement, cardId) {
 return fetch("https://mesto.nomoreparties.co/v1/wff-cohort-40/cards/${cardId}", {
    method: "DELETE",
    headers: {
      authorization: "d40019f3-d207-40df-a273-89cf4c1c6a66",
    }
  })
  .then(res => {
 if (!res.ok) {
 throw new Error(`Ошибка при удалении карточки: статус ${res.status}`);
 }
 cardElement.remove();
 })
.catch(error => {
 console.error('Ошибка удаления карточки:', error);
 });
};


/*/// Функция удаления  карточки
export function deleteCard(cardElement) {
  cardElement.remove();
}*/
