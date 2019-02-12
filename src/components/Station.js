import React, { Component } from 'react';
import StationPage from '../containers/StationPage';
import axios from 'axios';

class Station extends Component {
  constructor(props) {
    super(props);

    this.state = {
      abbr: props.currentStation,
      etd: []
    }
  }
  getEtds = () => {
    axios.get(`http://localhost:9000/api/stations/etd/${this.state.abbr}`)
      .then((response) => {
        if (response.status === 200) {
          this.setState({
            etd: response.data
          });
          console.log(response.data);
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }
  componentDidMount() {
    this.getEtds();
  }
  shouldComponentUpdate(prevProps) {
    return this.props.abbr !== prevProps.currentStation
  }
  render() {
    return (
      <div>
        {this.state.etd.length > 0 ? <StationPage currentStation={this.state.abbr} goBack={this.props.goBack} etd={this.state.etd}/> : null }
      </div>
    )
  }
}

export default Station;