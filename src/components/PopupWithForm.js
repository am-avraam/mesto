import Popup from './Popup'
export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitFormCallback) {
    super(popupSelector)

    this.handleFormSubmit = submitFormCallback
    this._form = this._popup.querySelector('form')
    this._inputList = this._popup.querySelectorAll('.popup__input')
    this.button = this._popup.querySelector('.popup__button_save')
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
      if (this._popup.classList.contains('popup-update')) {
        const newSrc = this._getInputValues()
        this.handleFormSubmit(newSrc)
      } else if (!this._popup.classList.contains('popup-confirmation')) {
        let newInfo = { ...this._getInputValues(), isMyCard: true }
        this.handleFormSubmit(newInfo)
      } else {
        this.handleFormSubmit(this.aimCard._id)
      }
    })
    super.setEventListeners()
  }

  close() {
    if (!this._popup.classList.contains('popup-confirmation')) {
      this._form.reset()
    }
    super.close()
  }
}
