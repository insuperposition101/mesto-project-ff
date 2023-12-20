

const placesList = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;


function createCard(name, link, deleteCard) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const deleteButton = cardElement.querySelector('.card__delete-button');
    cardElement.querySelector('.card__image').src = link;
    cardElement.querySelector('.card__title').textContent = name;
    deleteButton.addEventListener('click', function(event) {
        deleteCard(event);
    });

    return cardElement;
}


function deleteCard(event) {
    const listItem = event.target.closest('.card');
    listItem.remove();
 }


initialCards.forEach(function(elem) {
    placesList.append(createCard(elem.name, elem.link, deleteCard))
})