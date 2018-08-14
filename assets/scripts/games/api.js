'use strict'

const {apiUrl} = require('../config')
const store = require('../store')
const {console} = require('../config')

const index = function () {
  console.log('games api index')
  return $.ajax({
    method: 'GET',
    headers: {
      'Authorization': 'Token token=' + store.user.token
    },
    url: apiUrl + 'games'
  })
}

const create = function () {
  console.log('games api create')
  return $.ajax({
    method: 'POST',
    headers: {
      'Authorization': 'Token token=' + store.user.token
    },
    url: apiUrl + 'games'
  })
}

const show = function (id) {
  console.log('games api create')
  console.log(id)
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
