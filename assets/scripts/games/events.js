'use strict'

// console.log = {}
const ui = require('./ui')
const api = require('./api')
// const logic = require('./logic')
const {Game} = require('./logic')
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
      store.game = new Game(response.game)
      console.log('Game object instance ', store.game)
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
      store.game = new Game(response.game)
      ui.updateBoard(store.game.cells)
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
      store.game = new Game(response.game)
      ui.updateBoard(store.game.cells)
    })
    .then(ui.onUpdateGameSuccess)
    .catch(ui.onUpdateGameFailure)
}

const onBoxClick = function (e) {
  console.log('boxclick nodename' + e.target.nodeName)
  console.log('e.target.id' + e.target.id)
  if (store.game.over) {
    return
  }
  // pulls the square number out of the ID (e.g. "box-1" returns '1')
  const squareNum = e.target.id[e.target.id.length - 1]
  console.log(squareNum)
  console.log('player is ' + store.game.player)
  // if square is available
  if (store.game.isSquareAvailable(squareNum)) {
    console.log('Square is available')

    const data = {
      id: store.game.id,
      game: {
        cell: {
          index: squareNum,
          value: store.game.player
        },
        over: false
      }
    }

    // send update request
    api.update(data)
      .then(function (response) {
        store.game.cells = response.game.cells
        ui.updateBoard(store.game.cells)
      })
      .then(ui.onUpdateGameSuccess)
      .then(function () {
        const data = {}
        data.game = {}
        // refactor this to UI
        let winner
        if (store.game.isGameOver()) {
          console.log('testing now')
          winner = store.game.player
        }
        if (winner) {
          ui.onWin(winner)
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
        store.game.changePlayer()
        console.log(store.game.player)
      })
      .catch(ui.onUpdateGameFailure)
  } else {
    console.log('square is unavailable')
  }
}

const addHandlers = function () {
  console.log('game events addHandlers')
  $('#games-index').on('click', onGetAllGames)
  $('#games-create').on('click', onCreateGame)
  // $('#games-show').on('submit', onShowGame)
  $('#games-update').on('submit', onUpdateGame)
  $('.box').on('click', onBoxClick)
  $('#new-game').on('click', onCreateGame)
  $('#load-game').on('click', onGetAllGames)
  $('#game-list').on('click', 'button', onShowGame)
}

module.exports = {
  addHandlers
}
