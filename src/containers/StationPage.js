import React from 'react';

const StationPage = (props) => {
  return (
    <div>
      <h3>Current Station: {props.currentStation}</h3>
      <button onClick={props.goBack}>Go Back</button>
      {
        props.etd.map((direction, i) => {
          return <div key={i}>
            {direction.destination}
              <ul>
                {
                  direction.estimate.map((est, j) => {
                    return <li key={j}>{est.minutes}{est.minutes !== 'Leaving' ? ' minutes' : ''}</li>
                  })
                }
              </ul>
            </div>
        })
      }
    </div>
  )
}

export default StationPage;