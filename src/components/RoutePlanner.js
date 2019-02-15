import React, { Component } from 'react';
import RouteForm from '../containers/RouteForm';
import axios from 'axios';
import RouteResults from '../containers/RouteResults';
import { Spinner } from 'reactstrap';

class RoutePlanner extends Component {
  constructor() {
    super();

    this.state = {
      origin: '',
      destination: '',
      stations: [],
      routes: [],
      searched: false
    }
  }
  handleInput = (e) => {
    this.setState({
      [e.currentTarget.name]: e.currentTarget.value
    });
  }
  handleSubmit = (e) => {
    e.preventDefault();

    console.log('reached route planner form submit');

    const urlString = `http://localhost:9000/api/routes?orig=${this.state.origin}&dest=${this.state.destination}`;

    this.setState({
      searched: true
    });

    axios.get(urlString)
      .then((response) => {
        if (response.status === 200) {
          console.log(response);
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
  componentDidMount() {
    this.setState({
      searched: false
    })
    axios.get('http://localhost:9000/api/stations')
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
  render() {
    return (
      <div className="bg-light">
        <RouteForm handleSubmit={this.handleSubmit} handleInput={this.handleInput} formInfo={this.state} clearForm={this.clearForm}/>
        {/* <button onClick={this.props.hideRoutePlanner}>Clear</button> */}
        {this.state.searched ?
          (this.state.routes.length > 0 ? 
          <RouteResults results={this.state.routes} origin={this.state.origin} destination={this.state.destination} addFavorite={this.props.addFavorite} logged={this.props.logged} favorites={this.props.favorites} deleteFavorite={this.props.deleteFavorite} /> : <Spinner className="my-2" color="primary" />)
          : null }
      </div>
    )
  }
}

export default RoutePlanner;