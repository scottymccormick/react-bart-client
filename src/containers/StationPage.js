import React from 'react';

const StationPage = (props) => {
  return (
    <div>
      <h3>Current Station: {props.stationName}</h3>
      <button style={{display: "block", margin: 'auto'}} onClick={props.goBack}>Go Back</button>
      {
        props.logged ? 
        <div>
          <br/>
          {props.favIndex > -1 ? 
            <button onClick={props.deleteFavorite.bind(null, props.favorites[props.favIndex]._id)}>Remove from Favorites</button> : 
            <button onClick={props.addFavorite.bind(null, props.currentStation)}>Add to Favorites</button>}
          <br/>
        </div> : null
      }
      { props.etd ? 
        props.etd.map((direction, i) => {
          return <div key={i} style={{width: '50%', display: "inline-block"}}>
            <h4>{direction.destination}</h4>
              {
                direction.estimate.map((est, j) => {
                  return <p key={j}>{est.minutes}{est.minutes !== 'Leaving' ? ' minutes' : ''}</p>
                })
              }
            </div>
        }) : null
      }
    </div>
  )
}

export default StationPage;