import React, { Component } from 'react';

class Clock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      remainingTime: this.getRemainingTime()
    };
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillMount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      remainingTime: this.getRemainingTime()
    });
  }

  getRemainingTime() {
    // minus 1 hour as returned time in Sydney is 1 hour earlier than in Brisbane
    // TODO: write function to take care of timezone
    let remainingSeconds = Math.round((this.props.suspendDateTime - new Date().getTime()) / 1000);
    let days = Math.floor(remainingSeconds / 86400);
    let hours = Math.floor((remainingSeconds % 86400) / 3600);
    let minutes = Math.floor(((remainingSeconds % 86400) % 3600) / 60);
    let seconds = ((remainingSeconds % 86400) % 3600) % 60;

    return (days ? days + 'd ' : '') + 
      (hours ? hours + 'h ' : '') + 
      (minutes ? minutes + 'm ' : '') + 
      seconds + 's';
  }

  render() {
    if (this.state.remainingTime < 0) return '';
    return (
      <small className="text-muted">{this.state.remainingTime} left</small>
    );
  }
}

export default Clock;