'use strict'
const {console} = require('../config')
const {apiUrl} = require('../config')
const store = require('../store')

const signUp = function (data) {
  console.log('api signUp')
  return $.ajax({
    data,
    method: 'POST',
    url: apiUrl + 'sign-up'
  })
}

const signIn = function (data) {
  console.log('api signIn')
  return $.ajax({
    data,
    method: 'POST',
    url: apiUrl + 'sign-in'
  })
}

const signOut = function () {
  console.log('api signOut')
  return $.ajax({
    headers: {
      'Authorization': 'Token token=' + store.user.token
    },
    method: 'DELETE',
    url: apiUrl + 'sign-out'
  })
}

const changePassword = function (data) {
  console.log('api changePassword')
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
