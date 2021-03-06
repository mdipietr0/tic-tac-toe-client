'use strict'

const store = require('../store')
const {flash} = require('../templates/helpers/flash')
const {console} = require('../config')

const onSignUpSuccess = function () {
  console.log('onSignUpSuccess')
  $('#registerModal').modal('hide')
}

const onSignUpFailure = function () {
  console.log('onSignUpFailure')
  $('#sign-up input').val('')
  flash(false, 'Unable to Sign up!')
}

const onSignInSuccess = function (response) {
  console.log(response.user.token)
  console.log('onSignInSuccess')
  store.user = response.user
  $('#username').text(store.user.email)
  $('#userLabel').text(store.user.email)
  $('#welcome').removeClass('hidden')
  $('#loginModal').modal('hide')
  $('#sign-in input').val('')
  $('#register').addClass('hidden')
  $('#login').addClass('hidden')
  $('#sign-out').removeClass('hidden')
  $('#change-password-btn').removeClass('hidden')
  $('#game-buttons').removeClass('hidden')
  $('.home').removeClass('hidden')
  $('.landing-container').addClass('hidden')
  $('#title-logo').addClass('hidden')
  $('.menu-container').removeClass('hidden')
  // $('#game-container').removeClass('hidden')
  // flash(true, 'Successfully signed in!')
}

const onSignInFailure = function () {
  console.log('onSignInFailure')
  $('#sign-in input').val('')
  flash(false, 'Unable to Sign in!')
}

const onChangePasswordSuccess = function () {
  console.log('onChangePasswordSuccess')
  $('#changePasswordModal').modal('hide')
  $('#change-password input').val('')
  flash(true, 'Successfully changed password!')
}

const onChangePasswordFailure = function () {
  console.log('onChangePasswordFailure')
  $('#change-password input').val('')
  flash(false, 'Password change unsuccessful')
}

const onSignOutSuccess = function () {
  console.log('onSignOutSuccess')
  $('#title-logo').removeClass('hidden')
  $('#register').removeClass('hidden')
  $('#login').removeClass('hidden')
  $('#sign-out').addClass('hidden')
  $('#change-password-btn').addClass('hidden')
  $('#sign-out input').val('')
  $('#game-buttons').addClass('hidden')
  $('#game-list').addClass('hidden')
  $('#game-container').addClass('hidden')
  $('#winner-banner').addClass('hidden')
  $('#welcome').addClass('hidden')
  $(`#counterX`).text(0)
  $(`#counterO`).text(0)
  $(`#main-menu`).addClass('hidden')
  $('.home').addClass('hidden')
  $('.landing-container').removeClass('hidden')
  $('.menu-container').addClass('hidden')
  store.user = {}
  for (let i = 0; i < 9; i++) {
    $(`#box-${i}`).find('.token').text('')
    $(`#box-${i}`).find('.token').addClass('hidden')
  }
  // flash(true, 'Successfully signed out!')
}

const onSignOutFailure = function () {
  console.log('onSignOutFailure')
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
