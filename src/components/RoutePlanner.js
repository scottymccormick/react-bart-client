import React, { Component } from 'react';
import RouteForm from '../containers/RouteForm';
import axios from 'axios';
import RouteResults from '../containers/RouteResults';
import { Spinner, Button } from 'reactstrap';
import { parse as queryParse } from 'query-string';

class RoutePlanner extends Component {
  constructor() {
    super();

    this.state = {
      origin: '',
      destination: '',
      // stations: [],
      routes: [],
      searched: false
    }
  }
  handleInput = async (e) => {
    await this.setState({
      [e.currentTarget.name]: e.currentTarget.value
    });
    if (this.state.origin && this.state.destination) {
      this.handleSubmit()
    }
  }
  handleSubmit = (e) => {
    if (e) e.preventDefault();
    const urlString = `${process.env.REACT_APP_API}/api/routes?orig=${this.state.origin}&dest=${this.state.destination}`;

    this.setState({
      searched: true,
      routes: []
    });

    axios.get(urlString)
      .then((response) => {
        if (response.status === 200) {
          if (response.data) {
            this.setState({
              routes: response.data.request.trip
            })
          }
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }
  clearForm = () => {
    this.setState({
      origin: '',
      destination: '',
      searched: false
    });
  }
  componentDidMount = async () => {
    const query = queryParse(this.props.location.search)
    await this.setState({
      searched: false,
      origin: query.origin,
      destination: query.dest
    })
    axios.get(`${process.env.REACT_APP_API}/api/stations`)
      .then((response) => {
        if (response.status === 200) {
          this.setState({
            stations: response.data
          })
          if (this.state.origin && this.state.destination) {
            this.handleSubmit()
          }
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }
  componentDidUpdate = async (prevProps) => {
    if (prevProps.openQuickStart !== this.props.openQuickStart && this.props.openQuickStart && this.props.quickStart.destination ) {
      await this.setState({
        origin: this.props.quickStart.origin,
        destination: this.props.quickStart.destination
      });
      this.handleSubmit();
      this.props.endOpenQuickStart();
    }
    if (prevProps.openFavorite !== this.props.openFavorite &&
      this.props.openFavorite > -1 && 
      this.props.favorites.length > 0 &&
      this.props.favorites[this.props.openFavorite].destination) {
      await this.setState({
        origin: this.props.favorites[this.props.openFavorite].origin,
        destination: this.props.favorites[this.props.openFavorite].destination
      });
      this.handleSubmit();
      this.props.endOpenFavorite();
    }
  }
  render() {
    const favIndex = this.props.favorites.findIndex((fav) => {
      return fav.origin === this.state.origin && fav.destination === this.state.destination
    });
    return (
      <div className="bg-light pb-3 my-2 mb-4">
        <RouteForm 
          handleSubmit={this.handleSubmit} 
          handleInput={this.handleInput} 
          formInfo={this.state}
          stations={this.props.stations}
          clearForm={this.clearForm}/>
        {
          this.props.logged && this.state.searched ? 
          <div>
            {favIndex > -1 ? 
              <Button color="danger" className="my-2" onClick={this.props.deleteFavorite.bind(null, this.props.favorites[favIndex]._id)}>Remove from Favorites</Button> : 
              <Button color="success" className="my-2" onClick={this.props.addFavorite.bind(null, this.state.origin, this.state.destination)}>Add to Favorites</Button> }
          </div> : null
        }
        {this.state.searched ?
          (this.state.routes.length > 0 ? 
          <RouteResults 
            results={this.state.routes} 
            origin={this.state.origin} 
            destination={this.state.destination} 
            addFavorite={this.props.addFavorite} 
            logged={this.props.logged} 
            favorites={this.props.favorites} 
            deleteFavorite={this.props.deleteFavorite} /> : 
          <Spinner className="my-2" color="primary" />)
          // TODO have message for none found
          : null }
      </div>
    )
  }
}

export default RoutePlanner;