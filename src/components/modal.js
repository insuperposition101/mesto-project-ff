export function openPopup(popup) {
  //popup.classList.add("popup_is-animated");
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", escClose);
  document.addEventListener("click", overlayClose);
}

export function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", escClose);
  document.removeEventListener("click", overlayClose);
}

function escClose(event) {
  const currentPopup = document.querySelector(".popup_is-opened");
  if (event.key === "Escape") {
    closePopup(currentPopup);
  }
}

function overlayClose(event) {
  if (event.target.classList.contains("popup_is-opened")) {
    closePopup(event.target);
  }
}
