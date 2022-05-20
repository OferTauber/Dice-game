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
    return <h2 className="welcome">Gane instructions</h2>;
  }
}

class Error extends Component {
  render() {
    return (
      <h2 className="error-message">Target score must be between 20 and 500</h2>
    );
  }
}
