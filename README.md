# Dice game

I'm excited to present the first project I wrote using ReactJS!

The project was written after about a week of studying the technology, and does not use the "hooks" system - all functions and data are processed from the parent component in "drilling down".

# Rules of the Game:

1. In his turn - a player must roll the dice at least once.
2. The result of the dice roll is saved in "Current"
3. The player can choose whether to end the turn and take the score he has accumulated in "current" (and add it to his total score) or throw the cube again and accumulate more points for "current"
4. If the result of the dice roll is 6-6 the player loses all the "current" score and the turn passes to the opponent.
5. A player who managed to reach exactly the target score - wins. A player who has passed the target score - loses.

# Component structure:

Main - Holds almost all the information and manages the game. All the methods that change the state of Main are transferred while creating a "closure" to the component (using that = this) - so that children have the ability to influence the parent.
Player - Displays the latest data of each player (as updated in Main). The component does not store or manage information, but only responds to the changes dictated by Main
Controllers - Receives the callbakces from Main, thus updating it. The only significant functionality is the cube, and the component only conveys the random value obtained.
Message - Verifies that the target score selected by the user is valid and then transfers it to Main.

# Design:

The game design is based on a similar game, from the course "The Complete JavaScript Course 2022: From Zero to Expert!", By Jonas Schmedtmann - which I highly recommend!
I wrote the original version as part of the above course at vanillaJS. For the purpose of this project I created from scratch all the logic, added the existing design to it and turned it into a mobile-responsive one.

## Tech Stack

HTML
CSS
JS
React

## Acknowledgements

- [Jonas Schmedtmann](https://www.udemy.com/user/jonasschmedtmann/)
  Jonas's corse:
  [The Complete JavaScript Course 2022: From Zero to Expert!](https://www.udemy.com/course/the-complete-javascript-course/)

## Demo

https://ofer-dice-game.netlify.app
