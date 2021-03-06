import React, { Component } from 'react';
import StationPage from '../containers/StationPage';
import axios from 'axios';

class Station extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      etd: [],
      favIndex: -1
    }
  }
  getEtds = () => {
    axios.get(`${process.env.REACT_APP_API}/api/stations/etd/${this.props.match.params.id}`)
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
  getFavIndex() {
    const favIndex = this.props.favorites.findIndex((fav) => {
      return fav.origin === this.props.match.params.id && !fav.destination
    });
    return favIndex;
  }
  componentDidMount() {
    this.getEtds();
  }
  componentDidUpdate(prevProps) {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      this.getEtds();
    }
  }
  render() {
    return (
      <StationPage 
        currentStation={this.props.match.params.id} 
        goBack={this.props.goBack} 
        etd={this.state.etd} 
        stationName={this.state.name} 
        logged={this.props.logged} 
        email={this.props.email} 
        addFavorite={this.props.addFavorite} 
        deleteFavorite={this.props.deleteFavorite} 
        favorites={this.props.favorites} 
        favIndex={this.getFavIndex()} 
        refresh={this.getEtds}/>
    )
  }
}

export default Station;