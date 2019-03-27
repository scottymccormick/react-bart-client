import React, { Component } from 'react';
import FavoritesContainer from '../containers/FavoritesContainer';

class Favorites extends Component {
  navToFavorite = (favorite, e) => {
    if (favorite.destination) {
      const queryString = `/routeplanner?origin=${favorite.origin}&dest=${favorite.destination}`
      this.props.history.push(queryString)
    } else {
      this.props.history.push(`/stations/${favorite.origin}`)
    }
  }
  componentDidMount() {
    this.props.getFavorites();
  }
  render() {
    return (
      <FavoritesContainer favorites={this.props.favorites} handleDelete={this.props.deleteFavorite} quickStart={this.props.quickStart} setQuickStart={this.props.setQuickStart} removeQuickStart={this.props.removeQuickStart} navToFavorite={this.navToFavorite}
      />
    )
  }
}

export default Favorites;