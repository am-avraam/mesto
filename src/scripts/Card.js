const overlookImage = document.querySelector('.popup__image')
const overlookName = document.querySelector('.popup__name')

export default class Card {
  constructor({ name, link }, templateSelector, handleCardClick) {
    this._name = name
    this._link = link
    this._templateSelector = templateSelector
    this._handleCardClick = handleCardClick
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector('.places__item')
      .cloneNode(true)
    return cardElement
  }

  createNewCard() {
    this._element = this._getTemplate()
    this._buttonLike = this._element.querySelector('.places__like')
    this._setEventListeners()

    this._cardImage = this._element.querySelector('.places__image')
    this._cardImage.src = this._link
    this._element.querySelector('.places__name').textContent = this._name
    this._cardImage.alt = this._name

    return this._element
  }

  _likeToggle(e) {
    this._buttonLike.classList.toggle('places__like_state_active')
  }

  _handleDeleteButton(e) {
    this._element.remove()
    this._element = null
  }

  _openOverlook() {
    overlookImage.src = this._link
    overlookName.textContent = this._name
    overlookImage.alt = this._name
    this._handleCardClick()
  }

  _setEventListeners() {
    this._buttonLike = this._element.querySelector('.places__like')
    this._buttonLike.addEventListener('click', (evt) => this._likeToggle(evt))
    this._element.querySelector('.places__delete').addEventListener('click', () => this._handleDeleteButton())
    this._element.querySelector('.places__overlook').addEventListener('click', () => this._openOverlook())
  }
}
