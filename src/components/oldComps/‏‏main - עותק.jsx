import React from 'react';
import Player from './player';
import Dice from './dice';
import Button from './button';

export default class Main extends React.Component {
  callback = function () {
    console.log('callback');
  };

  state = {
    player1Total: 0,
    player1Curr: 0,
    player2Total: 0,
    player2Curr: 0,
    activePlayer: 0,
    gameIsOn: true,
    dice0: 2,
    dice1: 5,
    valueForWinning: 100,
  };

  // newGame() {
  //   this.setState({
  //     players: [
  //       { totalScore: 0, currentScore: 0 },
  //       { totalScore: 0, currentScore: 0 },
  //     ],
  //     activePlayer: 0,
  //     gameIsOn: true,
  //   });
  // }

  rollDice() {
    const that = this;
    return function () {
      const dice = [
        Math.trunc(Math.random() * 6) + 1,
        Math.trunc(Math.random() * 6) + 1,
      ];
      that.setState({ dice0: dice[0], dice1: dice[1] });
      if (that.state.activePlayer === 0) {
        that.captureDiceResToPlayer1(dice);
      } else {
        this.captureDiceResToPlayer2(dice);
      }
    };
  }

  captureDiceResToPlayer1(res) {
    this.setState({
      player1Curr: this.player1Curr + res[0] + res[1],
      dice0: res[0],
      dice1: res[1],
    });
  }
  captureDiceResToPlayer2(res) {
    this.setState({
      player2Curr: this.player1Curr + res[0] + res[1],
      dice0: res[0],
      dice1: res[1],
    });
  }

  render() {
    return (
      <main>
        <Player
          isActive
          score={this.state.player1Total}
          playerNum={0}
          curr={this.state.player1Curr}
        />
        <Player
          score={this.state.player2Total}
          playerNum={1}
          curr={this.state.player2Curr}
        />

        <div className="controllers">
          <Button
            text="🔄 New game"
            type="new"
            callback={this.callback}
          ></Button>
          <Dice id="dice0" value={this.state.dice0} />
          <Dice id="dice1" value={this.state.dice1} />
          <Button
            text="🎲 Roll dice"
            type="roll"
            callback={this.rollDice()}
          ></Button>
          <Button text="📥 Hold" type="hold" callback={this.callback}></Button>
        </div>
      </main>
    );
  }
}
