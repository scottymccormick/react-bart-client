import React, { Component } from 'react';
import StationPicker from '../containers/StationPicker';
import { Route } from 'react-router-dom';
import Station from './Station';

class Stations extends Component {
  chooseStation = (e) => {
    const location = {
      pathname: `/stations/${e.currentTarget.value}`
    }
    this.props.history.push(location)
  }
  render() {
    return (
      <div className="my-4 p-4 bg-dark">
        <Route path={`${this.props.match.path}/:id`} 
          render={(props) =>
            <div>
              <StationPicker {...props}
                stations={this.props.stations} 
                selectStation={this.selectStation}
                chooseStation={this.chooseStation} />
              <Station {...props}
                goBack={this.deselectStation} 
                logged={this.props.logged} 
                email={this.props.email} 
                addFavorite={this.props.addFavorite} 
                deleteFavorite={this.props.deleteFavorite} 
                favorites={this.props.favorites}
                />
            </div> 
            }
          />
        <Route exact path={this.props.match.path} render={() => 
          <StationPicker 
            stations={this.props.stations} 
            selectStation={this.selectStation}
            chooseStation={this.chooseStation} 
            />
          } 
        />
      </div>
    )
  }
}

export default Stations;