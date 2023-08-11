const login = (props) => {
  return (
    <form onSubmit={props.handleLogin}>
      <input type='text' value={props.username} id='username-input' name='Username' onChange={({ target }) => props.setUsername(target.value)}></input><br></br>
      <input type='password' value={props.password} id='password-input' name='Password' onChange={({ target }) => props.setPassword(target.value)}></input><br></br>
      <button type='submit' id='login-button'>Login</button>
    </form>
  )
}

export default login