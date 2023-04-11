import Popup from './Popup'
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
