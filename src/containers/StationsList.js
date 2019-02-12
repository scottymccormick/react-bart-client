import React from 'react';

const StationsList = (props) => {
  const stationListItems = props.stations.map((station, i) => {
    return <li key={i}><button onClick={props.selectStation.bind(null, station.abbr)}>{station.name}</button></li>
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