import './index.css'
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
  apiConfig,
  validationSettings,
  profileAvatar,
} from '../utils/constants'
import { Api } from '../utils/api/Api'

export const API = new Api(apiConfig)
const profile = document.querySelector('.profile')
const avaSelector = profile.querySelector('.profile__avatar')
const nameSelector = profile.querySelector('h1')
const aboutSelector = profile.querySelector('h2')

let cardList
let myName
let myId
export let userInfo
API.getUser(nameSelector, avaSelector, aboutSelector)
  .then((resp) => {
    myName = resp.name
    myId = resp._id
    userInfo = new UserInfo({ name: nameTitle, personal: aboutTitle, id: myId })
  })
  .then(() => {
    API.getInitialCards(myName).then((initialCards) => {
      cardList = new Section(
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
    })
  })

export const overlookPopup = new PopupWithImage('.popup_overlook')

overlookPopup.setEventListeners()

function handleProfileFormSubmit(newInfo) {
  profilePopup.button.textContent = 'Сохранение...'
  API.patchUser(newInfo).then(() => {
    userInfo.setUserInfo(newInfo)
    profilePopup.close()
    profilePopup.button = 'Сохранить'
  })
}

function handleChangeAvatarSubmit({ link }) {
  avatarUpdatePopup.button.textContent = 'Сохранение...'
  API.changeAvatar(link).then(({ avatar }) => {
    avaSelector.src = avatar
    avatarUpdatePopup.close()
    avatarUpdatePopup.button.textContent = 'Обновить аватар'
  })
}

const profilePopup = new PopupWithForm('.popup-profile', handleProfileFormSubmit)
const addCardPopup = new PopupWithForm('.popup-add', handleFormAdd)
const avatarUpdatePopup = new PopupWithForm('.popup-update', handleChangeAvatarSubmit)

export function handleConfirmRemoval(aimCardId) {
  API.deleteCard(aimCardId)
  deletePopup.aimCard._element.remove()
  deletePopup.aimCard._element = null
  deletePopup.aimCard = null
  deletePopup.close()
}

export const deletePopup = new PopupWithForm('.popup-confirmation', handleConfirmRemoval)
deletePopup.setEventListeners()
profilePopup.setEventListeners()
addCardPopup.setEventListeners()
avatarUpdatePopup.setEventListeners()

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
  addCardPopup.button.textContent = 'Сохранение...'
  API.postCard(newInfo).then((card) => {
    card.isMyCard = true
    const cardElement = createCard(card)
    cardList.prependItem(cardElement)
    addCardPopup.close()
    addCardPopup.button.textContent = 'Создать'
  })
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

profileAvatar.addEventListener('click', () => {
  avatarUpdatePopup.open()
})
