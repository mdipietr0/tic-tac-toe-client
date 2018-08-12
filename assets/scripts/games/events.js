'use strict'

// console.log = {}
const ui = require('./ui')
const api = require('./api')
// const logic = require('./logic')
const {resourceWatcher} = require('../resource-watcher')
const config = require('../config')

const {Game} = require('./logic')
const store = require('../store')
const getFormFields = require('../../../lib/get-form-fields')

const onGetAllGames = function (e) {
  e.preventDefault()
  console.log('game events onGetAllGames')
  api.index()
    .then(ui.onGetAllGamesSuccess)
    .catch(ui.onGetAllGamesFailure)
}

const onCreateGame = function (e) {
  e.preventDefault()
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
      store.game.getCurrentPlayer()
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
      ui.changeTurn()
    })
    .then(ui.onUpdateGameSuccess)
    .catch(ui.onUpdateGameFailure)
}

const checkForWinner = function () {
  if (store.game.isDraw()) {
    ui.onDraw()
  } else if (store.game.over) {
    ui.onWin(store.game.player)
  }
}

// pulls the square number out of the ID (e.g. "box-1" returns '1')
const getSquareNum = function (target) {
  return target.id[target.id.length - 1]
}

const updateBoard = function (response) {
  store.game.cells = response.game.cells
  ui.updateBoard(store.game.cells)
}

const onBoxClick = function (e) {
  const squareNum = getSquareNum(e.target)
  const data = store.game.makeMove(squareNum)
  if (data) {
    api.update(data)
      .then(updateBoard)
      .then(ui.changeTurn)
      .then(ui.onUpdateGameSuccess)
      .then(checkForWinner)
      .then(store.game.changePlayer.bind(store.game))
      .catch(ui.onUpdateGameFailure)
  }
}

const onMainMenu = function () {
  ui.onMainMenu()
}

const calculateStats = function (response) {
  console.log('test')
  let games = response.games
  const gamesPlayed = games.length
  console.log('games played : ' + gamesPlayed)
  games = games.filter(game => {
    const g = new Game(game)
    console.log(g.over)
    return g.over
  })
  const gamesFinished = games.length
  console.log('games finished: ' + gamesFinished)
  games = games.filter(game => {
    const g = new Game(game)
    return !g.isDraw()
  })
  const numDraw = gamesFinished - games.length
  console.log('Number of games draw: ' + numDraw)
  games = games.filter(game => {
    const g = new Game(game)
    return g.getWinner() === 'x'
  })
  const gamesWon = games.length
  console.log('Games won : ' + gamesWon)
  // return games.length
  ui.setStats(gamesPlayed, gamesFinished, numDraw, gamesWon)
}

const onWelcome = function () {
  api.index()
    .then(calculateStats)
    // .then(ui.setStats)
    .catch(ui.onGetAllGamesFailure)
}

const onCreateMultiGame = function (e) {
  e.preventDefault()
  console.log('game events onCreateGame')
  api.create()
    .then(function (response) {
      store.game = new Game(response.game)
      console.log('Game object instance ', store.game)
      console.log(store.game)
      console.log(store.game.cells)
      console.log('create game object')
      const gameWatcher = resourceWatcher(config.apiUrl + 'games/' + store.game.id + '/watch', {
        Authorization: 'Token token=' + store.user.token
      })
      gameWatcher.on('change', function (data) {
        console.log(data)
        if (data.game && data.game.cells) {
          store.game.cells = data.game.cells[1]
          ui.updateBoard(store.game.cells)
          // const diff = changes => {
          //   const before = changes[0]
          //   const after = changes[1]
          //   for (let i = 0; i < after.length; i++) {
          //     if (before[i] !== after[i]) {
          //       return {
          //         index: i,
          //         value: after[i]
          //       }
          //     }
          //   }
          //
          //   return { index: -1, value: '' }
          // }
          //
          // const cell = diff(data.game.cells)
          // $('#watch-index').val(cell.index)
          // $('#watch-value').val(cell.value)
        } else if (data.timeout) { // not an error
          gameWatcher.close()
        }
      })

      gameWatcher.on('error', function (e) {
        console.error('an error has occurred with the stream', e)
      })
    })
    .then(ui.onCreateGameSuccess)
    .catch(ui.onCreateGameFailure)
}

const onJoinGame = function (e) {
  e.preventDefault()
  const data = getFormFields(e.target)
  api.update(data)
    .then(function (response) {
      console.log(response)
      store.game = new Game(response.game)
      store.game.player = 'o'
      ui.updateBoard(store.game.cells)
      const gameWatcher = resourceWatcher(config.apiUrl + 'games/' + store.game.id + '/watch', {
        Authorization: 'Token token=' + store.user.token
      })
      gameWatcher.on('change', function (data) {
        console.log(data)
        if (data.game && data.game.cells) {
          store.game.cells = data.game.cells[1]
          ui.updateBoard(store.game.cells)
          // const diff = changes => {
          //   const before = changes[0]
          //   const after = changes[1]
          //   for (let i = 0; i < after.length; i++) {
          //     if (before[i] !== after[i]) {
          //       return {
          //         index: i,
          //         value: after[i]
          //       }
          //     }
          //   }
          //
          //   return { index: -1, value: '' }
          // }
          //
          // const cell = diff(data.game.cells)
          // $('#watch-index').val(cell.index)
          // $('#watch-value').val(cell.value)
        } else if (data.timeout) { // not an error
          gameWatcher.close()
        }
      })

      gameWatcher.on('error', function (e) {
        console.error('an error has occurred with the stream', e)
      })
    })
    .then(ui.onShowGameSuccess)
    .catch(ui.onShowGameFailure)
}

const addHandlers = function () {
  console.log('game events addHandlers')
  $('#games-join').on('submit', onJoinGame)
  $('#games-index').on('click', onGetAllGames)
  $('#games-create').on('click', onCreateGame)
  // $('#games-show').on('submit', onShowGame)
  $('#games-update').on('submit', onUpdateGame)
  $('.box').on('click', onBoxClick)
  $('#new-game').on('click', onCreateGame)
  $('#new-multiplayer-game').on('click', onCreateMultiGame)
  $('#load-game').on('click', onGetAllGames)
  $('#game-list').on('click', 'button', onShowGame)
  $('#main-menu').on('click', onMainMenu)
  $('.home').on('click', onMainMenu)
  $('#welcome').on('click', onWelcome)
}

module.exports = {
  addHandlers
}
