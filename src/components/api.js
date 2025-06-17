//РАБОТА С API

// Базовый URL и заголовки запросов
const apiConfig = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-40",
  headers: {
    authorization: "d40019f3-d207-40df-a273-89cf4c1c6a66",
    "Content-Type": "application/json",
  },
};

// Проверка ответа от сервера
const getResponseData = (res) => {
  if (!res.ok) {
    throw new Error(`Ошибка: ${res.status}`);
  }
  return res.json();
};

//Информация о пользователе с сервера
export const getUserData = () => {
  return fetch(`${apiConfig.baseUrl}/users/me`, {
    method: "GET",
    headers: apiConfig.headers,
  }).then(getResponseData);
};

//запрос на массив карточек
export const getCards = () => {
  return fetch(`${apiConfig.baseUrl}/cards`, {
    headers: apiConfig.headers,
  }).then(getResponseData);
};

export const updateUserData = (newName, newAbout) => {
  return fetch(`${apiConfig.baseUrl}/users/me`, {
    method: "PATCH",
    headers: apiConfig.headers,
    body: JSON.stringify({
      name: newName,
      about: newAbout,
    }),
  }).then(getResponseData);
};

export const addNewCard = (newNameCard, newLink) => {
  return fetch(`${apiConfig.baseUrl}/cards`, {
    method: "POST",
    headers: apiConfig.headers,
    body: JSON.stringify({
      name: newNameCard,
      link: newLink,
    }),
  })
    .then(getResponseData)
    .then((newCard) => {
      console.log("Новая карточка успешно добавлена:", newCard);
      return newCard;
    });
};

/// Запрос удаления  карточки
export const removeCard = (_id) => {
  return fetch(`${apiConfig.baseUrl}/cards/${_id}`, {
    method: "DELETE",
    headers: apiConfig.headers,
  }).then(getResponseData);
};
//РАБОТА С ЛАЙКАМИ

//ЗАПРОСЫ ПУТ И ДЕЛИТ
export const putLike = (_id) => {
  return fetch(`${apiConfig.baseUrl}/cards/likes/${_id}`, {
    method: "PUT",
    headers: apiConfig.headers,
  }).then(getResponseData);
};
export const deleteLike = (_id) => {
  return fetch(`${apiConfig.baseUrl}/cards/likes/${_id}`, {
    method: "DELETE",
    headers: apiConfig.headers,
  }).then(getResponseData);
};
///ОБНОВЛЕНИЕ АВАТАРКИ
///ЗАПРОС
export const updateUserAvatar = (newAvatar) => {
  return fetch(`${apiConfig.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: apiConfig.headers,
    body: JSON.stringify({
      avatar: newAvatar,
    }),
  }).then(getResponseData);
};
