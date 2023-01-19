const placeCard = document.querySelector('#place-template').content
const placeList = document.querySelector('.places__list')
const addButton = document.querySelector('.profile__button_add')

const addCardPopup = document.querySelector('.popup-add')
const closeAddButton = addCardPopup.querySelector('.popup__button_close')
const addCardForm = addCardPopup.querySelector('.popup__form')

const placeName = addCardPopup.querySelector('.popup__input_field_name')
const placeSource = addCardPopup.querySelector('.popup__input_field_about')

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
  },
]

const addNewCard = ({ name, link }) => {
  const card = placeCard.cloneNode(true)
  card.querySelector('.places__image').src = link
  card.querySelector('.places__name').textContent = name

  card
    .querySelector('.places__like')
    .addEventListener('click', (e) => e.target.classList.toggle('places__like_state_active'))
  card.querySelector('.places__delete').addEventListener('click', (e) => e.target.closest('.places__item').remove())

  card.querySelector('.places__overlook').addEventListener('click', () => {
    document.querySelector('.popup__image').src = link
    document.querySelector('.popup__name').textContent = name
    document.querySelector('.popup_overlook').classList.add('popup_opened')
  })

  document
    .querySelector('.popup__button_place_overlook')
    .addEventListener('click', () => document.querySelector('.popup_overlook').classList.remove('popup_opened'))

  placeList.prepend(card)
}

initialCards.forEach((el) => {
  addNewCard(el)
})

const toggleAddPopup = () => {
  placeName.value = ''
  placeSource.value = ''
  addCardPopup.classList.toggle('popup_opened')
}

function handleFormAdd(evt) {
  evt.preventDefault()
  const newCard = {
    name: addCardPopup.querySelector('.popup__input_field_name').value,
    link: addCardPopup.querySelector('.popup__input_field_about').value,
  }

  addNewCard(newCard)
  toggleAddPopup()
}

addButton.addEventListener('click', toggleAddPopup)
closeAddButton.addEventListener('click', toggleAddPopup)
addCardForm.addEventListener('submit', handleFormAdd)
