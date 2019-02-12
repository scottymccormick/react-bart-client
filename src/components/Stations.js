import React, { Component } from 'react';
import StationsList from '../containers/StationsList';
import axios from 'axios';

class Stations extends Component {
  constructor() {
    super();

    this.state = {
      stations: [],
      currentStation: ''
    }
  }
  getStations() {
    axios.get('http://localhost:9000/api/stations')
      .then((response) => {
        if (response.status === 200) {
          this.setState({
            stations: response.data
          })
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }
  selectStation = (abbr) => {
    this.setState({
      currentStation: abbr
    });
  }
  deselectStation = () => {
    this.setState({
      currentStation: ''
    });
  }
  componentDidMount() {
    this.getStations();
  }
  render() {
    return (
      <div>
        <h2>Stations</h2>
        <button onClick={this.props.hideStations}>Hide Stations</button>
        {this.state.currentStation ? 
          <div>
            <h3>Current Station: {this.state.currentStation}</h3>
            <button onClick={this.deselectStation}>Go Back</button>
          </div> : null	}
        <StationsList stations={this.state.stations} selectStation={this.selectStation} />
      </div>
    )
  }
}

export default Stations;