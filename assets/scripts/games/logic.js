'use strict'

// const store = require('../store')

const Game = function (game = {cells: ['', '', '', '', '', '', '', '', ''], over: false}) {
  if (game) {
    this.id = game.id
    this.cells = game.cells
    this.over = game.over
    this.player_x = game.player_x
    this.player_o = game.player_o
  }
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
const isGameOver = function () {
  console.log(this)
  if ((this.cells[0] !== '' && this.cells[0] === this.cells[1] && this.cells[1] === this.cells[2]) ||
  (this.cells[3] !== '' && this.cells[3] === this.cells[4] && this.cells[4] === this.cells[5]) ||
  (this.cells[6] !== '' && this.cells[6] === this.cells[7] && this.cells[7] === this.cells[8]) ||
  (this.cells[0] !== '' && this.cells[0] === this.cells[3] && this.cells[3] === this.cells[6]) ||
  (this.cells[1] !== '' && this.cells[1] === this.cells[4] && this.cells[4] === this.cells[7]) ||
  (this.cells[2] !== '' && this.cells[2] === this.cells[5] && this.cells[5] === this.cells[8]) ||
  (this.cells[0] !== '' && this.cells[0] === this.cells[4] && this.cells[4] === this.cells[8]) ||
  (this.cells[2] !== '' && this.cells[2] === this.cells[4] && this.cells[4] === this.cells[6])) {
    gameOver()
    return true
  }
  return false
}

Game.prototype.isGameOver = isGameOver

const gameOver = function () {
  game.over = true
}

Game.prototype.gameOver = gameOver

/**
 * Checks if a square is available
 *
 * @param {array} game
 *   array representing the 9 squares on the board
 * @param {number} index
 *   square number {0,8}
 */
const isSquareAvailable = function (index) {
  console.log(this)
  if (this.cells[index] === '') {
    return true
  }
  return false
}

Game.prototype.isSquareAvailable = isSquareAvailable

// TODO be careful of pass by value
const changePlayer = function () {
  console.log('changePlayer')
  if (this.player === 'x') {
    this.player = 'o'
  } else {
    this.player = 'x'
  }
  console.log(this.player)
}

Game.prototype.changePlayer = changePlayer

const makeMove = function (index) {
  console.log('makeMove')
  if (!this.isGameOver(game) && this.isSquareAvailable(index)) {
    this.cells[index] = this.player
    const go = this.isGameOver(game)
    if (go) {
      console.log(this.player + 'WINS')
    }
    changePlayer()
  }
}

Game.prototype.makeMove = makeMove

const newGame = function () {
  this.cells = ['', '', '', '', '', '', '', '', '']
  this.over = false
  this.player = 'x'
}

Game.prototype.newGame = newGame
/**
 * Creates the game board
 */
const drawBoard = function (game) {
  game.cells.forEach(s => console.log(s))
}

Game.prototype.drawBoard = drawBoard

const game = new Game()
console.log(game)
game.makeMove(game.cells, 0, game.player)
console.log(game)
game.makeMove(game.cells, 2, game.player)
console.log(game)
game.makeMove(game.cells, 3, game.player)
console.log(game)
game.makeMove(game.cells, 5, game.player)
console.log(game)
game.makeMove(game.cells, 4, game.player)
console.log(game)
game.makeMove(game.cells, 8, game.player)
console.log(game)
game.makeMove(game.cells, 7, game.player)
console.log(game)
game.newGame(game)
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
