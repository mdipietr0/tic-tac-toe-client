'use strict'

const {DEBUG} = require('../config')
const store = require('../store')
const {flash} = require('../templates/helpers/flash')

const onSignUpSuccess = function () {
  DEBUG && console.log('onSignUpSuccess')
  $('#registerModal').modal('hide')
  $('#sign-up input').val('')
  $('#register').addClass('hidden')
  $('#login').addClass('hidden')
  $('#sign-out').removeClass('hidden')
  $('#change-password-btn').removeClass('hidden')
  flash(true, 'Successfully signed up')
  return new Promise((resolve, reject) => resolve())
}

const onSignUpFailure = function () {
  DEBUG && console.log('onSignUpFailure')
  $('#sign-up input').val('')
  flash(false, 'Unable to Sign up!')
}

const onSignInSuccess = function (response) {
  DEBUG && console.log(response.user.token)
  DEBUG && console.log('onSignInSuccess')
  store.user = response.user
  $('#loginModal').modal('hide')
  $('#sign-in input').val('')
  $('#register').addClass('hidden')
  $('#login').addClass('hidden')
  $('#sign-out').removeClass('hidden')
  $('#change-password-btn').removeClass('hidden')
  $('#game-container').removeClass('hidden')
  flash(true, 'Successfully signed in!')
}

const onSignInFailure = function () {
  DEBUG && console.log('onSignInFailure')
  $('#sign-in input').val('')
  flash(false, 'Unable to Sign in!')
}

const onChangePasswordSuccess = function () {
  DEBUG && console.log('onChangePasswordSuccess')
  $('#changePasswordModal').modal('hide')
  $('#change-password input').val('')
  flash(true, 'Successfully changed password!')
}

const onChangePasswordFailure = function () {
  DEBUG && console.log('onChangePasswordFailure')
  $('#change-password input').val('')
  flash(false, 'Password change unsuccessful')
}

const onSignOutSuccess = function () {
  DEBUG && console.log('onSignOutSuccess')
  $('#register').removeClass('hidden')
  $('#login').removeClass('hidden')
  $('#sign-out').addClass('hidden')
  $('#change-password-btn').addClass('hidden')
  $('#sign-out input').val('')
  $('#game-container').addClass('hidden')
  flash(true, 'Successfully signed out!')
}

const onSignOutFailure = function () {
  DEBUG && console.log('onSignOutFailure')
  $('#sign-out input').val('')
  flash(false, 'Sign out unsuccessful!')
}
module.exports = {
  onSignUpSuccess,
  onSignUpFailure,
  onSignInSuccess,
  onSignInFailure,
  onChangePasswordSuccess,
  onChangePasswordFailure,
  onSignOutSuccess,
  onSignOutFailure
}
