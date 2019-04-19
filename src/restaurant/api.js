import apiUrl from '../apiConfig'
import axios from 'axios'

export const showRestaurants = (user) => {
  return axios({
    method: 'GET',
    url: apiUrl + '/restaurants/',
    headers: {
      'Authorization': `Token token=${user.token}`
    }
  })
}

export const showOneRestaurant = (user, id) => {
  return axios({
    method: 'GET',
    url: apiUrl + `/restaurants/${id}`,
    headers: {
      'Authorization': `Token token=${user.token}`
    }
  })
}

export const createRestaurant = (user, restaurantData) => {
  return axios({
    method: 'POST',
    url: apiUrl + '/restaurants/',
    headers: {
      'Authorization': `Token token=${user.token}`
    },
    data: restaurantData
  })
}

export const updateRestaurant = (user, restaurantData) => {
  const id = restaurantData.restaurant.id
  return axios({
    method: 'PATCH',
    url: apiUrl + `/restaurants/${id}`,
    headers: {
      'Authorization': `Token token=${user.token}`
    },
    data: restaurantData
  })
}

export const deleteRestaurant = (user, id) => {
  return axios({
    method: 'DELETE',
    url: apiUrl + `/restaurants/${id}`,
    headers: {
      'Authorization': `Token token=${user.token}`
    },
    contentType: 'application/json'
  })
}

export const searchYelp = (search, user) => {
  return axios({
    url: apiUrl + '/yelp-search',
    method: 'POST',
    headers: {
      'Authorization': `Token token=${user.token}`
    },
    data: { search }
  })
}

export const addRestaurant = (restaurant, user) => {
  return axios({
    url: apiUrl + '/restaurants',
    method: 'POST',
    headers: {
      'Authorization': `Token token=${user.token}`
    },
    data: { restaurant }
  })
}
