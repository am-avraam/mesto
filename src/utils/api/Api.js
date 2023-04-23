import axios from 'axios'

export default axios.create({
  baseURL: 'https://nomoreparties.co/v1/cohort-64',
  responseType: 'json',
  headers: {
    Authorization: '33fbf74b-a805-4063-8711-2b52c1f91b13',
  },
})

export class Api {
  constructor(options) {
    this.configured = axios.create(options)
  }

  async getUser(nameSelector, avaSelector, aboutSelector) {
    try {
      const response = await this.configured.get('/users/me')
      const { name, avatar, about, _id } = response.data

      avaSelector.src = avatar
      nameSelector.textContent = name
      aboutSelector.textContent = about
      return { name, _id }
    } catch (error) {
      console.error(error)
    }
  }

  async getInitialCards(myName) {
    try {
      const response = await this.configured.get('/cards')
      const initCards = response.data.map((el) => {
        const { link, name, likes, _id } = el
        let isMyCard = el.owner.name === myName ? true : false
        return { link, name, likes, _id, isMyCard }
      })
      return initCards
    } catch (error) {
      console.error(error)
    }
  }

  async postCard(data) {
    try {
      const { data: newCard } = await this.configured.post('/cards', { ...data })
      return newCard
    } catch (error) {
      console.error(error)
    }
  }

  patchUser = async (newInfo) => {
    try {
      await this.configured.patch('/users/me', { ...newInfo })
    } catch (error) {
      console.error(error)
    }
  }

  deleteCard = async (cardId) => {
    try {
      await this.configured.delete(`/cards/${cardId}`)
    } catch (error) {
      console.error(error)
    }
  }

  likeCard = async (cardId) => {
    try {
      const { data } = await this.configured.put(`/cards/${cardId}/likes`)
      return data.likes
    } catch (error) {
      console.error(error)
    }
  }

  deleteLikeCard = async (cardId) => {
    try {
      const { data } = await this.configured.delete(`/cards/${cardId}/likes`)
      return data.likes
    } catch (error) {
      console.error(error)
    }
  }

  async changeAvatar(src) {
    try {
      const { data } = await this.configured.patch('users/me/avatar', {
        avatar: src,
      })
      return data
    } catch (error) {
      console.error(error)
    }
  }
}
