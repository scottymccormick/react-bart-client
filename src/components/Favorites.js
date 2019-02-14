import React, { Component } from 'react';
import FavoritesContainer from '../containers/FavoritesContainer';

class Favorites extends Component {
  setQuickStart() {
    console.log('reached set quick start');
  }
  removeQuickStart() {
    console.log('remove from quick start')
  }
  componentDidMount() {
    this.props.getFavorites();
  }
  render() {
    return (
      <FavoritesContainer favorites={this.props.favorites} handleDelete={this.props.deleteFavorite} quickStart={this.props.quickStart} setQuickStart={this.setQuickStart} removeQuickStart={this.removeQuickStart}/>
    )
  }
}

export default Favorites;