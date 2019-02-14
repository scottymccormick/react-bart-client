import React from 'react';

const StationPicker = (props) => {
  return (
    <div>
      <select className="custom-select custom-select-md w-75" name="origin" value={props.origin} onChange={props.chooseStation}>
        <option key={-1} className="text-center" value="">Please choose a station</option>
        {props.stations.map((station, i) => {
          return <option key={i} value={station.abbr}>{station.name}</option>
        })}
      </select>
    </div>
  )
}

export default StationPicker;