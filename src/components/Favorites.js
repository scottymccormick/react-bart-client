import React, { Component } from 'react';
import FavoritesContainer from '../containers/FavoritesContainer';

class Favorites extends Component {
  componentDidMount() {
    this.props.getFavorites();
  }
  render() {
    return (
      <FavoritesContainer favorites={this.props.favorites} handleDelete={this.props.deleteFavorite} quickStart={this.props.quickStart}/>
    )
  }
}

export default Favorites;