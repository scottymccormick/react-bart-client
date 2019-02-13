import React, { Component } from 'react';
import StationPicker from '../containers/StationPicker';
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
  }
  deselectStation = () => {
    this.setState({
      currentStation: ''
    });
  }
  chooseStation = (e) => {
    this.setState({
      currentStation: e.currentTarget.value
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
        <StationPicker stations={this.state.stations} selectStation={this.selectStation} origin={this.state.currentStation} chooseStation={this.chooseStation} />
        {this.state.currentStation ? 
          <Station currentStation={this.state.currentStation} goBack={this.deselectStation} logged={this.props.logged} email={this.props.email} addFavorite={this.props.addFavorite}/> : null	}
      </div>
    )
  }
}

export default Stations;