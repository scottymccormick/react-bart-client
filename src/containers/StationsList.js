import React from 'react';

const StationsList = (props) => {
  const stationListItems = props.stations.map((station, i) => {
    return <li key={i}><a href="#">{station.name}</a></li>
  })
  return (
    <div>
      <ul>
        {stationListItems}
      </ul>
    </div>
  )
}

export default StationsList;