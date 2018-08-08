'use strict'

const onGetAllGamesSuccess = function () {
  console.log('onGetAllGamesSuccess')
  $('#auth-flash').removeClass()
  $('#auth-flash').addClass('success')
  $('#auth-flash').text('Get all games successful!')
  setTimeout(function () {
    $('#auth-flash').text('')
  }, 3000)
}

const onGetAllGamesFailure = function () {
  console.log('onGetAllGamesFailure')
  $('#auth-flash').removeClass()
  $('#auth-flash').addClass('failure')
  $('#auth-flash').text('Get all games unsuccessful!')
  setTimeout(function () {
    $('#auth-flash').text('')
  }, 3000)
}

const onCreateGameSuccess = function () {
  console.log('onCreateGameSuccess')
  $('#auth-flash').removeClass()
  $('#auth-flash').addClass('success')
  $('#auth-flash').text('Create game successful!')
  setTimeout(function () {
    $('#auth-flash').text('')
  }, 3000)
}

const onCreateGameFailure = function () {
  console.log('onCreateGameFailure')
  $('#auth-flash').removeClass()
  $('#auth-flash').addClass('failure')
  $('#auth-flash').text('Create game unsuccessful!')
  setTimeout(function () {
    $('#auth-flash').text('')
  }, 3000)
}

const onShowGameSuccess = function () {
  console.log('onShowGameSuccess')
  $('#auth-flash').removeClass()
  $('#auth-flash').addClass('success')
  $('#auth-flash').text('Show game successful!')
  setTimeout(function () {
    $('#auth-flash').text('')
  }, 3000)
}

const onShowGameFailure = function () {
  console.log('onShowGameFailure')
  $('#auth-flash').removeClass()
  $('#auth-flash').addClass('failure')
  $('#auth-flash').text('Show game unsuccessful!')
  setTimeout(function () {
    $('#auth-flash').text('')
  }, 3000)
}

const onUpdateGameSuccess = function () {
  console.log('onUpdateGameSuccess')
  $('#auth-flash').removeClass()
  $('#auth-flash').addClass('success')
  $('#auth-flash').text('Update game successful!')
  setTimeout(function () {
    $('#auth-flash').text('')
  }, 3000)
}

const onUpdateGameFailure = function () {
  console.log('onUpdateGameFailure')
  $('#auth-flash').removeClass()
  $('#auth-flash').addClass('failure')
  $('#auth-flash').text('Update game unsuccessful!')
  setTimeout(function () {
    $('#auth-flash').text('')
  }, 3000)
}

module.exports = {
  onCreateGameSuccess,
  onCreateGameFailure,
  onGetAllGamesSuccess,
  onGetAllGamesFailure,
  onShowGameSuccess,
  onShowGameFailure,
  onUpdateGameSuccess,
  onUpdateGameFailure
}
