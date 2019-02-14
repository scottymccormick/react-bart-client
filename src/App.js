import React, { Component } from 'react';
import './App.css';
import Login from './components/Login';
import Registration from './components/Registration';
import axios from 'axios';
import Stations from './components/Stations';
import RoutePlanner from './components/RoutePlanner';
import Favorites from './components/Favorites';

class App extends Component {
  constructor() {
    super();

    this.state = {
      logged: false,
      email: '',
      favorites: [],
      showLogin: false,
      showRegistration: false,
      showStations: false,
      showRoutePlanner: false,
      showFavorites: false
    }
  }
  handleLogin = (user) => {
    console.log('handle login reached');
    console.log('user', user)
    this.setState({
      logged: true,
      email: user.email,
      showLogin: false,
      showRegistration: false
    });
  }
  handleLogoutClick = (e) => {
    console.log('reached logout');
    axios.get('http://localhost:9000/api/users/logout')
      .then((response) => {
        console.log('logout response',response);
        this.setState({
          logged: false,
          email: '',
          showFavorites: false
        });
      })
  }
  toggleLoginModal = () => {
    this.setState({showLogin: !this.state.showLogin});
  }
  toggleRegistrationModal = () => {
    this.setState({showRegistration: !this.state.showRegistration});
  }
  toggleStations = () => {
    this.setState({
      showStations: !this.state.showStations,
      showRoutePlanner: false
    });
  }
  toggleRoutePlanner = () => {
    this.setState({
      showRoutePlanner: !this.state.showRoutePlanner,
      showStations: false
    });
  }
  toggleFavorites = () => {
    console.log('reached toggle favorites')
    this.setState({
      showFavorites: !this.state.showFavorites
    });
  }
  addFavorite = (origin, destination, e) => {
    const newFavorite = {
      email: this.state.email,
      origin
    }
    if (destination && typeof destination === 'string') {
      newFavorite.destination = destination;
    }
    axios.post('http://localhost:9000/api/users/favorites', newFavorite)
      .then((response) => {
        console.log(response);
        this.setState({
          favorites: [...this.state.favorites, response.data]
        });
      })
      .catch((error) => {
        console.log(error)
      })
  }
  getFavorites = () => {
    console.log('get favorites reached');
    axios.get(`http://localhost:9000/api/users/favorites?email=${this.state.email}`)
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
  deleteFavorite = (favoriteId, e) => {
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
  render() {
    return (
      <div className="App">
        <h1>BART React App</h1>
        {!this.state.showLogin && !this.state.logged ? 
          <div>
            <button onClick={this.toggleLoginModal}>Login</button>
          </div> : null}
        
        {!this.state.showRegistration && !this.state.logged ? 
          <div>
            <button onClick={this.toggleRegistrationModal}>Register</button>
          </div> : null}
        {this.state.showLogin ?
          <Login handleLogin={this.handleLogin} handleLogout={this.handleLogout} currentUser={this.state}/> : null}
        {this.state.showRegistration ? 
          <Registration handleLogin={this.handleLogin} /> : null }
        {this.state.logged ? 
          <div>
            <p>{this.state.email} is logged in.</p><br/>
            <button onClick={this.handleLogoutClick}>Logout</button>
          </div> : null }
        {this.state.showStations ? 
          <Stations hideStations={this.toggleStations} logged={this.state.logged} email={this.state.email} addFavorite={this.addFavorite} deleteFavorite={this.deleteFavorite} favorites={this.state.favorites}/> : 
          <div>
            <button onClick={this.toggleStations}>Stations</button>
          </div> }
        {this.state.showRoutePlanner ?
          <RoutePlanner hideRoutePlanner={this.toggleRoutePlanner} logged={this.state.logged} addFavorite={this.addFavorite} deleteFavorite={this.deleteFavorite} favorites={this.state.favorites} /> :
          <div>
            <button onClick={this.toggleRoutePlanner}>Route Planner</button>
          </div> }
        {this.state.logged ? 
          <div>
            <button onClick={this.toggleFavorites}>Favorites</button>
          </div> : null}
        {this.state.showFavorites ?
          <Favorites email={this.state.email} favorites={this.state.favorites} getFavorites={this.getFavorites} deleteFavorite={this.deleteFavorite}/> : null}
      </div>
    );
  }
}

export default App;
