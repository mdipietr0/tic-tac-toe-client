'use strict'

const {DEBUG, apiUrl} = require('../config')
const store = require('../store')
const signUp = function (data) {
  DEBUG && console.log('api signUp')
  return $.ajax({
    data,
    method: 'POST',
    url: apiUrl + 'sign-up'
  })
}

const signIn = function (data) {
  DEBUG && console.log('api signIn')
  return $.ajax({
    data,
    method: 'POST',
    url: apiUrl + 'sign-in'
  })
}

const signOut = function () {
  DEBUG && console.log('api signOut')
  return $.ajax({
    headers: {
      'Authorization': 'Token token=' + store.user.token
    },
    method: 'DELETE',
    url: apiUrl + 'sign-out'
  })
}

const changePassword = function (data) {
  DEBUG && console.log('api changePassword')
  return $.ajax({
    data,
    headers: {
      'Authorization': 'Token token=' + store.user.token
    },
    method: 'PATCH',
    url: apiUrl + 'change-password'
  })
}

module.exports = {
  signUp,
  signIn,
  changePassword,
  signOut
}
