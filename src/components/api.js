const apiConfig = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-5",
  headers: {
    authorization: "2aebf765-8b0c-492e-95bd-40e1a2a15cd9",
    "Content-Type": "application/json",
  },
};

const checkRequest = (res) => {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
};

export const getUser = () => {
  return fetch(`${apiConfig.baseUrl}/users/me`, {
    method: "GET",
    headers: apiConfig.headers,
  }).then((res) => checkRequest(res));
};

export const getCards = () => {
  return fetch(`${apiConfig.baseUrl}/cards`, {
    method: "GET",
    headers: apiConfig.headers,
  }).then((res) => checkRequest(res));
};

export const editUser = (data) => {
  return fetch(`${apiConfig.baseUrl}/users/me`, {
    method: "PATCH",
    headers: apiConfig.headers,
    body: JSON.stringify({
      name: data.name,
      about: data.about,
    }),
  }).then((res) => checkRequest(res));
};

export const addCard = ({ name, link }) => {
  return fetch(`${apiConfig.baseUrl}/cards`, {
    method: "POST",
    headers: apiConfig.headers,
    body: JSON.stringify({ name, link }),
  }).then((res) => checkRequest(res));
};

export const deleteCardApi = (cardId) => {
  return fetch(`${apiConfig.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: apiConfig.headers,
  }).then((res) => checkRequest(res));
};

export const likeCardApi = (cardId) => {
  return fetch(`${apiConfig.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: apiConfig.headers,
  }).then((res) => checkRequest(res));
};

export const unlikeCardApi = (cardId) => {
  return fetch(`${apiConfig.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: apiConfig.headers,
  }).then((res) => checkRequest(res));
};

export const editAvatar = (link) => {
  return fetch(`${apiConfig.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: apiConfig.headers,
    body: JSON.stringify({ avatar: link.avatar }),
  }).then((res) => checkRequest(res));
};
