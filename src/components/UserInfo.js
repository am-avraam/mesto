export default class UserInfo {
  constructor({ name, personal, id }) {
    this._name = name
    this._personal = personal
    this._id = id
  }

  getUserInfo() {
    return { name: this._name.textContent, personal: this._personal.textContent, id: this._id }
  }

  setUserInfo({ name, about }) {
    this._name.textContent = name
    this._personal.textContent = about
  }
}
