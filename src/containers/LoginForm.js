import React from 'react';

const LoginForm = (props) => {
  return (
    <div>
      <form onSubmit={props.handleSubmit}>
        <label>
          Email:
          <input type="email" name="email" onChange={props.handleInput} value={props.email}/>
        </label>
        <label>
          Password:
          <input type="password" name="password" onChange={props.handleInput} value={props.password}/>
        </label>
        <input type="submit" value="Login"/>
      </form>
      <button onClick={props.handleLogoutClick}>Logout</button>
    </div>
  )
}

export default LoginForm;