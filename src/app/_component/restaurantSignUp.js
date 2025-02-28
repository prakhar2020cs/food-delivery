"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import style from "./restaurant.module.css";



const Signup = ({setLogin}) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [c_password, setC_password] = useState("");
  const [restaurant, setRestaurant] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [contact, setContact] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

   // Function to validate inputs
   const validateForm = () => {
    if (name.length < 3) return "Name must be at least 3 characters long.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Invalid email format.";
    if (password.length < 6 ) return "Password must be at least 6 characters long.";
    if( password !== c_password) return "Password does not match Confirm-Password";
  
    return null; // No errors
  };



  async function handleSignup(e) {
    e.preventDefault();
const errorMessage = validateForm();
if(errorMessage){
  setError(errorMessage);
  return;
}

    let result = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password, city, address, contact, restaurant })
    });
    let response = await result.json();

    console.log("response", response);
    
    if (response.success) {
      const { result } = response;
      delete result.password;
      console.log("resultWOpass", result);
      // localStorage.setItem("registeredUser", JSON.stringify(result));
      window.alert("You are registered, kindly login")
      // router.push('/dashboard');
    }

  }




  return (
    <>
      <h2>Signup</h2>
      <form className={style.signUp} >
        <div className={style.imgContainer}>
          <img src="dish.avif" alt="Avatar" className="avatar" />
        </div>

        <div className={style.container}>
          <label htmlFor="name">
            <b>Name</b>
          </label>
          <input
            type="text"
            placeholder="Enter Name"
            name="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          // required
          />
          <label htmlFor="Email">
            <b>Email</b>
          </label>
          <input
            type="text"
            placeholder="Enter Email"
            name="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          // required
          />


          <label htmlFor="psw">
            <b>Password</b>
          </label>
          <input
            type="password"
            placeholder="Enter Password"
            name="psw"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          // required
          />
          <label htmlFor="confirmpsw">
            <b>Confirm Password</b>
          </label>

          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmpsw"
            value={c_password}
            onChange={(event) => setC_password(event.target.value)}
          // required
          />
          <label htmlFor="restaurant">
            <b>Restaurant</b>
          </label>

          <input
            type="text"
            placeholder="Enter Restaurant Name"
            name="restaurant"
            value={restaurant}
            onChange={(event) => setRestaurant(event.target.value)}
          // required
          />
          <label htmlFor="city">
            <b>City</b>
          </label>
          <input
            type="text"
            placeholder="Enter City Name"
            name="city"
            value={city}
            onChange={(event) => setCity(event.target.value)}
          // required
          />
          <label htmlFor="fulladd">
            <b>Full Address</b>
          </label>
          <input
            type="text"
            placeholder="Enter Full Address "
            name="fulladd"
            value={address}
            onChange={(event) => setAddress(event.target.value)}
          // required
          />
          <label htmlFor="contact">
            <b>Contact Number</b>
          </label>
          <input
            type="text"
            placeholder="Enter Contact Number "
            name="contact"
            value={contact}
            onChange={(event) => setContact(event.target.value)}
          // required
          />
             {error && <p style={{ color: "blue" }}>{error}</p>}

          <button onClick={handleSignup}>SignUp</button>
          <label>
            <input
              type="checkbox"
              defaultChecked="defaultChecked"
              name="remember"
            />{" "}
            Remember me
          </label>
        </div>

        {/* <div className={style.container}>
          <button type="button" className="cancelbtn">
            Cancel
          </button>
          <span className="psw">
            Forgot <a href="#">password?</a>
          </span>
        </div> */}
      </form>
    </>
  );
};

export default Signup;
