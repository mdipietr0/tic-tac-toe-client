'use strict'

const auth = require('./auth/events')
const games = require('./games/events')

$(() => {
  auth.addHandlers()
  games.addHandlers()
})
