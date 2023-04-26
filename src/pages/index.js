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

export let userInfo = new UserInfo({ name: nameTitle, personal: aboutTitle, avatar: avaSelector })
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
    const { name, avatar, about, _id } = info
    userInfo.setUserInfo({ name, about, _id, avatar })
    const myName = name

    const initCardsPrepared = initialCards.map((el) => {
      const { link, name, likes, _id } = el
      let isMyCard = el.owner.name === myName ? true : false
      return { link, name, likes, _id, isMyCard }
    })

    cardList.renderItems(initCardsPrepared)
  })
  .catch((err) => console.log(`Ошибка.....: ${err}`))

export const overlookPopup = new PopupWithImage('.popup_overlook')

overlookPopup.setEventListeners()

function handleProfileFormSubmit() {
  profilePopup.setButtonText('Сохранение...')
  const newInfo = profilePopup.getInputValues()

  api
    .patchUser(newInfo)
    .then(() => {
      userInfo.setUserInfo(newInfo)
      profilePopup.close()
    })
    .catch((err) => console.log(`Ошибка.....: ${err}`))
    .finally(() => {
      profilePopup.setButtonText('Сохранить')
    })
}

function handleDeleteButtonClick(aimCard) {
  deletePopup.aimCard = aimCard
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
      if (card._buttonLike.classList.contains('places__like_state_active')) {
        likes = await api.deleteLikeCard(id)
      } else {
        likes = await api.likeCard(id)
      }
      card.setLikesCount(likes)
      card.toggleLike()
    },
    // api.deleteLikeCard,
    userInfo.getUserInfo().id
  )
  const cardElement = card.createNewCard()
  return cardElement
}

function handleChangeAvatarSubmit() {
  avatarUpdatePopup.setButtonText('Сохранение...')
  const { link } = avatarUpdatePopup.getInputValues()
  api
    .changeAvatar(link)
    .then(({ avatar }) => {
      avaSelector.src = avatar
      avatarUpdatePopup.close()
    })
    .catch((err) => console.log(`Ошибка.....: ${err}`))
    .finally(() => avatarUpdatePopup.setButtonText('Обновить аватар'))
}

const profilePopup = new PopupWithForm('.popup-profile', handleProfileFormSubmit)
const addCardPopup = new PopupWithForm('.popup-add', handleFormAdd)
const avatarUpdatePopup = new PopupWithForm('.popup-update', handleChangeAvatarSubmit)

export function handleConfirmRemoval() {
  const aimCardId = deletePopup.getAimCard()
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

function handleFormAdd() {
  addCardPopup.setButtonText('Сохранение...')
  const newInfo = { ...addCardPopup.getInputValues(), isMyCard: true }
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
