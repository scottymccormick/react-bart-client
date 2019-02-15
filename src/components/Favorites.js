import React, { Component } from 'react';
import FavoritesContainer from '../containers/FavoritesContainer';

class Favorites extends Component {
  componentDidMount() {
    this.props.getFavorites();
  }
  render() {
    return (
      <FavoritesContainer favorites={this.props.favorites} handleDelete={this.props.deleteFavorite} quickStart={this.props.quickStart} setQuickStart={this.props.setQuickStart} removeQuickStart={this.props.removeQuickStart} setOpenFavorite={this.props.setOpenFavorite} endOpenFavorite={this.props.endOpenFavorite}/>
    )
  }
}

export default Favorites;