/// Функция открытия попапа
export function openPopup(popup) {
  popup.classList.add("popup_is-animated"); // Добавляем класс анимации
  popup.classList.add("popup_is-opened");
  document.body.style.overflow = "hidden";
  openForm();
}

/// Функция закрытия попапа
export function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
  // После завершения анимации (600мс) полностью скрываем попап
  setTimeout(() => {
    popup.classList.remove("popup_is-animated");
    document.body.style.overflow = "auto";
  }, 600);
} //Функция closePopup принимает один аргумент popup, который является элементом попапа.

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
export function openForm() {
  // Заполняем поля формы текущими значениями
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
} 