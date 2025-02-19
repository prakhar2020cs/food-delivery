import { useState } from "react";

const Login =()=>{

  const [email , setEmail] = useState('');

  const  handleLogin =  async (e)=>{
    e.preventDefault();
    let result = await fetch(`/api/restaurant?email=${email}`,{
      method:"GET",
      headers: { "Content-Type": "application/json" },
  
    });
let response = await result.json
    console.log(response.user)
  }
// console.log(email);

    return(
        <div>
        <h2>Login</h2>
        <form >
  <div className="imgcontainer">
    <img src="dish.avif" alt="Avatar" className="avatar"/>
  </div>

  <div className="container">
    <label htmlFor="uname" ><b>Email</b></label>
    <input type="text" placeholder="Enter Username" value={email} onChange={(e)=>setEmail(e.target.value)} name="email" required />

    <label htmlFor="psw"><b>Password</b></label>
    <input type="password" placeholder="Enter Password" name="psw" required />
        
    <button type="submit" onClick={handleLogin}>Login</button>
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