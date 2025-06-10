import { putLike, deleteLike, handleLike } from "../index.js";

// Получаем элемент методом querySelector и его содержимое свойством content
const cardTemplate = document.querySelector("#card-template").content;

// Функция создания карточки
export function createCard(
  { name, link, _id, owner },
  deleteCard,
  handleLike,
  /*likedCard,*/
  openImagePopup,//если эту удалить тогда не будет открываться изображение по клику на него, т.к.выдает ошибку
  user
) {
  // Клонируем содержимое тега template
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);

  // Находим и Устанавливаем значения элементов
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
const likeCount = cardElement.querySelector(".card__like-count");
  const image = cardElement.querySelector(".card__image");
  image.src = link;
  cardElement.querySelector(".card__title").textContent = name;
  image.alt = name;

  /*// Добавляем обработчик клика на кнопку удаления и функцию удаления
  deleteButton.addEventListener("click", () => {
    deleteCard(cardElement);
  });*/

  // Устанавливаем количество лайков
  likeCount.textContent = newCard.likes.length;

  // Проверяем, принадлежит ли карточка текущему пользователю
  if (user._id === owner._id) {
    deleteButton.style.display = "block";
    deleteButton.addEventListener("click", () => {
      deleteCard(cardElement, _id); // Передаем ID карточки в функцию удаления
    });
  } else {
    deleteButton.style.display = "none";
  }
// Проверяем, лайкнул ли текущий пользователь карточку
  const isLiked = newCard.likes.some((user) => user._id === owner._id);
  if (isLiked) {
    likeButton.classList.add("card__like-button_is-active");
  }
  //Обработчик лайка
  likeButton.addEventListener("click", () => {
    handleLike(evt, newCard._id, likeCount);
  });

  /// Открытие изображения в попапе
  image.addEventListener("click", () => {
    openImagePopup(link, name);
  });
  return cardElement;
}


/// Функция удаления  карточки
export function deleteCard(cardElement, _id) {
  return fetch(`https://mesto.nomoreparties.co/v1/wff-cohort-40/cards/${_id}`, {
    method: "DELETE",
    headers: {
      authorization: "d40019f3-d207-40df-a273-89cf4c1c6a66",
    },
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Ошибка при удалении карточки: статус ${res.status}`);
      }
      cardElement.remove();
    })
    .catch((error) => {
      console.error("Ошибка удаления карточки:", error);
    });
}

/*/// Функция удаления  карточки
export function deleteCard(cardElement) {
  cardElement.remove();
}
*/
