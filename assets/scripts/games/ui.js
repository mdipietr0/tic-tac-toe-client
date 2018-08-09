'use strict'

const store = require('../store')
const logic = require('./logic')

const onGetAllGamesSuccess = function (response) {
  console.log('onGetAllGamesSuccess')
  $('#auth-flash').removeClass()
  $('#auth-flash').addClass('success')
  $('#auth-flash').text('Get all games successful!')
  setTimeout(function () {
    $('#auth-flash').text('')
  }, 3000)
  let html = `<h4 class="col-md-offset-5 col-md-2 text-center align-center">Select a game</h4>`
  console.log(response.games)
  response.games.filter(game => game.over === false).reduce((acc, game) => {
    html += `<button id="${game.id}" class="btn-select-game col-md-offset-5 col-md-2 btn btn-default">${game.id}</button>`
  }, html)
  $('#game-list').html(html)
  $('#game-list').removeClass('hidden')
  $('#game-buttons').addClass('hidden')
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

const onCreateGameSuccess = function (response) {
  store.game = response.game
  store.playerX = true
  logic.drawBoard()
  console.log(store.game)
  console.log('onCreateGameSuccess')
  $('#auth-flash').removeClass()
  $('#auth-flash').addClass('success')
  $('#auth-flash').text('Create game successful!')
  setTimeout(function () {
    $('#auth-flash').text('')
  }, 3000)
  store.game.cells.forEach((cell, i) => {
    console.log(i + ' ' + cell)
    $(`#box-${i + 1}`).find('.token').addClass('hidden')
    $(`#box-${i + 1}`).find('.token').text('')
  })
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

const onShowGameSuccess = function (response) {
  console.log('onShowGameSuccess')
  $('#auth-flash').removeClass()
  $('#auth-flash').addClass('success')
  $('#auth-flash').text('Show game successful!')
  setTimeout(function () {
    $('#auth-flash').text('')
  }, 3000)
  store.game = response.game
  $('#game-list').addClass('hidden')
  // logic.drawBoard()
  store.game.cells.forEach((cell, i) => {
    console.log(i + ' ' + cell)
    if (cell !== '') {
      $(`#box-${i + 1}`).find('.token').text(cell.toUpperCase())
      $(`#box-${i + 1}`).find('.token').removeClass('hidden')
    }
  })
  $('#game-container').removeClass('hidden')
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

const onUpdateGameSuccess = function (response) {
  console.log(response.game)
  store.game = response.game
  console.log('onUpdateGameSuccess')
  $('#auth-flash').removeClass()
  $('#auth-flash').addClass('success')
  $('#auth-flash').text('Update game successful!')
  setTimeout(function () {
    $('#auth-flash').text('')
  }, 3000)

  store.game.cells.forEach((cell, i) => {
    console.log(i + ' ' + cell)
    if (cell !== '') {
      $(`#box-${i + 1}`).find('.token').text(cell.toUpperCase())
      $(`#box-${i + 1}`).find('.token').removeClass('hidden')
    }
  })
  logic.drawBoard()
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

const onGameOver = function (response) {
  store.game.over = response.game.over
  console.log('ui on game over')
}

module.exports = {
  onCreateGameSuccess,
  onCreateGameFailure,
  onGetAllGamesSuccess,
  onGetAllGamesFailure,
  onShowGameSuccess,
  onShowGameFailure,
  onUpdateGameSuccess,
  onUpdateGameFailure,
  onGameOver
}
