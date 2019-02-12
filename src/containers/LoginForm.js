import React from 'react';

const LoginForm = (props) => {
  return (
    <div>
      <h2>Login Form</h2>
      <form onSubmit={props.handleSubmit}>
        <label>
          Email:
          <input type="email" name="email" onChange={props.handleInput} value={props.email}/><br/>
        </label>
        <label>
          Password:
          <input type="password" name="password" onChange={props.handleInput} value={props.password}/><br/>
        </label>
        <input type="submit" value="Login"/>
      </form>
    </div>
  )
}

export default LoginForm;