import React from 'react';

const FavoritesContainer = (props) => {
  return (
    <div>
      <h3>Favorites Container</h3>
      {props.favorites.map((favorite, i) => {
        return (
          <div key={i}>
            <span>{favorite.destination ? 'Route: ' : 'Station: ' }</span>
            {favorite.destination ?
              <span>{favorite.origin} => {favorite.destination}</span>
              : <span>{favorite.origin}</span>
            }
            <button onClick={props.handleDelete.bind(null, favorite._id)}>Delete</button>
          </div>
        )
      })}
    </div>
  )
}

export default FavoritesContainer;