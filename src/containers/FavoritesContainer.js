import React from 'react';

const FavoritesContainer = (props) => {
  return (
    <div>
      <h3>Favorites Container</h3>
      <p>Quick Start: {props.quickStart ? props.quickStart.origin : 'Not set'}</p>
      {props.favorites.map((favorite, i) => {
        return (
          <div key={i}>
            <span>{favorite.destination ? 'Route: ' : 'Station: ' }</span>
            {favorite.destination ?
              <span>{favorite.origin} => {favorite.destination}</span>
              : <span>{favorite.origin}</span>
            }
            {props.quickStart && favorite._id === props.quickStart._id ? 
              <button onClick={props.removeQuickStart.bind(null, props.quickStart._id)}>Remove from Quick Start</button> : 
              <button onClick={props.setQuickStart}>Set as Quick Start</button>}
            
            <button onClick={props.handleDelete.bind(null, favorite._id)}>Delete</button>
          </div>
        )
      })}
    </div>
  )
}

export default FavoritesContainer;