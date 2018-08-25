'use strict'

const ui = require('./ui')
const api = require('./api')
const {Game} = require('./logic')
const store = require('../store')
const config = require('../config')
const {console} = require('../config')
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
      ui.initYourTurn(store.game.player.toUpperCase())
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

const onLogo = function (e) {
  console.log(e.target)
  const player = $(this).attr('data-player')
  console.log(player)
  $('#teamModal').attr('data-player', player)
}

const onTeamSelect = function (e) {
  const team = $(this).attr('data-team')
  console.log(`test ${team} select`)
  const player = $('#teamModal').attr(`data-player`)
  console.log(player)
  console.log(config.imgUrls[team])
  $(`img[data-player="${player}"]`).attr(`src`, config.imgUrls[team])
  setTeamToken(team, player)
  loadTeams()
}

const setTeamToken = function (team, player) {
  console.log('setTeamToken')
  if (player === '1') {
    console.log('player : ' + player)
    console.log('player : ' + team)
    config.imgUrls.player1 = config.imgUrls[team]
    config.teamNames.player1 = team
    $('#player-x-wins').html(config.teamNames[config.teamNames.player1] + ' Wins:<br>')
    $('.counter').text(0)
  } else {
    config.imgUrls.player2 = config.imgUrls[team]
    config.teamNames.player2 = team
    $('#player-o-wins').html(config.teamNames[config.teamNames.player2] + ' Wins:<br>')
    $('.counter').text(0)
  }
}

const loadTeams = function () {
  let html = ''
  for (const imgName in config.imgUrls) {
    if (imgName === 'player1' || imgName === 'player2' || imgName === config.teamNames.player1 || imgName === config.teamNames.player2) {
      console.log('do nothing')
      console.log(imgName)
      console.log(config.imgUrls[imgName])
    } else {
      const image = config.imgUrls[imgName]
      console.log(imgName)
      console.log('load team ' + image)
      html += `<h5 data-team="${imgName}" class="select-team" data-toggle="modal" data-target="#teamModal" >${config.teamNames[imgName]}<span><img class="tiny-icon" src="${image}"  alt="team-logo"></span></h5>
      `
    }
  }
  $('.select-team-container').html(html)
}

loadTeams()

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
  $('#main-menu').on('click', onMainMenu)
  $('.home').on('click', onMainMenu)
  $('#welcome').on('click', onWelcome)
  $('.title').on('click', onLogo)
  $('.select-team-container').on('click', 'h5', onTeamSelect)
}

module.exports = {
  addHandlers
}
