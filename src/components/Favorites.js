import React, { Component } from 'react';
import FavoritesContainer from '../containers/FavoritesContainer';

class Favorites extends Component {
  constructor() {
    super();

    this.state = {
      favorites: []
    }
  }
  componentDidMount() {
    this.props.getFavorites();
  }
  render() {
    return (
      <FavoritesContainer favorites={this.props.favorites} handleDelete={this.props.deleteFavorite}/>
    )
  }
}

export default Favorites;