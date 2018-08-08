const {isGameOver} = require('../assets/scripts/games/logic')

describe('Games', function () {
  // const game = []

  it('determines whether the game is over', function () {
    isGameOver().should.equal(true)
  })
})
