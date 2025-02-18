const Login =()=>{
    return(
        <div>
        <h2>Login</h2>
        <form action="" method="post">
  <div className="imgcontainer">
    <img src="dish.avif" alt="Avatar" className="avatar"/>
  </div>

  <div className="container">
    <label htmlFor="uname"><b>Email</b></label>
    <input type="text" placeholder="Enter Username" name="uname" required />

    <label htmlFor="psw"><b>Password</b></label>
    <input type="password" placeholder="Enter Password" name="psw" required />
        
    <button type="submit">Login</button>
    <label>
      <input type="checkbox" defaultChecked="defaultChecked" name="remember" /> Remember me
    </label>
  </div>

  <div className="container" >
    <button type="button" className="cancelbtn">Cancel</button>
    <span className="psw">Forgot <a href="#">password?</a></span>
  </div>
</form>

        </div>
    )
}
export default Login;