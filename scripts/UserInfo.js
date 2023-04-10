export default class UserInfo {
  constructor({ name, personal }) {
    this._name = name
    this._personal = personal
  }

  getUserInfo() {
    return { name: this._name.textContent, personal: this._personal.textContent }
  }

  setUserInfo({ name, personal }) {
    this._name.textContent = name
    this._personal.textContent = personal
  }
}
