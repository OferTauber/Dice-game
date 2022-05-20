import React from 'react';

export default class Button extends React.Component {
  render() {
    return (
      <button
        className={`btn btn--${this.props.type}`}
        onClick={() => {
          this.props.callback();
        }}
      >
        {this.props.text}
      </button>
    );
  }
}
