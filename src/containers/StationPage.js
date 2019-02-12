import React from 'react';

const StationPage = (props) => {
  return (
    <div>
      <h3>Current Station: {props.currentStation}</h3>
      <button onClick={props.goBack}>Go Back</button>
    </div>
  )
}

export default StationPage;