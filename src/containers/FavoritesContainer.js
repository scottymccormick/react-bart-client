import React from 'react';
import { Button } from 'reactstrap';

const FavoritesContainer = (props) => {
  return (
    <div className="bg-light p-3 m-2">
      {console.log('fav container props',props)}
      <h3>Favorites Container</h3>
      <p>Quick Start: {props.quickStart ? 
        (props.quickStart.destination ?
          props.quickStart.origin + ' to ' + props.quickStart.destination : 
          props.quickStart.origin) : 
        'Not Set'}</p>
      {props.favorites.map((favorite, i) => {
        return (
          <div key={i}>
            <span>{favorite.destination ? 'Route: ' : 'Station: ' }</span>
            {favorite.destination ?
              <span>{favorite.origin} => {favorite.destination}</span>
              : <span>{favorite.origin}</span>
            }
            {props.quickStart && favorite._id === props.quickStart._id ? 
              <Button color="warning" onClick={props.removeQuickStart.bind(null, props.quickStart._id)}>- Quick Start</Button> : 
              <Button color="success" onClick={props.setQuickStart.bind(null, favorite._id)}>+ Quick Start</Button>}
            
            <Button color="danger" onClick={props.handleDelete.bind(null, favorite._id)}>X</Button>
          </div>
        )
      })}
    </div>
  )
}

export default FavoritesContainer;