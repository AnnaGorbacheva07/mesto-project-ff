//РАБОТА С API
//Информация о пользователе с сервера
export const getUserData = () => {
  return fetch("https://mesto.nomoreparties.co/v1/wff-cohort-40/users/me", {
    method: "GET",
    headers: {
      Authorization: "d40019f3-d207-40df-a273-89cf4c1c6a66",
    },
  }).then((res) => res.json());
};

//запрос на массив карточек
export const getCards = () => {
  return fetch("https://mesto.nomoreparties.co/v1/wff-cohort-40/cards", {
    headers: {
      Authorization: "d40019f3-d207-40df-a273-89cf4c1c6a66",
    },
  }).then((res) => res.json());
};



export const updateUserData = (newName, newAbout) => {
  return fetch("https://mesto.nomoreparties.co/v1/wff-cohort-40/users/me", {
    method: "PATCH",
    headers: {
      authorization: "d40019f3-d207-40df-a273-89cf4c1c6a66",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: newName,
      about: newAbout,
    }),
  }).then((res) => {
    if (!res.ok) {
      throw new Error("Ошибка обновления профиля");
    }
    return res.json();
  });
};

export const addNewCard = (newNameCard, newLink) => {
  return fetch("https://mesto.nomoreparties.co/v1/wff-cohort-40/cards", {
    method: "POST",
    headers: {
      authorization: "d40019f3-d207-40df-a273-89cf4c1c6a66",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: newNameCard,
      link: newLink,
    }),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Ошибка при добавлении карточки: статус ${res.status}`);
      }
      return res.json();
    })
    .then((newCard) => {
      console.log("Новая карточка успешно добавлена:", newCard);
      return newCard;
    })
    .catch((error) => {
      console.error("Ошибка добавления карточки:", error);
      return null;
    });
};

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
//РАБОТА С ЛАЙКАМИ

//ЗАПРОСЫ ПУТ И ДЕЛИТ
export const putLike = (_id) => {
  return fetch(
    `https://mesto.nomoreparties.co/v1/wff-cohort-40/cards/likes/${_id}`,
    {
      method: "PUT",
      headers: {
        authorization: "d40019f3-d207-40df-a273-89cf4c1c6a66",
      },
    }
  )
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Ошибка при лайке карточки: статус ${res.status}`);
      }
      return res.json();
    })
    .catch((error) => {
      console.error("Ошибка при установке лайка:", error);
      return null;
    });
};
export const deleteLike = (_id) => {
  return fetch(
    `https://mesto.nomoreparties.co/v1/wff-cohort-40/cards/likes/${_id}`,
    {
      method: "DELETE",
      headers: {
        authorization: "d40019f3-d207-40df-a273-89cf4c1c6a66",
      },
    }
  )
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Ошибка при лайке карточки: статус ${res.status}`);
      }
      return res.json();
    })
    .catch((error) => {
      console.error("Ошибка при удалении лайка:", error);
      return null;
    });
};
///ОБНОВЛЕНИЕ АВАТАРКИ
///ЗАПРОС
export const updateUserAvatar = (newAvatar) => {
  return fetch(
    "https://mesto.nomoreparties.co/v1/wff-cohort-40/users/me/avatar",
    {
      method: "PATCH",
      headers: {
        authorization: "d40019f3-d207-40df-a273-89cf4c1c6a66",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: newAvatar,
      }),
    }
  ).then((res) => {
    return res.json();
  });
};