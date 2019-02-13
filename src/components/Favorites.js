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
  getFavorites = () => {
    console.log('get favorites reached');
    axios.get(`http://localhost:9000/api/users/favorites?email=${this.props.email}`)
      .then((response) => {
        if (response.status === 200) {
          console.log(response);
          this.setState({
            favorites: response.data
          })
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }
  handleDelete = (favoriteId, e) => {
    console.log('reached delete favorite', favoriteId)
    axios.delete(`http://localhost:9000/api/users/favorites/${favoriteId}`)
      .then((response) => {
        if (response.status === 200) {
          console.log(response);
          const updatedFavorites = this.state.favorites.filter((favorite) => {
            return favorite._id !== response.data._id;
          });
          this.setState({
            favorites: updatedFavorites
          });
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }
  componentDidMount() {
    this.getFavorites();
  }
  render() {
    return (
      <FavoritesContainer favorites={this.state.favorites} handleDelete={this.handleDelete}/>
    )
  }
}

export default Favorites;