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
    console.log('get favorites reached')
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
  componentDidMount() {
    this.getFavorites();
  }
  render() {
    return (
      <FavoritesContainer />
    )
  }
}

export default Favorites;