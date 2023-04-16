import Popup from './Popup'
export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitFormCallback) {
    super(popupSelector)
    this.handleFormSubmit = submitFormCallback
    this._form = this._popup.querySelector('form')
    this._inputList = this._popup.querySelectorAll('.popup__input')
  }

  _getInputValues() {
    this._formValues = {}

    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value
    })

    return this._formValues
  }

  setEventListeners = () => {
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault()
      const newInfo = this._getInputValues()
      this.handleFormSubmit(newInfo)
    })
    super.setEventListeners()
  }

  close() {
    this._form.reset()
    super.close()
  }
}
