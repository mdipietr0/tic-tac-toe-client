'use strict'
const {console} = require('../config')

const {flash} = require('../templates/helpers/flash.js')
const config = require('../config')
// const store = require('../store')
// const logic = require('./logic')

const clearBoard = function () {
  for (let i = 0; i < 9; i++) {
    $(`#box-${i}`).find('.token').addClass('hidden')
    $(`#box-${i}`).find('.token').text('')
  }
}

const updateBoard = function (cells) {
  cells.forEach((cell, i) => {
    console.log(i + ' ' + cell)
    if (cell !== '') {
      // update to show image
      let html
      if (cell === 'x') {
        html = `<img class="logo-token" src="${config.imgUrls.player1}">`
      } else {
        html = `<img class="logo-token" src="${config.imgUrls.player2}">`
      }
      $(`#box-${i}`).find('.token').html(html)
      $(`#box-${i}`).find('.token').removeClass('hidden')
    }
  })
}

const changeTurn = function () {
  const yourTurn = $('.your-turn')
  console.log('your-turn = ' + yourTurn)
  let player = yourTurn.attr('data-player')
  console.log('data-player = ' + player)
  player = player === 'X' ? 'O' : 'X'
  yourTurn.attr('data-player', player)
  console.log('player = ' + player)
  let text // = yourTurn.text()
  // text = text.slice(0, text.length - 1) + player
  if (player === 'O') {
    text = `${config.teamNames[config.teamNames.player2]} are up to bat!`
  } else if (player === 'X') {
    text = `${config.teamNames[config.teamNames.player1]} are up to bat!`
  }
  yourTurn.text(text)
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
  $('#main-menu').removeClass('hidden')
  $('#game-buttons').addClass('hidden')
  $('#winner-banner').addClass('hidden')
}

const onGetAllGamesFailure = function () {
  console.log('onGetAllGamesFailure')
  flash(false, 'Get all games failure')
}

const initYourTurn = function () {
  console.log(config.teamNames[config.teamNames.player1])
  $('.your-turn').attr('data-player', 'X')
  $('.your-turn').text(`${config.teamNames[config.teamNames.player1]} are up to bat!`)
}

const onCreateGameSuccess = function () {
  console.log('onCreateGameSuccess')
  initYourTurn()
  // flash(true, 'Create game successful')
  setTimeout(function () {
    $('#winner-banner').addClass('hidden')
    $('#game-container').removeClass('hidden')
    $('#game-buttons').addClass('hidden')
    $('#main-menu').removeClass('hidden')
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

const onWin = function (winner) {
  setTimeout(function () {
    winner = winner.toUpperCase()
    console.log('game over, ' + winner + ' wins')
    let winCount = parseInt($(`#counter${winner}`).text())
    winCount += 1
    console.log(winCount)
    $(`#counter${winner}`).text(winCount)
    $('#winner-banner').text(`${winner === 'X' ? config.teamNames[config.teamNames.player1] : config.teamNames[config.teamNames.player2]} Win!!!`)
    $('#winner-banner').removeClass('hidden')
    $('#game-buttons').removeClass('hidden')
    $('#main-menu').addClass('hidden')
    $('#game-container').addClass('hidden')
  }, 300)
}

const onDraw = function () {
  setTimeout(function () {
    console.log('game over, Draw')
    $('#winner-banner').text(`Extra Innings!!`)
    $('#winner-banner').removeClass('hidden')
    $('#main-menu').addClass('hidden')
    $('#game-buttons').removeClass('hidden')
    $('#game-container').addClass('hidden')
  }, 300)
}

const onMainMenu = function () {
  $('#game-buttons').removeClass('hidden')
  $('#game-container').addClass('hidden')
  $('#game-list').addClass('hidden')
  $('#main-menu').addClass('hidden')
  $('#winner-banner').addClass('hidden')
}

const setStats = function (...stats) {
  $('#total-games').text(stats[0])
  $('#games-finished').text(stats[1])
  $('#games-drew').text(stats[2])
  $('#games-won').text(stats[3])
  $('#games-lost').text(stats[1] - stats[2] - stats[3])
}

module.exports = {
  onMainMenu,
  onCreateGameSuccess,
  onCreateGameFailure,
  onGetAllGamesSuccess,
  onGetAllGamesFailure,
  onShowGameSuccess,
  onShowGameFailure,
  onUpdateGameSuccess,
  onUpdateGameFailure,
  updateBoard,
  onWin,
  onDraw,
  setStats,
  changeTurn
}
