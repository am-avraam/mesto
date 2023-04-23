export default class Card {
  constructor(
    { name, link, isMyCard, likes, _id },
    templateSelector,
    handleCardClick,
    handleCardDelete,
    handleLikeRequest,
    handleDislikeRequest,
    myId
  ) {
    this._name = name
    this._isMyCard = isMyCard
    this._link = link
    this._likes = likes
    this._id = _id
    this._templateSelector = templateSelector
    this._handleCardClick = handleCardClick
    this._handleCardDelete = handleCardDelete
    this._handleLikeRequest = handleLikeRequest
    this._handleDislikeRequest = handleDislikeRequest
    this.myId = myId
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

    if (this._isMyCard) {
      this._element.insertAdjacentHTML('afterbegin', '<button class="places__delete"></button>')
    }
    this._buttonLike = this._element.querySelector('.places__like')
    this._likesCount = this._element.querySelector('.places__count-like')
    this._likesCount.textContent = this._likes.length
    if (this._likes.find((person) => person._id === this.myId)) {
      this._buttonLike.classList.add('places__like_state_active')
    }
    this._setEventListeners()

    this._cardImage = this._element.querySelector('.places__image')
    this._cardImage.src = this._link
    this._element.querySelector('.places__name').textContent = this._name
    this._cardImage.alt = this._name

    return this._element
  }

  _setLikesCount = (likes) => {
    this._likes = likes
    this._likesCount.textContent = this._likes.length
  }

  _toggleLike(e) {
    if (this._buttonLike.classList.contains('places__like_state_active')) {
      this._handleDislikeRequest(this._id).then(this._setLikesCount)
    } else {
      this._handleLikeRequest(this._id).then(this._setLikesCount)
    }
    this._buttonLike.classList.toggle('places__like_state_active')
  }

  _handleDeleteButton(e) {
    this._handleCardDelete(this._id)
  }

  _openOverlook = () => {
    this._handleCardClick(this._link, this._name)
  }

  _setEventListeners() {
    this._buttonLike.addEventListener('click', (evt) => this._toggleLike(evt))
    if (this._isMyCard) {
      this._element.querySelector('.places__delete').addEventListener('click', () => this._handleDeleteButton())
    }
    this._element.querySelector('.places__overlook').addEventListener('click', () => this._openOverlook())
  }
}
