const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`)

  inputElement.classList.add('popup__input_type_error')
  errorElement.textContent = errorMessage

  errorElement.classList.add('popup__input-error_active')
}

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`)

  inputElement.classList.remove('popup__input_type_error')
  errorElement.textContent = ''
  errorElement.classList.remove('popup__input-error_active')
}

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid
  })
}

const toggleButtonState = (inputList, buttonElement) => {
  console.log(buttonElement.closest('.popup__form'))
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add('popup__button_inactive')
    buttonElement.disabled = true
    // buttonElement.closest('.popup__form').disabled = true
  } else {
    buttonElement.classList.remove('popup__button_inactive')
    // buttonElement.closest('.popup__form').disabled = false
    buttonElement.disabled = false
  }
}

const isValid = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage)
  } else {
    hideInputError(formElement, inputElement)
  }
}

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'))

  const buttonElement = formElement.querySelector('.popup__button_save')
  toggleButtonState(inputList, buttonElement)

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement)

      toggleButtonState(inputList, buttonElement)
    })
  })
}

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.popup__form'))

  formList.forEach((formElement) => {
    setEventListeners(formElement)
  })
}

enableValidation()
