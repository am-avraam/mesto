export class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl
    this._headers = options.headers
  }

  async getUser(nameSelector, avaSelector, aboutSelector) {
    let data
    try {
      const response = await fetch(this._baseUrl + '/users/me', {
        headers: this._headers,
      })
      if (response.ok) {
        data = await response.json()

        const { name, avatar, about, _id } = data

        avaSelector.src = avatar
        nameSelector.textContent = name
        aboutSelector.textContent = about
        return { name, _id }
      }

      return Promise.reject(`Ошибка: ${response.status}`)
    } catch (error) {
      console.error(error)
    }
  }

  async getInitialCards(myName) {
    let data
    try {
      const response = await fetch(this._baseUrl + '/cards', { headers: this._headers })

      if (response.ok) {
        data = await response.json()
        const initCards = data.map((el) => {
          const { link, name, likes, _id } = el
          let isMyCard = el.owner.name === myName ? true : false
          return { link, name, likes, _id, isMyCard }
        })
        return initCards
      }

      return Promise.reject(`Ошибка: ${response.status}`)
    } catch (error) {
      console.error(error)
    }
  }

  async postCard(data) {
    let newCard
    try {
      const response = await fetch(this._baseUrl + '/cards', {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify(data),
      })
      if (response.ok) {
        newCard = await response.json()
        return newCard
      }

      return Promise.reject(`Ошибка: ${response.status}`)
    } catch (error) {
      console.error(error)
    }
  }

  patchUser = async (newInfo) => {
    try {
      const response = await fetch(this._baseUrl + '/users/me', {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify(newInfo),
      })
      await response.json()
      if (!response.ok) return Promise.reject(`Ошибка: ${response.status}`)
    } catch (error) {
      console.error(error)
    }
  }

  deleteCard = async (cardId) => {
    try {
      const response = await fetch(this._baseUrl + `/cards/${cardId}`, {
        method: 'DELETE',
        headers: this._headers,
      })

      if (!response.ok) return Promise.reject(`Ошибка: ${response.status}`)
    } catch (error) {
      console.error(error)
    }
  }

  likeCard = async (cardId) => {
    try {
      const response = await fetch(this._baseUrl + `/cards/${cardId}/likes`, {
        method: 'PUT',
        headers: this._headers,
      })
      if (response.ok) {
        const data = await response.json()
        return data.likes
      }

      return Promise.reject(`Ошибка: ${response.status}`)
    } catch (error) {
      console.error(error)
    }
  }

  deleteLikeCard = async (cardId) => {
    try {
      const response = await fetch(this._baseUrl + `/cards/${cardId}/likes`, {
        method: 'DELETE',
        headers: this._headers,
      })
      if (response.ok) {
        const data = await response.json()
        return data.likes
      }

      return Promise.reject(`Ошибка: ${response.status}`)
    } catch (error) {
      console.error(error)
    }
  }

  async changeAvatar(src) {
    try {
      const response = await fetch(this._baseUrl + '/users/me/avatar', {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({ avatar: src }),
      })

      if (response.ok) {
        const data = await response.json()
        return data
      }

      return Promise.reject(`Ошибка: ${response.status}`)
    } catch (error) {
      console.error(error)
    }
  }
}
