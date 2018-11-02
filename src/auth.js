const axios = require('axios')
const Axios = axios.create({
  baseURL: 'https://api.thegrowthapp.com/v1'
})

const resources = ['refresh_token', 'login', 'signup']

class Auth {
  constructor() {
    this._endpoints = entities.reduce((obj, entity) => {
      obj[entity] = (data, config = {}) => Axios.post(`/${entity}`, data, config)
      return obj
    }, {})
  }

  get endpoints() {
    return this._endpoints
  }
}
