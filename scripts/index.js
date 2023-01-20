const page = document.querySelector('html')
const editButton = document.querySelector('.profile__button_edit')
const closeButton = document.querySelector('.popup__button_close')
const profilePopup = document.querySelector('.popup-profile')

const profileForm = document.querySelector('.popup__form-profile')

const nameInput = document.querySelector('.popup__input_field_name')
const jobInput = document.querySelector('.popup__input_field_about')

const nameTitle = document.querySelector('.profile__name')
const aboutTitle = document.querySelector('.profile__about')

const placeCard = document.querySelector('#place-template').content
const placeList = document.querySelector('.places__list')
const addButton = document.querySelector('.profile__button_add')

const addCardPopup = document.querySelector('.popup-add')
const closeAddButton = addCardPopup.querySelector('.popup__button_close')
const addCardForm = addCardPopup.querySelector('.popup__form-card')

const placeName = addCardPopup.querySelector('.popup__input_field_name')
const placeSource = addCardPopup.querySelector('.popup__input_field_about')

const overlookImage = document.querySelector('.popup__image')
const overlookName = document.querySelector('.popup__name')
const overlook = document.querySelector('.popup_overlook')

const titleInput = document.querySelector('.popup__input-title')
const linkInput = document.querySelector('.popup__input-link')

const closeButtons = document.querySelectorAll('.popup__button_close')

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

const openPopup = (popup) => {
  popup.classList.add('popup_opened')

  if (popup === profilePopup) {
    nameInput.value = nameTitle.textContent
    jobInput.value = aboutTitle.textContent
  }
}

const closePopup = (popup) => {
  popup.classList.remove('popup_opened')
}

function handleFormSubmit(evt) {
  evt.preventDefault()

  nameTitle.textContent = nameInput.value
  aboutTitle.textContent = jobInput.value
  closePopup(profilePopup)
}

const createNewCard = ({ name, link }) => {
  const card = placeCard.cloneNode(true)
  card.querySelector('.places__image').src = link
  card.querySelector('.places__name').textContent = name
  card.querySelector('.places__image').alt = name

  card
    .querySelector('.places__like')
    .addEventListener('click', (e) => e.target.classList.toggle('places__like_state_active'))
  card.querySelector('.places__delete').addEventListener('click', (e) => e.target.closest('.places__item').remove())

  card.querySelector('.places__overlook').addEventListener('click', () => {
    overlookImage.src = link
    overlookName.textContent = name
    overlookImage.alt = name
    overlook.classList.add('popup_opened')
  })
  return card
}

const toggleAddPopup = () => {
  placeName.value = ''
  placeSource.value = ''
  addCardPopup.classList.toggle('popup_opened')
}

function handleFormAdd(evt) {
  evt.preventDefault()
  const newCard = {
    name: titleInput.value,
    link: linkInput.value,
  }

  placeList.prepend(createNewCard(newCard))
  // addNewCard(newCard)
  toggleAddPopup()
}

editButton.addEventListener('click', () => openPopup(profilePopup))
profileForm.addEventListener('submit', handleFormSubmit)
addButton.addEventListener('click', toggleAddPopup)
addCardForm.addEventListener('submit', handleFormAdd)

closeButtons.forEach((button) => {
  const popup = button.closest('.popup')
  button.addEventListener('click', () => closePopup(popup))
})

initialCards.forEach((el) => placeList.prepend(createNewCard(el)))
