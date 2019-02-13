import React from 'react';

const RouteForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <label>
        Origin:
        <input type="text" name="origin" value={props.formInfo.origin} onChange={props.handleInput}/>
      </label><br/>
      <label>
        Destination:
        <input type="text" name="destination" value={props.formInfo.destination} onChange={props.handleInput}/>
      </label><br/>
      <input type="submit" value="Submit"/>
    </form>
  )
}

export default RouteForm;