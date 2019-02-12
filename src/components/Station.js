import React, { Component } from 'react';
import StationPage from '../containers/StationPage';

class Station extends Component {
  constructor(props) {
    super(props);

    this.state = {
      abbr: props.currentStation
    }
  }
  render() {
    return (
      <StationPage currentStation={this.state.abbr} goBack={this.props.goBack}/>
    )
  }
}

export default Station;