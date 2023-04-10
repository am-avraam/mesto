export const editButton = document.querySelector('.profile__button_edit')

export const profilePopup = document.querySelector('.popup-profile')

export const profileForm = document.querySelector('.popup__form-profile')

export const nameInput = document.querySelector('.popup__input_field_name')
export const jobInput = document.querySelector('.popup__input_field_about')

export const nameTitle = document.querySelector('.profile__name')
export const aboutTitle = document.querySelector('.profile__about')

export const placeList = document.querySelector('.places__list')
export const addButton = document.querySelector('.profile__button_add')
export const addCardButton = document.querySelector('.popup__button-save-card')

export const addCardPopup = document.querySelector('.popup-add')
export const addCardForm = addCardPopup.querySelector('.popup__form-card')

export const titleInput = document.querySelector('.popup__input-title')
export const linkInput = document.querySelector('.popup__input-link')

export const closeButtons = document.querySelectorAll('.popup__button_close')
export const popups = Array.from(document.querySelectorAll('.popup'))

export const initialCards = [
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

export const validationSettings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button_save',
  inactiveButtonClass: 'popup__button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active',
}

export const formEditProfile = document.querySelector('.popup__form-profile')
export const formAddCard = document.querySelector('.popup__form-card')
