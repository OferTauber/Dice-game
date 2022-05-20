import React, { Component } from 'react';
import './message.css';

export default class Message extends Component {
  startGame(event) {
    const targetScore = event.target.children[0].value;
    if (targetScore >= 20 && targetScore <= 500) {
      this.props.newGameFunc(targetScore);
    } else {
      this.setState({ error: true });
    }
  }

  state = { error: false };

  render() {
    return (
      <div className="message">
        {this.props.displayWelcome && <Welcome />}
        <div className="target-score">
          <h3>Please select a target score</h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              this.startGame(e);
            }}
          >
            <input type="number" defaultValue="100" />
            <input
              type="submit"
              className="btn  btn--select"
              value="Start game"
            />
          </form>
          {this.state.error && <Error />}
        </div>
      </div>
    );
  }
}

class Welcome extends Component {
  render() {
    return (
      <div className="welcome">
        <h2>Game Instructions:</h2>
        <ul>
          <li>
            In your turn - roll the dice (at least once) and accumulate the
            result in "current"
          </li>
          <li>
            You can roll again or click "Hold" to save the points from "Current"
            and end the turn.
          </li>
          <li>
            Note! If you get 6-6 - you will lose all points from "current" and
            the turn will go to your opponent.
          </li>
          <li>
            If you managed to reach exactly the target score - you win! If you
            passed it - you loose ...
          </li>
        </ul>
      </div>
    );
  }
}

class Error extends Component {
  render() {
    return (
      <h2 className="error-message">Target score must be between 20 and 500</h2>
    );
  }
}
