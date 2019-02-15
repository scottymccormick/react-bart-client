import React, { Component } from 'react';
import './App.css';
import Login from './components/Login';
import Registration from './components/Registration';
import axios from 'axios';
import Stations from './components/Stations';
import RoutePlanner from './components/RoutePlanner';
import Favorites from './components/Favorites';
import {  
  Collapse,
  Row,
  Col,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Button } from 'reactstrap';

class App extends Component {
  constructor() {
    super();

    this.state = {
      logged: false,
      email: '',
      userId: '',
      user: {},
      quickStart: null,
      favorites: [],
      showLogin: false,
      showRegistration: false,
      showStations: false,
      showRoutePlanner: false,
      showFavorites: false,
      openQuickStart: false,
      openFavorite: -1
    }
  }
  handleLogin = (user) => {
    console.log('handle login reached');
    console.log('user', user);
    this.setState({
      logged: true,
      email: user.email,
      userId: user.userId,
      user: user,
      showLogin: false,
      showRegistration: false
    });
    if (user.quickStart) {
      axios.get(`http://localhost:9000/api/users/favorites/${user.quickStart}`)
      .then((response) => {
        console.log(response);
        this.setState({quickStart: response.data})
      })
      .catch((err) => {
        console.log(err);
      })
    }
    
  }
  handleLogoutClick = (e) => {
    console.log('reached logout');
    axios.get('http://localhost:9000/api/users/logout')
      .then((response) => {
        console.log('logout response',response);
        this.setState({
          logged: false,
          email: '',
          userId: '',
          user: {},
          quickStart: null,
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
      showRoutePlanner: false,
      showFavorites: false
    });
  }
  toggleRoutePlanner = () => {
    this.setState({
      showRoutePlanner: !this.state.showRoutePlanner,
      showStations: false,
      showFavorites: false
    });
  }
  toggleFavorites = () => {
    console.log('reached toggle favorites')
    this.setState({
      showFavorites: !this.state.showFavorites,
      showStations: false,
      showRoutePlanner: false
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
            favorites: updatedFavorites,
            quickStart: null
          });
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }
  setQuickStart = (newQuickStart) => {
    console.log('reached set quick start');
    const userDbEntry = {
      quickStart: newQuickStart
    }
    axios.put(`http://localhost:9000/api/users/${this.state.userId}`, userDbEntry)
      .then((response) => {
        console.log(response);
        this.setState({
          quickStart: this.state.favorites.find((fav) => fav._id === newQuickStart)
        })
      })
      .catch((err) => {
        console.log(err)
      });
  }
  removeQuickStart = (currentQuickStart) => {
    console.log('remove from quick start', currentQuickStart);
    const userDbEntry = {
      quickStart: null
    }
    axios.put(`http://localhost:9000/api/users/${this.state.userId}`, userDbEntry)
      .then((response) => {
        console.log(response);
        this.setState({quickStart: null});
      })
      .catch((err) => {
        console.log(err)
      });
  }
  toggleOpenQuickStart = async () => {
    if (this.state.quickStart.destination) {
      console.log('go to route planner');
      await this.setState({
        openQuickStart: true,
        showStations: false,
        showRoutePlanner: true,
        showFavorites: false
      })
    } else {
      console.log('go to stations');
      await this.setState({
        openQuickStart: true,
        showStations: true,
        showRoutePlanner: false,
        showFavorites: false
      })
      console.log('open qs:', this.state.openQuickStart)
    }
  }
  endOpenQuickStart = async () => {
    this.setState({
      openQuickStart: false
    });
    console.log('ended open quick start')
  }
  setOpenFavorite = async (favoriteIndex) => {
    console.log('Favorite idx:', favoriteIndex)
    if (this.state.favorites[favoriteIndex].destination) {
      console.log('favorite in route planner');
      await this.setState({
        openFavorite: favoriteIndex,
        showStations: false,
        showRoutePlanner: true,
        showFavorites: false
      })
    } else {
      console.log('favorite in stations')
      await this.setState({
        openFavorite: favoriteIndex,
        showStations: true,
        showRoutePlanner: false,
        showFavorites: false
      })
    }
  }
  endOpenFavorite = () => {
    this.setState({
      openFavorite: -1
    });
  }
  render() {
    return (
      <div className="App h-100">
        <Navbar color="light" primary="true" expand="md">
          <NavbarBrand href="/"><strong>BART Track</strong></NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem hidden={this.state.logged}>
                <NavLink onClick={this.toggleLoginModal} href="#">Login</NavLink>
              </NavItem>
              <NavItem hidden={this.state.logged}>
                <NavLink onClick={this.toggleRegistrationModal} href="#">Register</NavLink>
              </NavItem>
              <NavItem hidden={!this.state.logged}>
                <NavLink disabled>Hello, {this.state.user.name}</NavLink>
              </NavItem>
              <NavItem hidden={!this.state.logged}>
                <NavLink onClick={this.handleLogoutClick} color="light" href="#">Logout</NavLink>
              </NavItem>          
            </Nav>
          </Collapse>
        </Navbar>
        <main className="container pb-4">
          
          <section className="my-5 p-3">
          {this.state.logged && this.state.quickStart ? 
            <Row>
              <Col sm={8} md={6} className="mx-auto">
                <Button size="lg" block color="success" className="mb-2" onClick={this.toggleOpenQuickStart}>Quick Start</Button>
              </Col>
            </Row> : null
          }
          <Row>
            <Col sm={this.state.showStations ? "12" : "8"} md={this.state.showStations ? "12" : "6"} className="mx-auto" style={{transition: '.5s ease-in-out'}}>
              <Button size="lg" block color="primary" onClick={this.toggleStations} className="mb-2" >Stations</Button>
            </Col>
          </Row>
          
          <Collapse isOpen={this.state.showStations} style={{transition: '.5s ease-in-out'}}>
            <Stations hideStations={this.toggleStations} logged={this.state.logged} email={this.state.email} addFavorite={this.addFavorite} deleteFavorite={this.deleteFavorite} favorites={this.state.favorites} quickStart={this.state.quickStart} openQuickStart={this.state.openQuickStart} endOpenQuickStart={this.endOpenQuickStart} openFavorite={this.state.openFavorite} endOpenFavorite={this.endOpenFavorite}/>
          </Collapse>
          
          <Row>
            <Col sm={this.state.showRoutePlanner ? "12" : "8"} md={this.state.showRoutePlanner ? "12" : "6"} className="mx-auto" style={{transition: '.5s ease-in-out'}}>
              <Button size="lg" block color="light" onClick={this.toggleRoutePlanner} className="mb-2">Route Planner</Button>
            </Col>
          </Row>
          
          <Collapse isOpen={this.state.showRoutePlanner}>
            <RoutePlanner hideRoutePlanner={this.toggleRoutePlanner} logged={this.state.logged} addFavorite={this.addFavorite} deleteFavorite={this.deleteFavorite} favorites={this.state.favorites} quickStart={this.state.quickStart} openQuickStart={this.state.openQuickStart} endOpenQuickStart={this.endOpenQuickStart} openFavorite={this.state.openFavorite} endOpenFavorite={this.endOpenFavorite}/>
          </Collapse>
          
          {this.state.logged ? 
            <div>
              <Row>
                <Col sm="8" md="6" className="mx-auto">
                  <Button size="lg" block color="secondary" onClick={this.toggleFavorites} className="mb-2">Favorites</Button>
                </Col>
              </Row>
              <Collapse isOpen={this.state.showFavorites}>
                <Favorites email={this.state.email} favorites={this.state.favorites} getFavorites={this.getFavorites} deleteFavorite={this.deleteFavorite} quickStart={this.state.quickStart} removeQuickStart={this.removeQuickStart} setQuickStart={this.setQuickStart} setOpenFavorite={this.setOpenFavorite} endOpenFavorite={this.endOpenFavorite}/>
              </Collapse>
            </div> : null}
          </section>
          {this.state.showLogin ?
            <Login handleLogin={this.handleLogin} handleLogout={this.handleLogout} currentUser={this.state} toggleLoginModal={this.toggleLoginModal} showLogin={this.state.showLogin}/> : null}
          {this.state.showRegistration ? 
            <Registration handleLogin={this.handleLogin} showRegistration={this.state.showRegistration} toggleRegistrationModal={this.toggleRegistrationModal} /> : null }
          
          <img className="background-image" src={process.env.PUBLIC_URL + '/images/bart-background.jpg'} alt="background"/>
        </main>
        <small className="fixed-bottom text-light">Background by Corey Agopian on Unsplash</small>
      </div>
    );
  }
}

export default App;
