
'use client'

const { useState } = require("react")
import RestaurantFooter from "../_component/RestaurantFooter";
import RestaurantHeader from "../_component/RestaurantHeader";
import Login from "../_component/restaurantLogin";
import Signup from "../_component/restaurantSignUp";

const restaurant = () =>{
const [login ,setLogin] = useState(true);

    return(
        <>
        <RestaurantHeader/>
        <h1>Restaurant</h1>
     
        {login? <Login/>: <Signup/>}
        <button onClick={()=>setLogin(!login)}>{login?"Do not have account? Signup":"Already have an account? login "}</button>
<RestaurantFooter/>
        </>
    )
}
export default restaurant;