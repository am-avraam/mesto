class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector)
    this._closeButton = this._popup.querySelector('.popup__button_close')
  }

  open = () => {
    this._popup.classList.add('popup_opened')
    document.addEventListener('keydown', this._handleEscClose)
  }

  close = () => {
    this._popup.classList.remove('popup_opened')
    document.removeEventListener('keydown', this._handleEscClose)
  }

  _handleEscClose = (event) => {
    if (event.key === 'Escape') {
      this.close()
    }
  }

  _closeByOutClick = (event) => {
    if (!event.target.closest('.popup__container') && !event.target.closest('.popup__wrapper')) {
      this.close()
    }
  }

  setEventListeners() {
    this._closeButton.addEventListener('click', this.close)
    this._popup.addEventListener('click', this._closeByOutClick)
  }
}

export default Popup

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector)
  }

  open(src, sign) {
    const image = document.createElement('img')
    image.src = src
    const signToImage = document.createElement('p')
    signToImage.innerHTML = sign

    this._popup.append(image, signToImage)

    super.open()
  }
}

export class PopupWithForm extends Popup {
  constructor(popupSelector, submitFormCallback) {
    super(popupSelector)
    this.handleFormSubmit = submitFormCallback
    this._form = this._popup.querySelector('form')
  }

  _getInputValues = () => {
    const data = {}
    Array.from(this._popup.forms.elements).forEach((el) => {
      const { name, value } = el
      data[name] = value
    })
    console.log(data)
  }

  setEventListeners = () => {
    this._form.addEventListener('submit', this.handleFormSubmit)
    super.setEventListeners()
  }

  close() {
    this._form.reset()
    console.log(super.stop)
    super.close()
  }
}
