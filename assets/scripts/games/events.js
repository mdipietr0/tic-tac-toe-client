'use strict'

// console.log = {}
const ui = require('./ui')
const api = require('./api')
const getFormFields = require('../../../lib/get-form-fields')
// const {DEBUG} = require('../config')

const onGetAllGames = function () {
  console.log('game events onGetAllGames')
  api.index()
    .then(ui.onGetAllGamesSuccess)
    .catch(ui.onGetAllGamesFailure)
}

const onCreateGame = function () {
  console.log('game events onCreateGame')
  api.create()
    .then(ui.onCreateGameSuccess)
    .catch(ui.onCreateGameFailure)
}

const onShowGame = function (e) {
  e.preventDefault()
  console.log('game events onShowGame')
  const data = getFormFields(e.target)
  api.show(data)
    .then(ui.onShowGameSuccess)
    .catch(ui.onShowGameFailure)
}

const onUpdateGame = function (e) {
  e.preventDefault()
  console.log('game events onShowGame')
  const data = getFormFields(e.target)
  api.update(data)
    .then(ui.onUpdateGameSuccess)
    .catch(ui.onUpdateGameFailure)
}
const addHandlers = function () {
  console.log('game events addHandlers')
  $('#games-index').on('click', onGetAllGames)
  $('#games-create').on('click', onCreateGame)
  $('#games-show').on('submit', onShowGame)
  $('#games-update').on('submit', onUpdateGame)
}

module.exports = {
  addHandlers
}
