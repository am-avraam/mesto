export default class UserInfo {
  constructor({ name, personal, avatar }) {
    this._name = name
    this._personal = personal
    this._avatar = avatar
  }

  getUserInfo() {
    return { name: this._name.textContent, personal: this._personal.textContent, id: this._id }
  }

  setUserInfo({ name, about, _id, avatar }) {
    this._name.textContent = name
    this._personal.textContent = about
    this._id = _id ? _id : this._id
    this._avatar.src = avatar ? avatar : this._avatar.src
  }
}
