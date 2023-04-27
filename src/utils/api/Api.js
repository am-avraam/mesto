export class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl
    this._headers = options.headers
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`)
    }
    return res.json()
  }

  async getUser() {
    const response = await fetch(this._baseUrl + '/users/me', {
      headers: this._headers,
    })

    const data = await this._getResponseData(response)

    return data
  }

  async getInitialCards() {
    const response = await fetch(this._baseUrl + '/cards', { headers: this._headers })

    const initCards = await this._getResponseData(response)

    return initCards
  }

  async postCard(data) {
    const response = await fetch(this._baseUrl + '/cards', {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(data),
    })

    const newCard = await this._getResponseData(response)

    return newCard
  }

  patchUser = async (newInfo) => {
    const response = await fetch(this._baseUrl + '/users/me', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(newInfo),
    })

    const data = await this._getResponseData(response)

    return data
  }

  deleteCard = async (cardId) => {
    const response = await fetch(this._baseUrl + `/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    })

    const data = await this._getResponseData(response)
    return data
  }

  likeCard = async (cardId) => {
    const response = await fetch(this._baseUrl + `/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this._headers,
    })

    const data = await this._getResponseData(response)

    return data
  }

  deleteLikeCard = async (cardId) => {
    const response = await fetch(this._baseUrl + `/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._headers,
    })

    const data = await this._getResponseData(response)
    return data
  }

  async changeAvatar(src) {
    const response = await fetch(this._baseUrl + '/users/me/avatar', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({ avatar: src }),
    })

    const data = await this._getResponseData(response)

    return data
  }
}
