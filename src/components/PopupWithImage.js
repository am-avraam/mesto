import Popup from './Popup'
export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector)
    this.overlookImage = this._popup.querySelector('.popup__image')
    this.overlookName = this._popup.querySelector('.popup__name')
  }

  open = (src, sign) => {
    this.overlookImage.src = src
    this.overlookName.textContent = sign
    this.overlookImage.alt = sign
    super.open()
  }
}
