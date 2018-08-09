'use require'

const flash = function (success, msg) {
  $('#auth-flash').removeClass()
  $('#auth-flash').text(msg)
  if (success) {
    $('#auth-flash').addClass('success')
  } else {
    $('#auth-flash').addClass('failure')
  }
  $('#auth-flash').show()
  setTimeout(function () {
    $('#auth-flash').hide()
  }, 3000)
}

module.exports = {
  flash
}
