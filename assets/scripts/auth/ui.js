'use strict'

const {DEBUG} = require('../config')
const store = require('../store')

const onSignUpSuccess = function () {
  DEBUG && console.log('onSignUpSuccess')
  $('#sign-up input').val('')
  $('#auth-flash').removeClass()
  $('#auth-flash').addClass('success')
  $('#auth-flash').text('Successfully signed up!')
  setTimeout(function () {
    $('#auth-flash').text('')
  }, 3000)
}

const onSignUpFailure = function () {
  DEBUG && console.log('onSignUpFailure')
  $('#sign-up input').val('')
  $('#auth-flash').removeClass()
  $('#auth-flash').addClass('failure')
  $('#auth-flash').text('Unable to Sign up!')
  setTimeout(function () {
    $('#auth-flash').text('')
  }, 3000)
}

const onSignInSuccess = function (response) {
  DEBUG && console.log(response.user.token)
  DEBUG && console.log('onSignInSuccess')
  store.user = response.user
  $('#sign-in input').val('')
  $('#auth-flash').removeClass()
  $('#auth-flash').addClass('success')
  $('#auth-flash').text('Successfully signed in!')
  setTimeout(function () {
    $('#auth-flash').text('')
  }, 3000)
}

const onSignInFailure = function () {
  DEBUG && console.log('onSignInFailure')
  $('#sign-in input').val('')
  $('#auth-flash').removeClass()
  $('#auth-flash').addClass('failure')
  $('#auth-flash').text('Unable to Sign in!')
  setTimeout(function () {
    $('#auth-flash').text('')
  }, 3000)
}

const onChangePasswordSuccess = function () {
  DEBUG && console.log('onChangePasswordSuccess')
  $('#change-password input').val('')
  $('#auth-flash').removeClass()
  $('#auth-flash').addClass('success')
  $('#auth-flash').text('Successfully changed password!')
  setTimeout(function () {
    $('#auth-flash').text('')
  }, 3000)
}

const onChangePasswordFailure = function () {
  DEBUG && console.log('onChangePasswordFailure')
  $('#change-password input').val('')
  $('#auth-flash').removeClass()
  $('#auth-flash').addClass('failure')
  $('#auth-flash').text('Unable to change password!')
  setTimeout(function () {
    $('#auth-flash').text('')
  }, 3000)
}

const onSignOutSuccess = function () {
  DEBUG && console.log('onSignOutSuccess')
  $('#sign-out input').val('')
  $('#auth-flash').removeClass()
  $('#auth-flash').addClass('success')
  $('#auth-flash').text('Successfully signed out!')
  setTimeout(function () {
    $('#auth-flash').text('')
  }, 3000)
}

const onSignOutFailure = function () {
  DEBUG && console.log('onSignOutFailure')
  $('#sign-out input').val('')
  $('#auth-flash').removeClass()
  $('#auth-flash').addClass('failure')
  $('#auth-flash').text('Unable to sign out!')
  setTimeout(function () {
    $('#auth-flash').text('')
  }, 3000)
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
