import React, { Component } from 'react';
import FavoritesContainer from '../containers/FavoritesContainer';
import axios from 'axios';

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