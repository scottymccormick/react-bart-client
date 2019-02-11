import React from 'react';

const LoginForm = (props) => {
  return (
    <div>
      <form onSubmit={props.handleSubmit}>
        <label>
          Email:
          <input type="email" name="email" onChange={props.handleInput}/>
        </label>
        <label>
          Password:
          <input type="password" name="password" onChange={props.handleInput}/>
        </label>
        <input type="submit" value="Login"/>
      </form>
    </div>
  )
}

export default LoginForm;