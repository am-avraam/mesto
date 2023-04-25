import Popup from './Popup'
export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitFormCallback) {
    super(popupSelector)

    this.handleFormSubmit = submitFormCallback
    this._form = this._popup.querySelector('form')
    this._inputList = this._popup.querySelectorAll('.popup__input')
    this._button = this._popup.querySelector('.popup__button_save')
  }

  getInputValues() {
    this._formValues = {}

    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value
    })

    return this._formValues
  }

  setButtonText(text) {
    this._button.textContent = text
  }

  removeAimCard() {
    this.aimCard._element.remove()
    this.aimCard._element = null
    this.aimCard = null
  }

  getAimCard() {
    return this.aimCard?._id
  }

  setEventListeners = () => {
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault()
      this.handleFormSubmit()
    })

    super.setEventListeners()
  }

  close() {
    this._form.reset()
    super.close()
  }
}
