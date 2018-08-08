'use strict'

const games = {
  'games': [
    {
      'id': 1,
      'cells': ['o', 'x', 'o', 'x', 'o', 'x', 'o', 'x', 'o'],
      'over': true,
      'player_x': {
        'id': 1,
        'email': 'and@and.com'
      },
      'player_o': {
        'id': 3,
        'email': 'dna@dna.com'
      }
    },
    {
      'id': 2,
      'cells': ['', '', '', '', '', '', '', '', ''],
      'over': false,
      'player_x': {
        'id': 3,
        'email': 'dna@dna.com'
      },
      'player_o': {
        'id': 1,
        'email': 'and@and.com'
      }
    }
  ]
}

console.log(games[0])

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
  player = (player - 1) ? 'o' : 'x'

  if ((game.cells[0] === player && game.cells[1] === player && game.cells[2] === player) ||
  (game.cells[3] === player && game.cells[4] === player && game.cells[5] === player) ||
  (game.cells[6] === player && game.cells[7] === player && game.cells[8] === player) ||
  (game.cells[0] === player && game.cells[3] === player && game.cells[6] === player) ||
  (game.cells[1] === player && game.cells[4] === player && game.cells[7] === player) ||
  (game.cells[2] === player && game.cells[5] === player && game.cells[8] === player) ||
  (game.cells[0] === player && game.cells[4] === player && game.cells[8] === player) ||
  (game.cells[2] === player && game.cells[4] === player && game.cells[6] === player)) {
    return true
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
const isSquareAvailable = function (game, index) {
  if (game[index] !== '') {
    return true
  }
  return false
}

/**
 * Creates the game board
 */
const createBoard = function () {
  // loads game board
}

module.exports = {
  isGameOver,
  isSquareAvailable,
  createBoard
}
