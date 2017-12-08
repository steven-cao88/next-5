import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Clock from './Clock';
import Util from './Util';

class EventCard extends Component {
  render() {
    let event = this.props.event;
    let remainingSeconds = Math.round((event.suspendDateTime - Date.now()) / 1000);
    if (remainingSeconds <= 1) {
      this.props.onEventClosed(); // call the parent list to refresh the data
      return ''; // remove card if event is happening in less than 1 second
    }
    return (
      <div className="card">
        <div className="card-header">{event.Meeting}</div>
        <div className="card-body">
          <div className="card-title">
            <NavLink to={event.EventID.toString()}>R{event.RaceNum}</NavLink>
          </div>
          <div className="text-muted">{Util.getEventTypes()[event.RaceType]}</div>
        </div>
        <div className="card-footer">
          <Clock 
            suspendDateTime={new Date(event.SuspendDateTime).getTime() - 3600000}
            onEventClosed={this.props.onEventClosed} 
          />
        </div>
      </div>
    );
  }
}

export default EventCard;