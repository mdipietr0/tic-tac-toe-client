'use strict'

let apiUrl
const apiUrls = {
  production: 'https://aqueous-atoll-85096.herokuapp.com/',
  development: 'https://tic-tac-toe-wdi.herokuapp.com/'
}

const imgUrls = {
  player1: `https://mk0teamcolorcodtgc6i.kinstacdn.com/wp-content/uploads/2017/05/boston_red_sox_logo.png`,
  player2: `https://mk0teamcolorcodtgc6i.kinstacdn.com/wp-content/uploads/2014/05/new_york_yankees_logo.png`,
  redSox: 'https://mk0teamcolorcodtgc6i.kinstacdn.com/wp-content/uploads/2017/05/boston_red_sox_logo.png',
  dBacks: `https://mk0teamcolorcodtgc6i.kinstacdn.com/wp-content/uploads/2014/05/dbacks_logo.jpg`,
  braves: `https://mk0teamcolorcodtgc6i.kinstacdn.com/wp-content/uploads/2017/05/atlanta_braves_logo_2018-768x312.png`,
  orioles: `https://mk0teamcolorcodtgc6i.kinstacdn.com/wp-content/uploads/2017/05/baltimore_orioles_primary_logo.png`,
  cubs: `https://mk0teamcolorcodtgc6i.kinstacdn.com/wp-content/uploads/2017/05/cubs_logo.jpg`,
  whiteSox: `https://mk0teamcolorcodtgc6i.kinstacdn.com/wp-content/uploads/2014/05/white-sox_logo.jpg`,
  reds: `https://mk0teamcolorcodtgc6i.kinstacdn.com/wp-content/uploads/2014/05/reds_logo.jpg`,
  indians: `https://mk0teamcolorcodtgc6i.kinstacdn.com/wp-content/uploads/2014/05/indians_logo.jpg`,
  rockies: `https://mk0teamcolorcodtgc6i.kinstacdn.com/wp-content/uploads/2017/05/rockies.jpg`,
  tigers: `https://mk0teamcolorcodtgc6i.kinstacdn.com/wp-content/uploads/2014/05/tigers_logo.jpg`,
  astros: `https://mk0teamcolorcodtgc6i.kinstacdn.com/wp-content/uploads/2014/05/astros_logo.jpg`,
  royals: `https://mk0teamcolorcodtgc6i.kinstacdn.com/wp-content/uploads/2017/05/kansas_city_royals-768x888.png`,
  angers: `https://mk0teamcolorcodtgc6i.kinstacdn.com/wp-content/uploads/2014/05/angels_logo.jpg`,
  dodgers: `https://mk0teamcolorcodtgc6i.kinstacdn.com/wp-content/uploads/2017/05/dodgers_cap_logo.png`,
  marlins: `https://mk0teamcolorcodtgc6i.kinstacdn.com/wp-content/uploads/2017/05/marlins_logo_colors.png`,
  brewers: `https://mk0teamcolorcodtgc6i.kinstacdn.com/wp-content/uploads/2017/05/milwaukee_brewers_logo.png`,
  twins: `https://mk0teamcolorcodtgc6i.kinstacdn.com/wp-content/uploads/2014/05/twins_logo.jpg`,
  mets: `https://mk0teamcolorcodtgc6i.kinstacdn.com/wp-content/uploads/2014/05/mets_logo.jpg`,
  yankees: 'https://mk0teamcolorcodtgc6i.kinstacdn.com/wp-content/uploads/2014/05/new_york_yankees_logo.png',
  athletics: `https://mk0teamcolorcodtgc6i.kinstacdn.com/wp-content/uploads/2014/05/athletics_logo.jpg`,
  phillies: `https://mk0teamcolorcodtgc6i.kinstacdn.com/wp-content/uploads/2014/05/phillies_logo-768x717.png`,
  pirates: `https://mk0teamcolorcodtgc6i.kinstacdn.com/wp-content/uploads/2014/05/pirates_logo.jpg`,
  cardinals: `https://mk0teamcolorcodtgc6i.kinstacdn.com/wp-content/uploads/2014/05/cardinals_logo.jpg`,
  padres: `https://mk0teamcolorcodtgc6i.kinstacdn.com/wp-content/uploads/2014/05/padres_cap_logo.png`,
  giants: `https://mk0teamcolorcodtgc6i.kinstacdn.com/wp-content/uploads/2014/05/giants_primary_logo-768x412.png`,
  mariners: `https://mk0teamcolorcodtgc6i.kinstacdn.com/wp-content/uploads/2014/05/mariners_logo.jpg`,
  rays: `https://mk0teamcolorcodtgc6i.kinstacdn.com/wp-content/uploads/2014/05/rays_logo.jpg`,
  rangers: `https://mk0teamcolorcodtgc6i.kinstacdn.com/wp-content/uploads/2014/05/texas_rangers_logo_colors.jpg`,
  blueJays: `https://mk0teamcolorcodtgc6i.kinstacdn.com/wp-content/uploads/2014/05/blue-jays_logo.jpg`,
  nationals: `https://mk0teamcolorcodtgc6i.kinstacdn.com/wp-content/uploads/2014/05/nationals_logo-768x768.png`
}
const teamNames = {
  player1: 'redSox',
  player2: 'yankees',
  dBacks: `Arizona Diamondbacks`,
  braves: `Atlanta Braves`,
  orioles: `Baltimore Orioles`,
  redSox: 'Boston Red Sox',
  cubs: `Chicago Cubs`,
  whiteSox: `Chicago White Sox`,
  reds: `Cincinatti Reds`,
  indians: `Cleveland Indians`,
  rockies: `Colorado Rockies`,
  tigers: `Detroit Tigers`,
  astros: `Houston Astros`,
  royals: `Kansas City Royals`,
  angels: `Los Angeles Angels`,
  dodgers: `Los Angeles Dodgers`,
  marlins: `Miami Marlins`,
  brewers: `Milwaukee Brewers`,
  twins: `Minnesota Twins`,
  mets: `New York Mets`,
  yankees: 'New York Yankees',
  athletics: `Oakland Athletics`,
  phillies: `Philadelphia Phillies`,
  pirates: `Pittsburg Pirates`,
  cardinals: `St. Louis Cardinals`,
  padres: `San Diego Padres`,
  giants: `San Francisco Giants`,
  mariners: `Seattle Mariners`,
  rays: `Tampa Bay Rays`,
  rangers: `Texas Rangers`,
  blueJays: `Toronto Blue Jays`,
  nationals: `Washington Nationals`
}

if (window.location.hostname === 'localhost') {
  apiUrl = apiUrls.development
} else {
  apiUrl = apiUrls.production
}

// console.log = function () {}

module.exports = {
  console,
  apiUrl,
  imgUrls,
  teamNames
}
