import "./pages/index.css"; // добавьте импорт главного файла стилей
import { initialCards } from "./scripts/cards.js";
import { createCard, likedCard, deleteCard } from "./components/card.js";
import { openPopup, closePopup, openImagePopup } from "./components/modal.js";

// Получаем элемент методом querySelector и его содержимое свойством content
const cardTemplate = document.querySelector("#card-template").content;

//Создаём контейнер, в котором хранятся карточки.В нашем случае это <ul>//
const placesList = document.querySelector(".places__list");

///Элементы для работы клика по изображению карточки
const popupImage = document.querySelector(".popup_type_image");
const imageElement = popupImage.querySelector(".popup__image");
const caption = popupImage.querySelector(".popup__caption");

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

//ЗАКРЫТИЕ И ОТКРЫТИЕ ПОПАПОВ

// Получаем все кнопки закрытия попапов
const closeButtons = document.querySelectorAll(".popup__close");

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
