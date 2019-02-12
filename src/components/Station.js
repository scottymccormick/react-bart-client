import React, { Component } from 'react';
import StationPage from '../containers/StationPage';
import axios from 'axios';

class Station extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      etd: []
    }
  }
  getEtds = () => {
    axios.get(`http://localhost:9000/api/stations/etd/${this.props.currentStation}`)
      .then((response) => {
        if (response.status === 200) {
          this.setState({
            name: response.data.name,
            etd: response.data.etd
          });
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }
  componentDidMount() {
    this.getEtds();
  }
  componentDidUpdate(prevProps) {
    if (this.props.currentStation !== prevProps.currentStation) {
      this.getEtds();
    }
  }
  render() {
    return (
      <StationPage currentStation={this.props.currentStation} goBack={this.props.goBack} etd={this.state.etd} stationName={this.state.name}/>
    )
  }
}

export default Station;