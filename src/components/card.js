import { putLike, deleteLike, deleteCard } from "./api.js";
// Получаем элемент методом querySelector и его содержимое свойством content
const cardTemplate = document.querySelector("#card-template").content;

// Функция создания карточки
export function createCard(
  { name, link, _id, owner, likes },
  deleteCard,
  likedCard,
  openImagePopup, //если эту удалить тогда не будет открываться изображение по клику на него, т.к.выдает ошибку
  user
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
  const likeCountElement = cardElement.querySelector(".card__like-count");
  likeCountElement.textContent = likes.length;
  // Добавляем проверку на существование элемента
  if (!likeCountElement) {
    console.error("Элемент .card__like-count не найден в шаблоне");
    return;
  }

  // Проверяем, принадлежит ли карточка текущему пользователю
  if (user._id === owner._id) {
    deleteButton.style.display = "block";
    deleteButton.addEventListener("click", () => {
      deleteCard(cardElement, _id); // Передаем ID карточки в функцию удаления
    });
  } else {
    deleteButton.style.display = "none";
  }

  // Проверяем, лайкнул ли карточку текущий пользователь
  if (likes.some((like) => like._id === user._id)) {
    likeButton.classList.add("card__like-button_is-active");
  }

  //Обработчик лайка
  likeButton.addEventListener("click", (evt) => {
    likedCard(evt, _id, likeCountElement);
  });

  /// Открытие изображения в попапе
  image.addEventListener("click", () => {
    openImagePopup(link, name);
  });
  return cardElement;
}

export function likedCard(evt, _id, likeCountElement) {
  const likeButton = evt.target;
  const isLiked = likeButton.classList.contains("card__like-button_is-active");

  // Логирование для проверки существования элементов
  console.log("likeCountElement:", likeCountElement);
  console.log("likeButton:", likeButton);
  // Проверка наличия элементов
  if (!likeCountElement || !likeButton) {
    console.error("Элементы не найдены в likedCard");
    return;
  }
  let likeCount = 0;

  // Получаем текущее значение счетчика лайков
  if (likeCountElement.textContent) {
    likeCount = parseInt(likeCountElement.textContent, 10);
  }
  if (isLiked) {
    // Удаляем лайк
    deleteLike(_id)
      .then((likeData) => {
        if (likeData) {
          likeButton.classList.remove("card__like-button_is-active");
          likeCountElement.textContent = likeData.likes.length;
        } else {
          likeCountElement.textContent = ""; // Убираем счетчик, если лайков нет
        }
        console.log("Лайк удален успешно");
      })
      .catch((err) => {
        console.error("Ошибка при удалении лайка:", err);
      });
  } else {
    // Устанавливаем лайк
    putLike(_id)
      .then((likeData) => {
        if (likeData) {
          likeButton.classList.add("card__like-button_is-active");
          likeCountElement.textContent = likeData.likes.length;
          console.log("Лайк установлен успешно");
        }
      })
      .catch((err) => {
        console.error("Ошибка при установке лайка:", err);
      });
  }
}
