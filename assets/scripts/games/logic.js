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

const getCurrentPlayer = function () {
  const lastPlayer = this.getWinner()
  if (lastPlayer === 'x') {
    this.player = 'o'
  }
}

Game.prototype.getCurrentPlayer = getCurrentPlayer

const getWinner = function () {
  let countX = 0
  let countO = 0
  this.cells.forEach(cell => {
    if (cell === 'x') {
      countX++
    } else if (cell === 'o') {
      countO++
    }
  })
  console.log('x: ' + countX)
  console.log('o:' + countX)
  if (countX > countO) {
    return 'x'
  } else if (countO > countX) {
    return 'o'
  }
}

Game.prototype.getWinner = getWinner

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
const didWin = function () {
  console.log(this)
  if ((this.cells[0] !== '' && this.cells[0] === this.cells[1] && this.cells[1] === this.cells[2]) ||
  (this.cells[3] !== '' && this.cells[3] === this.cells[4] && this.cells[4] === this.cells[5]) ||
  (this.cells[6] !== '' && this.cells[6] === this.cells[7] && this.cells[7] === this.cells[8]) ||
  (this.cells[0] !== '' && this.cells[0] === this.cells[3] && this.cells[3] === this.cells[6]) ||
  (this.cells[1] !== '' && this.cells[1] === this.cells[4] && this.cells[4] === this.cells[7]) ||
  (this.cells[2] !== '' && this.cells[2] === this.cells[5] && this.cells[5] === this.cells[8]) ||
  (this.cells[0] !== '' && this.cells[0] === this.cells[4] && this.cells[4] === this.cells[8]) ||
  (this.cells[2] !== '' && this.cells[2] === this.cells[4] && this.cells[4] === this.cells[6])) {
    this.gameOver()
    return true
  }
  return false
}

Game.prototype.didWin = didWin

const isDraw = function () {
  if (this.cells.every(cell => cell !== '') && !this.didWin()) {
    console.log('draw')
    this.gameOver()
    return true
  }
  return false
}

Game.prototype.isDraw = isDraw

const gameOver = function () {
  this.over = true
  console.log('testing go')
}

Game.prototype.gameOver = gameOver

const isGameOver = function () {
  return this.over
}

Game.prototype.isGameOver = isGameOver

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
  const data = {
    id: this.id,
    game: {
      cell: {
        index: index,
        value: this.player
      },
      over: false
    }
  }
  if (this.isSquareAvailable(index)) {
    this.cells[index] = this.player
    if (this.didWin() || this.isDraw()) {
      this.gameOver()
      data.game.over = true
    }
    return data
  }
  return false
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
  didWin,
  isGameOver,
  isSquareAvailable,
  drawBoard,
  makeMove,
  changePlayer,
  newGame
}
