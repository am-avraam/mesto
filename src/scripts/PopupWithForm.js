import Popup from './Popup'
export class PopupWithForm extends Popup {
  constructor(popupSelector, submitFormCallback) {
    super(popupSelector)
    this.handleFormSubmit = submitFormCallback
    this._form = this._popup.querySelector('form')
  }

  _getInputValues = () => {
    const data = {}
    Array.from(this._popup.forms.elements).forEach((el) => {
      const { name, value } = el
      data[name] = value
    })
    console.log(data)
  }

  setEventListeners = () => {
    this._form.addEventListener('submit', this.handleFormSubmit)
    super.setEventListeners()
  }

  close() {
    this._form.reset()
    console.log(super.stop)
    super.close()
  }
}
