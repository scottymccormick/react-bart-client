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
    axios.get(`${process.env.REACT_APP_API}/api/stations`)
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
  componentDidUpdate(prevProps) {
    if (prevProps.openQuickStart !== this.props.openQuickStart && this.props.openQuickStart && !this.props.quickStart.destination && this.state.currentStation !== this.props.quickStart.origin) {
      this.setState({
        currentStation: this.props.quickStart.origin
      });
      this.props.endOpenQuickStart();
    }
    if (prevProps.openFavorite !== this.props.openFavorite &&
      this.props.openFavorite > -1 && 
      this.props.favorites.length > 0 && 
      !this.props.favorites[this.props.openFavorite].destination) {
      this.setState({
        currentStation: this.props.favorites[this.props.openFavorite].origin
      });
      this.props.endOpenFavorite();
    }
  }
  render() {
    
    return (
      <div className="my-4 p-4 bg-dark">
        <StationPicker stations={this.state.stations} selectStation={this.selectStation} origin={this.state.currentStation} chooseStation={this.chooseStation} />
        {this.state.currentStation ? 
          <Station currentStation={this.state.currentStation} goBack={this.deselectStation} logged={this.props.logged} email={this.props.email} addFavorite={this.props.addFavorite} deleteFavorite={this.props.deleteFavorite} favorites={this.props.favorites} openFavorite={this.props.openFavorite}/> : null	}
      </div>
    )
  }
}

export default Stations;