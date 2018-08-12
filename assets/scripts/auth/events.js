'use strict'
const getFormFields = require('../../../lib/get-form-fields')
const api = require('./api')
const ui = require('./ui')

const onSignUp = function (e) {
  console.log('events onSignUp!')
  e.preventDefault()
  const data = getFormFields(e.target)
  api.signUp(data)
    .then(ui.onSignUpSuccess)
    .then(function () {
      api.signIn(data)
        .then(ui.onSignInSuccess)
        .catch(ui.onSignInFailure)
    })
    .catch(ui.onSignUpFailure)
}

const onSignIn = function (e) {
  e.preventDefault()
  console.log('events onSignIn')
  const data = getFormFields(e.target)
  api.signIn(data)
    .then(ui.onSignInSuccess)
    .catch(ui.onSignInFailure)
}

const onSignOut = function (e) {
  e.preventDefault()
  console.log('sign out!')
  api.signOut()
    .then(ui.onSignOutSuccess)
    .catch(ui.onSignOutSuccess)
}

const onChangePassword = function (e) {
  e.preventDefault()
  console.log('changePassword!')
  const data = getFormFields(e.target)
  api.changePassword(data)
    .then(ui.onChangePasswordSuccess)
    .catch(ui.onChangePasswordFailure)
}

const addHandlers = function () {
  $('#sign-up').on('submit', onSignUp)
  $('#sign-in').on('submit', onSignIn)
  $('#sign-out').on('click', onSignOut)
  $('#change-password').on('submit', onChangePassword)
  console.log('addHandlers')
}

module.exports = {
  addHandlers
}
