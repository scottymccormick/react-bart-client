import React from 'react';

const RouteResults = (props) => {
  const routeOptions = props.results.map((result, i) => {
    return (
      <div key={i}>
        {result.leg.map((eachLeg, j) => {
          return (
            <div key={j}>
              {result.leg.length > 1 ? <h4>Leg {j + 1}</h4>	: null}
              <p> Leave from {eachLeg['@origin']} at {eachLeg['@origTimeMin']} on the {eachLeg['@trainHeadStation']} train</p>
              <p> Arrive at {eachLeg['@destination']} at {eachLeg['@destTimeMin']}</p>
            </div>
          )
        })}
        <hr/>
      </div>
    )
  });
  const favIndex = props.favorites.findIndex((fav) => {
    return fav.origin === props.origin && fav.destination === props.destination
  }) ;
  return (
    <div>
      <h4>Route Results</h4>
      {
        props.logged ? 
        <div>
          <br/>
          {favIndex > -1 ? 
            <button onClick={props.deleteFavorite.bind(null, props.favorites[favIndex]._id)}>Remove from Favorites</button> : 
            <button onClick={props.addFavorite.bind(null, props.origin, props.destination)}>Add to Favorites</button>}
          
          <br/>
        </div> : null
      }
      {routeOptions}
    </div>
  )
}

export default RouteResults;