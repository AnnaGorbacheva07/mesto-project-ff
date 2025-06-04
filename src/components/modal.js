import { clearValidation } from "../index.js"
/// Функция открытия попапа
export function openPopup(popup) {
  popup.classList.add("popup_is-opened");
  document.body.style.overflow = "hidden";
  document.addEventListener("click", handleOverlayClose);
  document.addEventListener("keydown", handleEscClose);

}

/// Функция закрытия попапа
export function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
  document.body.style.overflow = "auto";
  document.removeEventListener("click", handleOverlayClose);
  document.removeEventListener("keydown", handleEscClose);
}
// Добавляем закрытие попапов по клику на оверлей
export function handleOverlayClose(event) {
  const popup = event.target.closest(".popup");
  if (
    event.target.classList.contains("popup__close") ||
    event.target === popup
  ) {
    closePopup(popup);
  }
}

// Добавляем закрытие попапов по Esc
export function handleEscClose(event) {
  if (event.key === "Escape") {
    const popup = document.querySelector(".popup_is-opened");
    if (popup) {
      closePopup(popup);
    }
  }
}
