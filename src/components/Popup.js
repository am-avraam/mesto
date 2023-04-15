class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector)
    this._closeButton = this._popup.querySelector('.popup__button_close')
  }

  open() {
    this._popup.classList.add('popup_opened')
    document.addEventListener('keydown', this._handleEscClose)
  }

  close() {
    this._popup.classList.remove('popup_opened')
    document.removeEventListener('keydown', this._handleEscClose)
  }

  _handleEscClose = (event) => {
    if (event.key === 'Escape') {
      this.close()
    }
  }

  _closeByOutClick = (event) => {
    if (event.target === this._popup) {
      this.close()
    }
  }

  setEventListeners() {
    this._closeButton.addEventListener('click', () => this.close())
    this._popup.addEventListener('click', this._closeByOutClick)
  }
}

export default Popup
