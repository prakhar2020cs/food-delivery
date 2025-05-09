
'use client'

const { useState } = require("react")

import RestaurantFooter from "../_component/RestaurantFooter";
import RestaurantHeader from "../_component/RestaurantHeader";
import Login from "../_component/restaurantLogin";
import Signup from "../_component/restaurantSignUp";

const restaurant = () =>{
    const [login ,setLogin] = useState(true);



    return(
        <div className="restaurant-container">
        <RestaurantHeader setLogin = {setLogin} login = {login}/>
        <h1>Restaurant</h1>
     
        {login? <Login  />: <Signup setLogin={setLogin} />}
        <button className="loginSignup"  onClick={()=>setLogin(!login)}>{login?"Do not have account? Signup":"Already have an account? login "}</button>
<RestaurantFooter/>
        </div>
    )
}
export default restaurant;