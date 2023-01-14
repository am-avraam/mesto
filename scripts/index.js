const editButton = document.querySelector('.profile__button_edit')
const closeButton = document.querySelector('.popup__button_close')
const popup = document.querySelector('.popup')

const formElement = document.querySelector('.popup__form')

const nameInput = document.querySelector('.popup__name')
const jobInput = document.querySelector('.popup__about')

const nameTitle = document.querySelector('.profile__name')
const aboutTitle = document.querySelector('.profile__about')

const clickHandler = (evt) => {
  evt.preventDefault()
  if (popup.style.display === 'block') popup.style.display = 'none'
  else popup.style.display = 'block'

  if (evt.target.classList.contains('popup__button_close')) {
    nameInput.value = nameTitle.textContent
    jobInput.value = aboutTitle.textContent
  }
}

editButton.addEventListener('click', clickHandler)
closeButton.addEventListener('click', clickHandler)

function handleFormSubmit(evt) {
  evt.preventDefault()
  const receivedName = nameInput.value
  const receivedAbout = jobInput.value

  nameTitle.textContent = receivedName
  aboutTitle.textContent = receivedAbout
  popup.style.display = 'none'
}

formElement.addEventListener('submit', handleFormSubmit)
