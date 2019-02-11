import React from 'react';

const Login = (props) => {
  return (
    <div>
      <form>
        <label>
          Email:
          <input type="email" name="email"/>
        </label>
        <label>
          Password:
          <input type="password" name="password"/>
        </label>
        <input type="submit" value="Login"/>
      </form>
    </div>
  )
}

export default Login;