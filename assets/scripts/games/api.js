'use strict'

const {apiUrl, DEBUG} = require('../config')
const store = require('../store')

const index = function () {
  DEBUG && console.log('games api index')
  return $.ajax({
    method: 'GET',
    headers: {
      'Authorization': 'Token token=' + store.user.token
    },
    url: apiUrl + 'games'
  })
}

const create = function () {
  DEBUG && console.log('games api create')
  return $.ajax({
    method: 'POST',
    headers: {
      'Authorization': 'Token token=' + store.user.token
    },
    url: apiUrl + 'games'
  })
}

const show = function (id) {
  DEBUG && console.log('games api create')
  DEBUG && console.log(id)
  return $.ajax({
    method: 'GET',
    headers: {
      'Authorization': 'Token token=' + store.user.token
    },
    url: apiUrl + 'games/' + id
  })
}

const update = function (data) {
  console.log('games api update')
  console.log(data)
  return $.ajax({
    data,
    method: 'PATCH',
    headers: {
      'Authorization': 'Token token=' + store.user.token
    },
    url: apiUrl + 'games/' + data.id
  })
}

module.exports = {
  index,
  create,
  show,
  update
}
