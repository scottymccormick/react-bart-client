import React, { Component } from 'react';
import './App.css';
import Login from './components/Login';
import Registration from './components/Registration';
import axios from 'axios';
import Stations from './components/Stations';
import RoutePlanner from './components/RoutePlanner';
import Favorites from './components/Favorites';
import { Link as RouterLink, Route } from 'react-router-dom';
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
  toggleOpenQuickStart = async () => {
    if (this.state.quickStart.destination) {
      await this.setState({
        openQuickStart: true,
        showStations: false,
        showRoutePlanner: true,
        showFavorites: false
      })
    } else {
      await this.setState({
        openQuickStart: true,
        showStations: true,
        showRoutePlanner: false,
        showFavorites: false
      })
    }
  }
  endOpenQuickStart = async () => {
    this.setState({
      openQuickStart: false
    });
  }
  setOpenFavorite = async (favoriteIndex) => {
    if (this.state.favorites[favoriteIndex].destination) {
      await this.setState({
        openFavorite: favoriteIndex,
        showStations: false,
        showRoutePlanner: true,
        showFavorites: false
      })
    } else {
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
        <Navbar color="light" primary="true" expand="xs">
          {/* <RouterLink to="/"> */}
          <NavbarBrand href="/"><strong>BART Track</strong></NavbarBrand>
          {/* </RouterLink> */}
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
          
        {/* New Layout starts here */}
        <section className="my-5 p-3">
          <Route exact path="/" render={() => 
            <div>
              <Row>
                <Col xs={6}>
                  <Button size="lg" block color="success" className="home-button" >Quick Start</Button>
                </Col>
                <Col xs={6}>
                  <RouterLink to="/favorites">
                    <Button size="lg" block color="info" className="home-button" >Favorites</Button>
                  </RouterLink>
                </Col>
              </Row>
              <Row>
                <Col xs={6}>
                  <RouterLink to="/stations">
                    <Button size="lg" block color="primary" className="home-button" >Stations</Button>
                  </RouterLink>
                </Col>
                <Col xs={6}>
                  <RouterLink to="/routeplanner">
                    <Button size="lg" block color="light" className="home-button" >Route Planner</Button>
                  </RouterLink>
                </Col>
              </Row>
            </div>
          } />

          <Route path="/stations" render={props => 
            <Stations {...props}
              hideStations={this.toggleStations} 
              logged={this.state.logged} 
              email={this.state.email} 
              addFavorite={this.addFavorite} 
              deleteFavorite={this.deleteFavorite} 
              favorites={this.state.favorites} 
              quickStart={this.state.quickStart} 
              openQuickStart={this.state.openQuickStart} 
              endOpenQuickStart={this.endOpenQuickStart} 
              openFavorite={this.state.openFavorite} 
              endOpenFavorite={this.endOpenFavorite} /> 
            } 
          />
          <Route path="/routeplanner" render={props => 
            <RoutePlanner {...props}
              hideRoutePlanner={this.toggleRoutePlanner} 
              logged={this.state.logged} 
              addFavorite={this.addFavorite} 
              deleteFavorite={this.deleteFavorite} 
              favorites={this.state.favorites} 
              quickStart={this.state.quickStart} 
              openQuickStart={this.state.openQuickStart} 
              endOpenQuickStart={this.endOpenQuickStart} 
              openFavorite={this.state.openFavorite} 
              endOpenFavorite={this.endOpenFavorite}/>
            } 
          />
          <Route exact path="/favorites" render={() => 
            <Favorites 
              email={this.state.email} 
              favorites={this.state.favorites} 
              getFavorites={this.getFavorites} 
              deleteFavorite={this.deleteFavorite} 
              quickStart={this.state.quickStart} 
              removeQuickStart={this.removeQuickStart} 
              setQuickStart={this.setQuickStart} 
              setOpenFavorite={this.setOpenFavorite} 
              endOpenFavorite={this.endOpenFavorite}/>
            } 
          />

          

          {/* New Layout ends here */}

          {/* {this.state.logged && this.state.quickStart ? 
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
            </div> : null} */}
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

export default App;
