import Popup from './Popup'

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, submitFormCallback) {
    super(popupSelector)
    this._form = this._popup.querySelector('form')
    this.confirmCallback = submitFormCallback
  }

  removeAimCard() {
    this._aimCard.deleteItself()
  }

  getAimCard() {
    return this._aimCard.getCardId()
  }

  setAimCard(aimCard) {
    this._aimCard = aimCard
  }

  setEventListeners = () => {
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault()
      this.confirmCallback(this.getAimCard())
    })

    super.setEventListeners()
  }
}
