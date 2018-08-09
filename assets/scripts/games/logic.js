'use strict'

// const store = require('../store')
// const board = []
/**
 * Checks if the game is over
 *
 * @param {array} game
 *   array representing the 9 squares on the board
 * @param {number} player
 *   player number: must be {1, 2}
 */
const isGameOver = function (game, player) {
  // if player 2, use 'o'
  // if player 1, use 'x'
  player = player ? 'x' : 'o'

  if ((game.cells[0] === player && game.cells[1] === player && game.cells[2] === player) ||
  (game.cells[3] === player && game.cells[4] === player && game.cells[5] === player) ||
  (game.cells[6] === player && game.cells[7] === player && game.cells[8] === player) ||
  (game.cells[0] === player && game.cells[3] === player && game.cells[6] === player) ||
  (game.cells[1] === player && game.cells[4] === player && game.cells[7] === player) ||
  (game.cells[2] === player && game.cells[5] === player && game.cells[8] === player) ||
  (game.cells[0] === player && game.cells[4] === player && game.cells[8] === player) ||
  (game.cells[2] === player && game.cells[4] === player && game.cells[6] === player)) {
    return 'player' + player
  }
  return false
}

/**
 * Checks if a square is available
 *
 * @param {array} game
 *   array representing the 9 squares on the board
 * @param {number} index
 *   square number {0,8}
 */
const isSquareAvailable = function (cells, index) {
  if (cells[index] === '') {
    return true
  }
  return false
}

const makeMove = function () {

}
/**
 * Creates the game board
 */
const drawBoard = function () {
}

module.exports = {
  isGameOver,
  isSquareAvailable,
  drawBoard,
  makeMove
}
