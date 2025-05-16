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

// Функция для открытия изображения в попапе
export function openImagePopup(src, name) {
 imageElement.src = src;
 imageElement.alt = name;
 caption.textContent = name;
 openPopup(popupImage);
}

// Функция открытия попапа "редактировать"
export function openForm() {
  // Заполняем поля формы текущими значениями
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

