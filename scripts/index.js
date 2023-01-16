const page = document.querySelector('html')
const editButton = document.querySelector('.profile__button_edit')
const closeButton = document.querySelector('.popup__button_close')
const popup = document.querySelector('.popup')

const formElement = document.querySelector('.popup__form')

const nameInput = document.querySelector('.popup__input_field_name')
const jobInput = document.querySelector('.popup__input_field_about')

const nameTitle = document.querySelector('.profile__name')
const aboutTitle = document.querySelector('.profile__about')

const openPopup = () => {
  popup.classList.add('popup_opened')
  page.style.overflow = 'hidden' // инициативу проявлять запрещено? почему это лишний код?

  nameInput.value = nameTitle.textContent
  jobInput.value = aboutTitle.textContent
}

const closePopup = () => {
  popup.classList.remove('popup_opened')
  page.style.overflow = 'scroll'
}

function handleFormSubmit(evt) {
  evt.preventDefault()

  nameTitle.textContent = nameInput.value
  aboutTitle.textContent = jobInput.value
  closePopup(evt)
}

editButton.addEventListener('click', openPopup)
closeButton.addEventListener('click', closePopup)
formElement.addEventListener('submit', handleFormSubmit)
