import React from 'react';

export default class Header extends React.Component {
  render() {
    return (
      <h1 className="centered">{this.props.title}</h1>
    )
  }
}