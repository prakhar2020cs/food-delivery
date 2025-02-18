"use client";

import { useState } from "react";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [c_password, setC_password] = useState("");
  const [restaurant, setRestaurant] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [contact, setContact] = useState("");

  async  function handleSignup(e){
//  e.preventDefault();
    console.log(email, password, address, city);

    let result = await fetch("/api/restaurant",{
      method:"POST",
     
      body:JSON.stringify({email,password,city,address,contact})
    });
    result = await result.json();
    console.log(result);
  }

  return (
    <>
      <h2>Signup</h2>
      <form >
        <div className="imgcontainer">
          <img src="dish.avif" alt="Avatar" className="avatar" />
        </div>

        <div className="container">
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

          <button  onClick={handleSignup}>SignUp</button>
          <label>
            <input
              type="checkbox"
              defaultChecked="defaultChecked"
              name="remember"
            />{" "}
            Remember me
          </label>
        </div>

        <div className="container">
          <button type="button" className="cancelbtn">
            Cancel
          </button>
          <span className="psw">
            Forgot <a href="#">password?</a>
          </span>
        </div>
      </form>
    </>
  );
};

export default Signup;
