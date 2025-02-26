"use client"

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import style from "./restaurant.module.css";

const Login = ({setLogin}) => {

  const [userEmail, setEmail] = useState('');
  const [userPassword, setPassword] = useState('');
  const router = useRouter();

  let tokenToVerify = JSON.parse(localStorage.getItem("registeredUser"));

  useEffect(() => {
    const verifyToken = async () => {
      console.log("verifying token...")
      try {
       
        tokenToVerify = tokenToVerify?.token;

        if (!tokenToVerify) {
          console.log("NO token found");
         
          return;
        }
        console.log("check2")

        let tokenVerify = await fetch("/api/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ tokenToVerify: tokenToVerify })
        });

        const response = await tokenVerify.json();

        if (response.success) {
          console.log("user token is valid");

          router.push("/dashboard");
        }

      } catch (error) {

        console.log("error verifying token", error);
      }


    };
    verifyToken();



  }, [])

  const handleLogin = async (e) => {

    if (!userEmail || !userPassword) {
      window.alert("Email and password are required");
      return;
    }

    e.preventDefault();
    let result = await fetch(`/api/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userEmail, userPassword })

    });
    let response = await result.json();
    if (response.success) {
      const { userData, token } = response;
      console.log(userData, token);
      localStorage.setItem("registeredUser", JSON.stringify({ userData, token }));
      router.push("/dashboard");

    }else{
      window.alert("invalid user");
    }


  }
  // console.log(email);

  return (
    <div>
      <h2>Login</h2>
      <form className={style.login}>
        <div className={style.imgContainer}>
          <img src="dish.avif" alt="Avatar" className="avatar" />
        </div>

        <div className={style.container}>
          <label htmlFor="uname" ><b>Email</b></label>
          <input className={style.formInput} type="text" placeholder="Enter Username" value={userEmail} onChange={(e) => setEmail(e.target.value)} name="email" required />

          <label htmlFor="psw"><b>Password</b></label>
          <input type="password" value={userPassword} onChange={(e) => { setPassword(e.target.value) }} placeholder="Enter Password" name="password" required />

          <button type="submit" onClick={handleLogin}>Login</button>
          <label>
            <input type="checkbox" defaultChecked="defaultChecked" name="remember" /> Remember me
          </label>
        </div>

        {/* <div className={style.container} >
          <button type="button" className="cancelbtn">Cancel</button>
          <span className="psw">Forgot <a href="#">password?</a></span>
        </div> */}
      </form>

    </div>
  )
}
export default Login;