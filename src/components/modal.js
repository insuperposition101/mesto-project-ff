export function openPopup(popup) {
  popup.classList.add("popup_is-animated");
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", EscClose);
  document.addEventListener("click", OverlayClose);
}

export function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", EscClose);
  document.removeEventListener("click", OverlayClose);
}

function EscClose(event) {
  const CurrentPopup = document.querySelector(".popup_is-opened");
  if (event.key === "Escape") {
    closePopup(CurrentPopup);
  }
}

function OverlayClose(event) {
  if (event.target.classList.contains("popup_is-opened")) {
    closePopup(event.target);
  }
}
