import React, { Component } from 'react';
import StationsList from '../containers/StationsList';
import axios from 'axios';
import Station from './Station';

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
    console.log('select station clicked', abbr)
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
          <Station currentStation={this.state.currentStation} goBack={this.deselectStation} /> : null	}
        <StationsList stations={this.state.stations} selectStation={this.selectStation} />
      </div>
    )
  }
}

export default Stations;