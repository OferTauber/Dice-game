import React, { Component } from 'react';

export default class Dice extends Component {
  render() {
    return (
      <img
        src={require(`../assets/dice-${this.props.value}.jpg`)}
        alt="Playing dice"
        className="dice"
      />
    );
  }
}
