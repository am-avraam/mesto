import './index.css'
import Card from 'Components/Card.js'
import FormValidator from 'Components/FormValidator.js'
import Section from 'Components/Section.js'
import UserInfo from 'Components/UserInfo.js'
import PopupWithImage from 'Components/PopupWithImage.js'
import PopupWithForm from 'Components/PopupWithForm.js'

import {
  createCard,
  editButton,
  profileForm,
  nameInput,
  jobInput,
  nameTitle,
  aboutTitle,
  addButton,
  addCardForm,
  initialCards,
  validationSettings,
} from '../utils/constants'

const cardList = new Section(
  {
    data: initialCards,
    renderer: (item) => {
      const cardElement = createCard(item)
      cardList.addItem(cardElement)
    },
  },
  '.places__list'
)

cardList.renderItems()

const userInfo = new UserInfo({ name: nameTitle, personal: aboutTitle })

export const overlookPopup = new PopupWithImage('.popup_overlook')

overlookPopup.setEventListeners()

function handleProfileFormSubmit(newInfo) {
  userInfo.setUserInfo(newInfo)
  profilePopup.close()
}
const profilePopup = new PopupWithForm('.popup-profile', handleProfileFormSubmit)
const addCardPopup = new PopupWithForm('.popup-add', handleFormAdd)

profilePopup.setEventListeners()
addCardPopup.setEventListeners()

const formValidators = {}
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector))
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement)

    const formName = formElement.getAttribute('name')

    formValidators[formName] = validator
    validator.enableValidation()
  })
}
enableValidation(validationSettings)

function handleFormAdd(newInfo) {
  const cardElement = createCard(newInfo)
  cardList.prependItem(cardElement)

  addCardPopup.close()
}

editButton.addEventListener('click', () => {
  profilePopup.open()
  const { name, personal } = userInfo.getUserInfo()
  nameInput.value = name
  jobInput.value = personal

  formValidators[profileForm.getAttribute('name')].resetValidation()
})

addButton.addEventListener('click', () => {
  formValidators[addCardForm.getAttribute('name')].resetValidation()

  addCardPopup.open()
})
