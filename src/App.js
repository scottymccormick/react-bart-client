import React, { Component } from 'react';
import './App.css';
import Login from './components/Login';
import Registration from './components/Registration';
import axios from 'axios';
import Stations from './components/Stations';
import RoutePlanner from './components/RoutePlanner';
import Favorites from './components/Favorites';
import { Link as RouterLink, Route, withRouter } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
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
      stations: [],
      favorites: [],
      showLogin: false,
      showRegistration: false
    }
  }
  loadStations = () => {
    axios.get(`${process.env.REACT_APP_API}/api/stations`)
      .then((response) => {
        if (response.status === 200) {
          this.setState({
            stations: response.data
          })
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }
  handleLogin = (user) => {
    this.setState({
      logged: true,
      email: user.email,
      userId: user.userId,
      user: user,
      showLogin: false,
      showRegistration: false
    });
    if (user.quickStart) {
      axios.get(`${process.env.REACT_APP_API}/api/users/favorites/${user.quickStart}`)
      .then((response) => {
        this.setState({quickStart: response.data})
      })
      .catch((err) => {
        console.log(err);
      })
    }
    
  }
  handleLogoutClick = (e) => {
    axios.get(`${process.env.REACT_APP_API}/api/users/logout`)
      .then((response) => {
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
  addFavorite = (origin, destination, e) => {
    const newFavorite = {
      email: this.state.email,
      origin
    }
    if (destination && typeof destination === 'string') {
      newFavorite.destination = destination;
    }
    axios.post(`${process.env.REACT_APP_API}/api/users/favorites`, newFavorite)
      .then((response) => {
        this.setState({
          favorites: [...this.state.favorites, response.data]
        });
      })
      .catch((error) => {
        console.log(error)
      })
  }
  getFavorites = () => {
    axios.get(`${process.env.REACT_APP_API}/api/users/favorites?email=${this.state.email}`)
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
    axios.delete(`${process.env.REACT_APP_API}/api/users/favorites/${favoriteId}`)
      .then((response) => {
        if (response.status === 200) {
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
    const userDbEntry = {
      quickStart: newQuickStart
    }
    axios.put(`${process.env.REACT_APP_API}/api/users/${this.state.userId}`, userDbEntry)
      .then((response) => {
        this.setState({
          quickStart: this.state.favorites.find((fav) => fav._id === newQuickStart)
        })
      })
      .catch((err) => {
        console.log(err)
      });
  }
  removeQuickStart = (currentQuickStart) => {
    const userDbEntry = {
      quickStart: null
    }
    axios.put(`${process.env.REACT_APP_API}/api/users/${this.state.userId}`, userDbEntry)
      .then((response) => {
        this.setState({quickStart: null});
      })
      .catch((err) => {
        console.log(err)
      });
  }
  handleQuickStart = () => {
    const quickStart = this.state.quickStart
    console.log(this.state)
    if (quickStart.destination) {
      const queryString = `/routeplanner?origin=${quickStart.origin}&dest=${quickStart.destination}`
      this.props.history.push(queryString)
    } else {
      this.props.history.push(`/stations/${quickStart.origin}`)
    }
  }
  componentDidMount() {
    this.loadStations()
  }
  render() {
    return (
      <div className="App h-100">
        <Navbar color="light" primary="true" expand="xs">
          <LinkContainer to="/">
            <NavbarBrand>
                <strong>BART Track</strong>
            </NavbarBrand>
          </LinkContainer>
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
            <Route exact path="/" render={() => 
              <div>
                {this.state.logged ? 
                  <Row className="justify-content-center">
                    <Col xs={6} md={4}>
                      {this.state.quickStart ? 
                        <Button size="lg" block color="success" className="home-button" onClick={this.handleQuickStart}>Quick Start</Button>
                        : 
                        <Button size="lg" block color="success" className="home-button" disabled>Set Quick Start from Favorites</Button>
                      }
                    </Col>
                    <Col xs={6} md={4}>
                      <RouterLink to="/favorites">
                        <Button size="lg" block color="info" className="home-button" >Favorites</Button>
                      </RouterLink>
                    </Col>
                  </Row>
                : null
                }
                <Row className="justify-content-center">
                  <Col xs={6} md={4}>
                    <RouterLink to="/stations">
                      <Button size="lg" block color="primary" className="home-button" >Stations</Button>
                    </RouterLink>
                  </Col>
                  <Col xs={6} md={4}>
                    <RouterLink to="/routeplanner">
                      <Button size="lg" block color="light" className="home-button" >Route Planner</Button>
                    </RouterLink>
                  </Col>
                </Row>
              </div>
            } />

            <Route path="/stations" render={props => 
              <Stations {...props}
                stations={this.state.stations}
                logged={this.state.logged} 
                email={this.state.email} 
                addFavorite={this.addFavorite} 
                deleteFavorite={this.deleteFavorite} 
                favorites={this.state.favorites} 
                quickStart={this.state.quickStart}
                /> 
              } 
            />
            <Route path="/routeplanner" render={props => 
              <RoutePlanner {...props}
                stations={this.state.stations}
                logged={this.state.logged} 
                addFavorite={this.addFavorite} 
                deleteFavorite={this.deleteFavorite} 
                favorites={this.state.favorites} 
                quickStart={this.state.quickStart}
                />
              } 
            />
            <Route exact path="/favorites" render={props => 
              <Favorites {...props}
                stations={this.state.stations}
                email={this.state.email} 
                favorites={this.state.favorites} 
                getFavorites={this.getFavorites} 
                deleteFavorite={this.deleteFavorite} 
                quickStart={this.state.quickStart} 
                removeQuickStart={this.removeQuickStart} 
                setQuickStart={this.setQuickStart}
                />
              } 
            />

          </section>
          {this.state.showLogin ?
            <Login handleLogin={this.handleLogin} handleLogout={this.handleLogout} currentUser={this.state} toggleLoginModal={this.toggleLoginModal} showLogin={this.state.showLogin}/> : null}
          {this.state.showRegistration ? 
            <Registration handleLogin={this.handleLogin} showRegistration={this.state.showRegistration} toggleRegistrationModal={this.toggleRegistrationModal} /> : null }
          
          <img className="background-image" src={process.env.PUBLIC_URL + '/images/bart-background.jpg'} alt="background"/>
        </main>
        <small className="fixed-bottom text-light" style={{zIndex: '-10'}}>Background by Corey Agopian on Unsplash</small>
      </div>
    );
  }
}

export default withRouter(App);
