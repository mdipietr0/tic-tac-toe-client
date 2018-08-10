'use strict'

// console.log = {}
const ui = require('./ui')
const api = require('./api')
const logic = require('./logic')
const store = require('../store')
const getFormFields = require('../../../lib/get-form-fields')

const onGetAllGames = function () {
  console.log('game events onGetAllGames')
  api.index()
    .then(ui.onGetAllGamesSuccess)
    .catch(ui.onGetAllGamesFailure)
}

const onCreateGame = function () {
  console.log('game events onCreateGame')
  api.create()
    .then(function (response) {
      store.game = response.game
      store.playerX = true
      console.log(store.game)
      console.log(store.game.cells)
      console.log('create game object')
    })
    .then(ui.onCreateGameSuccess)
    .catch(ui.onCreateGameFailure)
}

const onShowGame = function (e) {
  console.log('game events onShowGame')
  console.log(e.target.nodeName)
  e.preventDefault()
  let id
  if (e.target.nodeName === 'BUTTON') {
    id = e.target.id
  } else {
    id = getFormFields(e.target).id
  }
  api.show(id)
    .then(function (response) {
      store.game = response.game
    })
    .then(ui.onShowGameSuccess)
    .catch(ui.onShowGameFailure)
}

const onUpdateGame = function (e) {
  console.log('update nodename' + e.target.nodeName)
  e.preventDefault()
  console.log('game events onShowGame')
  const data = getFormFields(e.target)
  console.log(data)
  api.update(data)
    .then(function (response) {
      store.game = response.game
    })
    .then(ui.onUpdateGameSuccess)
    .catch(ui.onUpdateGameFailure)
}

const onBoxClick = function (e) {
  console.log('boxclick nodename' + e.target.nodeName)
  if (store.game.over) {
    return
  }
  const squareNum = e.target.id[e.target.id.length - 1]
  const data = {
    id: store.game.id,
    game: {
      cell: {
        index: squareNum - 1,
        value: store.playerX ? 'x' : 'o'
      },
      over: false
    }
  }
  console.log(squareNum)
  // if square is available
  if (logic.isSquareAvailable(store.game.cells, data.game.cell.index)) {
    // send update request
    console.log('Square is available')

    api.update(data)
      .then(function (response) {
        store.game = response.game
      })
      .then(ui.onUpdateGameSuccess)
      .then(function () {
        const data = {}
        data.game = {}
        // refactor this to UI
        let winner
        if (logic.isGameOver(store.game)) {
          winner = store.playerX
        }
        if (winner) {
          console.log('game over, ' + winner + ' wins')
          $('#winner-banner').text(`${winner} Wins!!!`)
          $('#winner-banner').removeClass('hidden')
          $('#game-buttons').removeClass('hidden')
          $('#game-container').addClass('hidden')
          data.game.over = true
          data.id = store.game.id
          api.update(data)
            .then(function (response) {
              store.game.over = response.game.over
            })
            .catch(function () {
              console.log('game over update failed')
            })
        }
        store.playerX = !store.playerX
        console.log('player x ' + store.playerX)
      })
      .catch(ui.onUpdateGameFailure)
  } else {
    console.log('square is unavailable')
  }
}

const onNewGame = function (e) {
  e.preventDefault()
  onCreateGame()
  setTimeout(function () {
    $('#winner-banner').addClass('hidden')
    $('#game-container').removeClass('hidden')
    $('#game-buttons').addClass('hidden')
  }, 500)
}

const onLoadGame = function (e) {
  e.preventDefault()
  $('#winner-banner').addClass('hidden')
  console.log('game events new game')
  onGetAllGames()
}

const addHandlers = function () {
  console.log('game events addHandlers')
  $('#games-index').on('click', onGetAllGames)
  $('#games-create').on('click', onCreateGame)
  // $('#games-show').on('submit', onShowGame)
  $('#games-update').on('submit', onUpdateGame)
  $('.box').on('click', onBoxClick)
  $('#new-game').on('click', onNewGame)
  $('#load-game').on('click', onLoadGame)
  $('#game-list').on('click', 'button', onShowGame)
}

module.exports = {
  addHandlers
}
