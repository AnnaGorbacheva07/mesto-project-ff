/// Функция открытия попапа
export function openPopup(popup) {
  popup.classList.add("popup_is-animated"); // Добавляем класс анимации
  popup.classList.add("popup_is-opened");
  document.body.style.overflow = "hidden";
}

/// Функция закрытия попапа
export function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
  // После завершения анимации  скрываем попап
  setTimeout(() => {
    popup.classList.remove("popup_is-animated");
    document.body.style.overflow = "auto";
  }, 600);
}
