import './index.css'
import {
  editButton,
  profileForm,
  nameInput,
  jobInput,
  nameTitle,
  aboutTitle,
  placeList,
  addButton,
  addCardForm,
  titleInput,
  linkInput,
  initialCards,
  validationSettings,
  formEditProfile,
  formAddCard,
} from '../utils/constants.js'
import Card from '../scripts/Card.js'
import FormValidator from '../scripts/FormValidator.js'
import Section from '../scripts/Section.js'
import UserInfo from '../scripts/UserInfo.js'
import Popup, { PopupWithForm } from '../scripts/Popup.js'

const cardList = new Section(
  {
    data: initialCards,
    renderer: (item) => {
      const card = new Card(item, '#place-template', () => {
        overlookPopup.open()
      })
      const cardElement = card.createNewCard()
      cardList.addItem(cardElement)
    },
  },
  '.places__list'
)

cardList.renderItems()

const userInfo = new UserInfo({ name: nameTitle, personal: aboutTitle })

export const overlookPopup = new Popup('.popup_overlook')

overlookPopup.setEventListeners()

const profilePopup = new PopupWithForm('.popup-profile')
const addCardPopup = new PopupWithForm('.popup-add')

profilePopup.setEventListeners()
addCardPopup.setEventListeners()

const profileValidation = new FormValidator(validationSettings, formEditProfile)
const newCardValidation = new FormValidator(validationSettings, formAddCard)
profileValidation.enableValidation()
newCardValidation.enableValidation()

function handleFormSubmit(evt) {
  evt.preventDefault()

  userInfo.setUserInfo({ name: nameInput.value, personal: jobInput.value })
  profilePopup.close()
}

function handleFormAdd(evt) {
  evt.preventDefault()
  const newCard = {
    name: titleInput.value,
    link: linkInput.value,
  }

  const cardElement = new Card(newCard, '#place-template', () => {
    overlookPopup.open()
  }).createNewCard()
  placeList.prepend(cardElement)

  addCardPopup.close()
  addCardForm.reset()
  newCardValidation._toggleButtonState()
}

editButton.addEventListener('click', () => {
  profilePopup.open()
  const { name, personal } = userInfo.getUserInfo()
  nameInput.value = name
  jobInput.value = personal
  profileValidation.resetValidation()
})
profileForm.addEventListener('submit', handleFormSubmit)

addButton.addEventListener('click', () => {
  newCardValidation.resetValidation()
  addCardPopup.open()
})
addCardForm.addEventListener('submit', handleFormAdd)
