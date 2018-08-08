'use strict'
const getFormFields = require('../../../lib/get-form-fields')
const api = require('./api')
const ui = require('./ui')
const {DEBUG} = require('../config')

const onSignUp = function (e) {
  DEBUG && console.log('events onSignUp!')
  e.preventDefault()
  const data = getFormFields(e.target)
  api.signUp(data)
    .then(ui.onSignUpSuccess)
    .catch(ui.onSignUpFailure)
}

const onSignIn = function (e) {
  e.preventDefault()
  DEBUG && console.log('events onSignIn')
  const data = getFormFields(e.target)
  api.signIn(data)
    .then(ui.onSignInSuccess)
    .catch(ui.onSignInFailure)
}

const onSignOut = function (e) {
  e.preventDefault()
  DEBUG && console.log('sign out!')
  api.signOut()
    .then(ui.onSignOutSuccess)
    .catch(ui.onSignOutFailure)
}

const onChangePassword = function (e) {
  e.preventDefault()
  DEBUG && console.log('changePassword!')
  const data = getFormFields(e.target)
  api.changePassword(data)
    .then(ui.onChangePasswordSuccess)
    .catch(ui.onChangePasswordFailure)
}

const addHandlers = function () {
  $('#sign-up').on('submit', onSignUp)
  $('#sign-in').on('submit', onSignIn)
  $('#sign-out').on('submit', onSignOut)
  $('#change-password').on('submit', onChangePassword)
  DEBUG && console.log('addHandlers')
}

module.exports = {
  addHandlers
}
