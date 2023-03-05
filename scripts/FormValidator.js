export default class FormValidator {
  constructor(settings, formElement) {
    this._settings = settings
    this._formElement = formElement
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`)

    inputElement.classList.add(this._settings.inputErrorClass)
    errorElement.textContent = errorMessage

    errorElement.classList.add(this._settings.errorClass)
  }

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`)

    inputElement.classList.remove(this._settings.inputErrorClass)
    errorElement.textContent = ''
    errorElement.classList.remove(this._settings.errorClass)
  }

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid
    })
  }

  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._settings.inactiveButtonClass)
      buttonElement.disabled = true
    } else {
      buttonElement.classList.remove(this._settings.inactiveButtonClass)
      buttonElement.disabled = false
    }
  }

  _isValid(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage)
    } else {
      this._hideInputError(inputElement)
    }
  }

  _setEventListeners() {
    const inputList = Array.from(this._formElement.querySelectorAll(this._settings.inputSelector))

    const buttonElement = this._formElement.querySelector(this._settings.submitButtonSelector)
    this._toggleButtonState(inputList, buttonElement)

    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._isValid(inputElement)

        this._toggleButtonState(inputList, buttonElement)
      })
    })
  }

  enableValidation() {
    this._setEventListeners()
  }
}
