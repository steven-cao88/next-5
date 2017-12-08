import React, { Component } from 'react';
import {
  Route,
  HashRouter
} from 'react-router-dom';
import RacingEvent from './RacingEvent';
import EventCard from './EventCard';

class RacingList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      eventList: null
    };
    this.setList = this.setList.bind(this); // make sure setList is bound to RacingList
  }

  componentDidMount() {
    this.setList();
    this.timerID = setInterval(
      () => this.setList(),
      60000 // refresh list every 1 minute
    );
  }

  componentWillMount() {
    clearInterval(this.timerID);
  }

  setList() {
    const url = 'https://www.ladbrokes.com.au/api/feed/racingList?future=1'; // only get future events
    fetch(url)
    .then(results => {
      return results.json();
    }).then(data => {
      let events = [];
      let eventArr = [];
      let eventList = null;
      // add objects to array for easier manipulation
      for (let eventID in data) {
        events.push(data[eventID]);
      }

      // filter open events
      events = events.filter(event => {
        let remainingTime = 
          parseInt(new Date(event.SuspendDateTime).getTime(), 10) - Date.now() - 3600000;
        // minus 1 hour as returned time in Sydney is 1 hour earlier than in Brisbane

        return event.Status === 'Open' 
          && event.Abandoned === 0
          && (remainingTime > 0);
      });

      // sort event by effective race date ascending
      events = events.sort((eventA, eventB) => {
        return parseInt(new Date(eventA.SuspendDateTime).getTime(), 10) - 
            parseInt(new Date(eventB.SuspendDateTime).getTime(), 10);
      });

      // get 5 most recent events
      eventArr = events = events.slice(0, 5);

      events = events.map(event => 
        <EventCard 
          event={event} 
          key={event.EventID} 
          onEventClosed={this.setList} 
        />
      );

      eventList = 
        <div className="container-fluid">
          <div className="row">
            <div className="col">
              <div className="card-group mt-4 text-center mx-auto">{events}</div>
            </div>
          </div>
        </div>;
      this.setState({
        events: eventArr,
        eventList: eventList
      });
    });
  }

  render() {
    return (
      <HashRouter>
        <div>
          {this.state.eventList}
          <div className="content">
            <RouteGenerator events={this.state.events} />
          </div>
        </div>
      </HashRouter>
    );
  }
}

class RouteGenerator extends Component {
  render() {
    let routes = this.props.events;
    return routes.map(event => 
      <Route 
        key={event.EventID} 
        path={'/' + event.EventID.toString()}
        eventID={event.EventID}
        render={(routeProps) => (
          <RacingEvent {...routeProps} event={event}/>
        )}
      />
    );
  }
}

export default RacingList;
