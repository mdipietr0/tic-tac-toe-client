'use strict'

// const store = require('../store')

const Game = function () {
  this.cells = ['', '', '', '', '', '', '', '', '']
  this.over = false
  this.player = 'x'
}

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
const isGameOver = function (game) {
  if ((game.cells[0] !== '' && game.cells[0] === game.cells[1] && game.cells[1] === game.cells[2]) ||
  (game.cells[3] !== '' && game.cells[3] === game.cells[4] && game.cells[4] === game.cells[5]) ||
  (game.cells[6] !== '' && game.cells[6] === game.cells[7] && game.cells[7] === game.cells[8]) ||
  (game.cells[0] !== '' && game.cells[0] === game.cells[3] && game.cells[3] === game.cells[6]) ||
  (game.cells[1] !== '' && game.cells[1] === game.cells[4] && game.cells[4] === game.cells[7]) ||
  (game.cells[2] !== '' && game.cells[2] === game.cells[5] && game.cells[5] === game.cells[8]) ||
  (game.cells[0] !== '' && game.cells[0] === game.cells[4] && game.cells[4] === game.cells[8]) ||
  (game.cells[2] !== '' && game.cells[2] === game.cells[4] && game.cells[4] === game.cells[6])) {
    gameOver(game)
    return true
  }
  return false
}

const gameOver = function (game) {
  game.over = true
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
// TODO be careful of pass by value
const changePlayer = function (game) {
  console.log('changePlayer')
  if (game.player === 'x') {
    game.player = 'o'
  } else {
    game.player = 'x'
  }
  console.log(game.player)
}

const makeMove = function (cells, index, player) {
  console.log('makeMove')
  if (!isGameOver(game) && isSquareAvailable(cells, index)) {
    cells[index] = player
    const go = isGameOver(game)
    if (go) {
      console.log(game.player + 'WINS')
    }
    changePlayer(game)
  }
}

const newGame = function (game) {
  game.cells = ['', '', '', '', '', '', '', '', '']
  game.over = false
  game.player = 'x'
}
/**
 * Creates the game board
 */
const drawBoard = function (game) {
  game.cells.forEach(s => console.log(s))
}

const game = new Game()
console.log(game)
makeMove(game.cells, 0, game.player)
console.log(game)
makeMove(game.cells, 2, game.player)
console.log(game)
makeMove(game.cells, 3, game.player)
console.log(game)
makeMove(game.cells, 5, game.player)
console.log(game)
makeMove(game.cells, 4, game.player)
console.log(game)
makeMove(game.cells, 8, game.player)
console.log(game)
makeMove(game.cells, 7, game.player)
console.log(game)
newGame(game)
console.log(game)

module.exports = {
  Game,
  isGameOver,
  isSquareAvailable,
  drawBoard,
  makeMove,
  changePlayer,
  newGame
}
