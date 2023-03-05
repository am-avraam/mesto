import { openPopup } from './index.js'
const overlookImage = document.querySelector('.popup__image')
const overlookName = document.querySelector('.popup__name')
const overlook = document.querySelector('.popup_overlook')

export default class Card {
  constructor({ name, link }, templateSelector) {
    this._name = name
    this._link = link
    this._templateSelector = templateSelector
  }

  _getTemplate() {
    const cardElement = this._templateSelector.cloneNode(true)
    return cardElement
  }

  createNewCard() {
    this._element = this._getTemplate()
    this._setEventListeners()

    this._element.querySelector('.places__image').src = this._link
    this._element.querySelector('.places__name').textContent = this._name
    this._element.querySelector('.places__image').alt = this._name

    return this._element
  }

  _setEventListeners() {
    this._element
      .querySelector('.places__like')
      .addEventListener('click', (e) => e.target.classList.toggle('places__like_state_active'))
    this._element
      .querySelector('.places__delete')
      .addEventListener('click', (e) => e.target.closest('.places__item').remove())

    this._element.querySelector('.places__overlook').addEventListener('click', () => {
      overlookImage.src = this._link
      overlookName.textContent = this._name
      overlookImage.alt = this._name
      openPopup(overlook)
    })
  }
}
