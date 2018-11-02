import Auth from './auth'

const axios = require('axios')
const Axios = axios.create({
  baseURL: 'https://api.thegrowthapp.com/v1'
})

const entities = ['action_items', 'clients', 'collaborations', 'events', 'goals', 'growthbooks', 'logs', 'metrics', 'schedulings', 'users', 'webhooks']

class TheGrowthApp {
  constructor() {
    this._endpoints = entities.reduce((obj, entity) => {
      obj[entity] = this.createCRUDEndpoints(entity)
      return obj
    }, {})
    this._endpoints['auth'] = new Auth()
  }

  get endpoints() {
    return this._endpoints
  }

  auth(access_token) {
    Axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`
  }

  createCRUDEndpoints(entity) {
    let endpoints = {}
    const resourceURL = `/${entity}`

    endpoints.getAll = (config = {}) => Axios.get(resourceURL, config)
    endpoints.get = (id, config = {}) => Axios.get(`${resourceURL}/${id}`, config)
    endpoints.create = (data, config = {}) => Axios.post(resourceURL, data, config)
    endpoints.update = (data, config = {}) => Axios.put(`${resourceURL}/${data.id}`, data, config)
    endpoints.delete = (id, config = {}) => Axios.delete(`${resourceURL}/${id}`, config)

    return endpoints
  }
}
