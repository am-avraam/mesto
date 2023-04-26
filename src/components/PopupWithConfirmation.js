import PopupWithForm from './PopupWithForm'

export default class PopupWithConfirmation extends PopupWithForm {
  constructor(popupSelector, submitFormCallback) {
    super(popupSelector, submitFormCallback)
  }
}
