'use strict'

let apiUrl
const apiUrls = {
  production: 'https://aqueous-atoll-85096.herokuapp.com/',
  development: 'https://tic-tac-toe-wdi.herokuapp.com/'
}

const imgUrls = {
  redSox: 'https://mk0teamcolorcodtgc6i.kinstacdn.com/wp-content/uploads/2017/05/boston_red_sox_logo.png',
  yankees: 'https://mk0teamcolorcodtgc6i.kinstacdn.com/wp-content/uploads/2014/05/new_york_yankees_logo.png'
}

if (window.location.hostname === 'localhost') {
  apiUrl = apiUrls.development
} else {
  apiUrl = apiUrls.production
}

module.exports = {
  apiUrl,
  imgUrls
}
