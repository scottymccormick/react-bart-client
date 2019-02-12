import React from 'react';

const RegistrationForm = (props) => {
  return (
    <div>
      <h2>Registration Form</h2>
      <form onSubmit={props.handleSubmit}>
        <label>
          Email:
          <input type="email" name="email" value={props.email} onChange={props.handleChange}/><br/>
        </label>
        <label>
          Name:
          <input type="text" name="name" value={props.name} onChange={props.handleChange}/><br/>
        </label>
        <label>
          Password:
          <input type="password" name="password" value={props.password} onChange={props.handleChange}/><br/>
        </label>
        <input type="submit" value="Submit"/>
      </form>
    </div>
  )
}

export default RegistrationForm;