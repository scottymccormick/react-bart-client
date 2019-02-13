import React from 'react';

const StationPage = (props) => {
  return (
    <div>
      <h3>Current Station: {props.stationName}</h3>
      <button style={{display: "block", margin: 'auto'}} onClick={props.goBack}>Go Back</button>
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