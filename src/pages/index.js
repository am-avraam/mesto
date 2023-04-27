import './index.css'
import FormValidator from 'Components/FormValidator.js'
import Section from 'Components/Section.js'
import Card from 'Components/Card.js'
import UserInfo from 'Components/UserInfo.js'
import PopupWithImage from 'Components/PopupWithImage.js'
import PopupWithForm from 'Components/PopupWithForm.js'
import PopupWithConfirmation from 'Components/PopupWithConfirmation.js'

import {
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
  updateAvatarForm,
} from '../utils/constants'
import { Api } from '../utils/api/Api'

export const api = new Api(apiConfig)
const profile = document.querySelector('.profile')
const avaSelector = profile.querySelector('.profile__avatar')

const userInfo = new UserInfo({ name: nameTitle, personal: aboutTitle, avatar: avaSelector })
const cardList = new Section(
  {
    renderer: (item) => {
      const cardElement = createCard(item)
      cardList.addItem(cardElement)
    },
  },
  '.places__list'
)
Promise.all([api.getUser(), api.getInitialCards()])
  .then(([info, initialCards]) => {
    userInfo.setUserInfo(info)

    cardList.renderItems(initialCards)
  })
  .catch((err) => console.log(`Ошибка.....: ${err}`))

export const overlookPopup = new PopupWithImage('.popup_overlook')

overlookPopup.setEventListeners()

function handleProfileFormSubmit(newInfo) {
  profilePopup.setButtonText('Сохранение...')

  api
    .patchUser(newInfo)
    .then((data) => {
      userInfo.setUserInfo(data)
      profilePopup.close()
    })
    .catch((err) => console.log(`Ошибка.....: ${err}`))
    .finally(() => {
      profilePopup.setButtonText('Сохранить')
    })
}

function handleDeleteButtonClick(aimCard) {
  deletePopup.setAimCard(aimCard)
  deletePopup.open()
}

function createCard(item) {
  const card = new Card(
    item,
    '#place-template',
    (link, name) => overlookPopup.open(link, name),
    handleDeleteButtonClick,
    async function (id) {
      let likes

      if (card.isActiveLike()) {
        likes = await api.deleteLikeCard(id)
      } else {
        likes = await api.likeCard(id)
      }
      card.setLikesCount(likes)
      card.toggleLike()
    },

    userInfo.getUserInfo().id
  )
  const cardElement = card.createNewCard()
  return cardElement
}

function handleChangeAvatarSubmit(data) {
  avatarUpdatePopup.setButtonText('Сохранение...')

  const { link } = data
  api
    .changeAvatar(link)
    .then((data) => {
      userInfo.setUserInfo(data)
      avatarUpdatePopup.close()
    })
    .catch((err) => console.log(`Ошибка.....: ${err}`))
    .finally(() => avatarUpdatePopup.setButtonText('Обновить аватар'))
}

const profilePopup = new PopupWithForm('.popup-profile', handleProfileFormSubmit)
const addCardPopup = new PopupWithForm('.popup-add', handleFormAdd)
const avatarUpdatePopup = new PopupWithForm('.popup-update', handleChangeAvatarSubmit)

export function handleConfirmRemoval(aimCardId) {
  api.deleteCard(aimCardId).then(() => {
    deletePopup.removeAimCard()
    deletePopup.close()
  })
}

export const deletePopup = new PopupWithConfirmation('.popup-confirmation', handleConfirmRemoval)
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
  addCardPopup.setButtonText('Сохранение...')

  api
    .postCard(newInfo)
    .then((card) => {
      card.isMyCard = true
      const cardElement = createCard(card)
      cardList.prependItem(cardElement)
      addCardPopup.close()
    })
    .catch((err) => console.log(`Ошибка.....: ${err}`))
    .finally(() => addCardPopup.setButtonText('Создать'))
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
  formValidators[updateAvatarForm.getAttribute('name')].resetValidation()
  avatarUpdatePopup.open()
})
