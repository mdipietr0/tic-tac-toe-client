# STRIKEOUT - A tic-tac-toe game
Strikeout is an MLB themed in-browser tic-tac-toe client. It is a single page
application (SPA) that interfaces with a state managing backend API using AJAX.

## Technologies Used:

- HTML
- CSS
- Bootstrap
- JavaScript
- jQuery
- AJAX
- Git

## Planning and Development process:

My process began with planning out how my client app would communicate with the
API. I first determined what resources I would need from the API and what
endpoints needed to be interfaced with for each of those resources.

I determined that I would need to make requests to two resources; a 'User'
resource, and a 'Games' resource. I began to organize my file structure by
creating subdirectories in my scripts directory for each resource. Within each
resource's subdirectory I created 3 files to separate event handlers, API calls,
and UI updates related to the resource.

I began coding in the plumbing of my app by creating a simple HTML document
to use for development and testing. It consisted of forms and buttons that
I would hook up to handlers and trigger API calls. I then hooked these elements
up to my javascript by adding event handlers in jQuery. I added the
functionality for each endpoint incrementally, testing each before moving on to
the next one. Once this bit of plumbing was done I continued to implement all of
the interactions with each API endpoint.

I then created the game logic as a standalone file that I could run and test in
node. I created a single Game object with a constructor function and prototype
methods that I would then create and modify in my app as necessary. Once all
this was done I styled the app using Bootstrap, CSS, and a little SASS.

##Wireframe:
![Initial Wireframe](https://i.imgur.com/rgWk2bS.png)

## User Stories:
  - A user will be able to register an account
    - Upon success the user will also be signed in
    - Upon failure the user will be shown an error message
  - A user will be able to log in to their account
    - Upon success the user will be shown the main menu screen
    - Upon failure the user will be shown an error message
  - A user will be able to log out out their account
    - Upon success the user will be signed out and returned to the landing page
    - Upon failure the user will be shown an error message
  - A user will be able to change their password
    - Upon success the user will be shown a success message
    - Upon failure the user will be shown an error message
  - A user will be able to start a new game of load previously unfinished games
  - A user will be able to select which team they would like to play as
  - A user will be able to view their game statistics
  - A user will be able to play tic-tac-toe
  - A user be shown the winner upon success

## Version 2 (Currently developing):

  - Multiplayer client
  - Test-Suite
  - Display outs as circles like on the scoreboard
	   - 1 out for 1 in a row
	   - 2 outs for 2 in a row
	   - 3 outs for 3 in a row (Strikeout)
