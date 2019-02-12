import React, { Component } from 'react';
import StationsList from '../containers/StationsList';
import axios from 'axios';

class Stations extends Component {
  constructor() {
    super();

    this.state = {
      stations: []
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
  componentDidMount() {
    this.getStations();
  }
  render() {
    return (
      <div>
        <h2>Stations</h2>
        <button onClick={this.props.hideStations}>Hide Stations</button>
        <StationsList stations={this.state.stations} />
      </div>
    )
  }
}

export default Stations;