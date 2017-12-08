import React, { Component } from 'react';
import Util from './Util';

class RacingEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      competitors: []
    };
  }

  componentDidMount() {
    this.setEvent();
  }

  setEvent() {
    let eventID = this.props.event.EventID;
    const url = 'https://www.ladbrokes.com.au/api/feed/eventRunners?event_id=' + eventID;
    fetch(url)
    .then(results => {
      return results.json();
    }).then(data => {
      let competitors = [];
      let competitorObj = {};
      // add competitors to array for easier manipulation
      for (let competitorID in data[eventID]['competitors']) {
        competitorObj = data[eventID]['competitors'][competitorID];
        competitorObj.competitorID = competitorID;
        competitors.push(competitorObj);
      }

      this.setState({competitors: competitors});

    });
  }

  render() {
    return (
      <div className="container mt-3 border border-danger p-3">
        <EventHeader event={this.props.event} />
        <h5 className="m-4">Competitors</h5>
        <CompetitorList competitors={this.state.competitors} />
      </div>
    );
  }
}

class EventHeader extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-4">
          <h4>{this.props.event.Meeting} Race {this.props.event.RaceNum}</h4>
          <h5>{this.props.event.Description}</h5>
        </div>
        <div className="col-8 text-right">
          <div className="row">
            <div className="col-4 font-weight-bold">
              Race Type: {Util.getEventTypes()[this.props.event.RaceType]}
            </div>
            <div className="col-4 font-weight-bold">
              Race Time: {Util.getTime(this.props.event.SuspendDateTime)}
            </div>
            <div className="col-4 font-weight-bold">
              Race Status: {this.props.event.Status}
            </div>
            <div className="col-4 font-weight-bold">
              Distance: {this.props.event.Distance}
            </div>
            <div className="col-4 font-weight-bold">
              Track: {this.props.event.TrackCondition}
            </div>
            <div className="col-4 font-weight-bold">
              Weather: {this.props.event.Weather}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class CompetitorList extends Component {
  render() {
    let rows = this.props.competitors.map(competitor => 
      <tr key={competitor.competitorID}>
        <td>{competitor.Saddle}</td>
        <td>{competitor.Name}</td>
        <td>{competitor.Jockey}</td>
        <td>{competitor.Weight}</td>
        <td>{competitor.Barrier}</td>
      </tr>
    );
    return (
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Saddle</th>
            <th scope="col">Name</th>
            <th scope="col">Jockey</th>
            <th scope="col">Weight</th>
            <th scope="col">Barrier</th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    );
  }
}

export default RacingEvent;
