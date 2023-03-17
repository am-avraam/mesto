import Card from './Card.js'
import FormValidator from './FormValidator.js'

const editButton = document.querySelector('.profile__button_edit')

const profilePopup = document.querySelector('.popup-profile')

const profileForm = document.querySelector('.popup__form-profile')

const nameInput = document.querySelector('.popup__input_field_name')
const jobInput = document.querySelector('.popup__input_field_about')

const nameTitle = document.querySelector('.profile__name')
const aboutTitle = document.querySelector('.profile__about')

const placeList = document.querySelector('.places__list')
const addButton = document.querySelector('.profile__button_add')
const addCardButton = document.querySelector('.popup__button-save-card')

const addCardPopup = document.querySelector('.popup-add')
const addCardForm = addCardPopup.querySelector('.popup__form-card')

const titleInput = document.querySelector('.popup__input-title')
const linkInput = document.querySelector('.popup__input-link')

const closeButtons = document.querySelectorAll('.popup__button_close')
const popups = Array.from(document.querySelectorAll('.popup'))

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

const validationSettings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button_save',
  inactiveButtonClass: 'popup__button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active',
}

const formList = Array.from(document.querySelectorAll(validationSettings.formSelector))

export const openPopup = (popup) => {
  popup.classList.add('popup_opened')
  document.addEventListener('keydown', closeByEscape)
}

const closePopup = (popup = document.querySelector('.popup_opened')) => {
  // это дефолтный параметр,
  // который вызывается в том случае, когда я не передаю аргументов. Что в этом нерпавильного?
  // не один ли хрен - что я передаю в вызов функции открытый попап, что функция автоматом вычисляет такой попап,
  // когда я не передаю аргументов?
  popup.classList.remove('popup_opened')
  document.removeEventListener('keydown', closeByEscape)
}

function handleFormSubmit(evt) {
  evt.preventDefault()

  nameTitle.textContent = nameInput.value
  aboutTitle.textContent = jobInput.value

  closePopup(profilePopup)
}

const toggleAddPopup = () => {
  // какие действия здесь лишние? я смотрю, есть ли открытые попапы и закрываю их, если нет - открываю
  // делается это отдельной функцией
  addCardForm.reset()
  setSubmitButtonState(false)

  Array.from(addCardPopup.classList).find((el) => el === 'popup_opened')
    ? closePopup(addCardPopup)
    : openPopup(addCardPopup)
}

function handleFormAdd(evt) {
  evt.preventDefault()
  const newCard = {
    name: titleInput.value,
    link: linkInput.value,
  }

  const cardElement = new Card(newCard, '#place-template').createNewCard()
  // стоит вызов функции createNewCard экземпляра
  placeList.prepend(cardElement)

  closePopup() // так в функции дефолтный параметр находит нужный попап
  // toggleAddPopup()
}

function setSubmitButtonState(isFormValid) {
  if (!isFormValid) {
    addCardButton.setAttribute('disabled', true)
    addCardButton.classList.add('popup__button_inactive')
  }
}

function closeByEscape(event) {
  if (event.key === 'Escape') {
    closePopup() // зачем мне его искать, если функция это делает автоматически?
    // открытым попап может быть только 1 одновременно, зачем делать лишние действия?
  }
}

editButton.addEventListener('click', () => {
  openPopup(profilePopup)
  nameInput.value = nameTitle.textContent
  jobInput.value = aboutTitle.textContent
})
profileForm.addEventListener('submit', handleFormSubmit)
// addCardForm.addEventListener('input', function (evt) {
//   const isValid = titleInput.value.length > 0 && linkInput.value.length > 0
//   setSubmitButtonState(isValid)
// })
addButton.addEventListener('click', toggleAddPopup)
addCardForm.addEventListener('submit', handleFormAdd)

closeButtons.forEach((button) => {
  const popup = button.closest('.popup')
  button.addEventListener('click', () => closePopup(popup))
})

initialCards.forEach((el) => {
  const card = new Card(el, '#place-template')
  const cardElement = card.createNewCard()
  placeList.prepend(cardElement)
})

formList.forEach((formElement) => {
  // это ни одно ли и то же с вашим вариантом?
  const formValidator = new FormValidator(validationSettings, formElement)
  formValidator.enableValidation()
})
// если форм будет больше, то мне их все нужно будет вручную искать и энэйблить?
// здесь я сделал то же самое - для 2-х форм - создал экземпляр, запустил валидацию

// const profileValidation = new FormValidator(selectors, formEditProfile);
// const newCardValidation = new FormValidator(selectors, formAddCard);
// profileValidation.enableValidation();
// newCardValidation.enableValidation();

popups.forEach((popup) =>
  popup.addEventListener('click', function (event) {
    if (!event.target.closest('.popup__container') && !event.target.closest('.popup__wrapper')) {
      closePopup()
    }
  })
)
