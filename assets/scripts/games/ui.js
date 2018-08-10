'use strict'

const {flash} = require('../templates/helpers/flash.js')
// const store = require('../store')
// const logic = require('./logic')

const clearBoard = function () {
  for (let i = 1; i < 10; i++) {
    $(`#box-${i}`).find('.token').addClass('hidden')
    $(`#box-${i}`).find('.token').text('')
  }
}

const updateBoard = function (cells) {
  cells.forEach((cell, i) => {
    console.log(i + ' ' + cell)
    if (cell !== '') {
      $(`#box-${i + 1}`).find('.token').text(cell.toUpperCase())
      $(`#box-${i + 1}`).find('.token').removeClass('hidden')
    }
  })
}

const onGetAllGamesSuccess = function (response) {
  console.log('onGetAllGamesSuccess')
  // flash(true, 'Get all games successful')
  let html = `<h4 class="col-md-offset-5 col-md-2 text-center align-center">Select a game</h4>`
  console.log(response.games)
  response.games.filter(game => game.over === false).reduce((acc, game) => {
    html += `<button id="${game.id}" class="btn-select-game col-md-offset-5 col-md-2 btn btn-default">${game.id}</button>`
  }, html)
  $('#game-list').html(html)
  $('#game-list').removeClass('hidden')
  $('#game-buttons').addClass('hidden')
  $('#winner-banner').addClass('hidden')
}

const onGetAllGamesFailure = function () {
  console.log('onGetAllGamesFailure')
  flash(false, 'Get all games failure')
}

const onCreateGameSuccess = function () {
  console.log('onCreateGameSuccess')
  // flash(true, 'Create game successful')
  setTimeout(function () {
    $('#winner-banner').addClass('hidden')
    $('#game-container').removeClass('hidden')
    $('#game-buttons').addClass('hidden')
  }, 500)
  clearBoard()
}

const onCreateGameFailure = function () {
  console.log('onCreateGameFailure')
  flash(false, 'Create game failure')
}

const onShowGameSuccess = function (response) {
  console.log('onShowGameSuccess')
  // flash(true, 'Show game successful')
  $('#game-list').addClass('hidden')
  // updateBoard()
  $('#game-container').removeClass('hidden')
}

const onShowGameFailure = function () {
  console.log('onShowGameFailure')
  flash(false, 'Show game unsuccessful')
}

const onUpdateGameSuccess = function () {
  console.log('onUpdateGameSuccess')
  // flash(true, 'Update game successful')
  // updateBoard()
}

const onUpdateGameFailure = function () {
  console.log('onUpdateGameFailure')
  flash(false, 'Update game failure')
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
  updateBoard
}
