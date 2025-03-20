"use client"
import style from "./page.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
const [searchDish, setSearchDish] = useState("");
const[gotDishes, setGotDishes] = useState([]);
const[debounceSearch, setDebounceSearch] = useState("");

useEffect(()=>{
const timedSearch = setTimeout(()=>setDebounceSearch(searchDish), 800);

return ()=>clearTimeout(timedSearch);

},[searchDish])


useEffect( ()=>{
  async function fetchDishes(){
    const res = await fetch(`/api/crud/public?dish=${encodeURIComponent(searchDish)}`);
    let dishes = (await res.json()).dishes;
    console.log("dishes-public" ,dishes);
    setGotDishes(dishes);
  }
fetchDishes()


}, [debounceSearch])


  return (
    <div className="public-page" >

<div className={style.header}>
      <div className="logoContainer">
        <Link href="#" prefetch={false} className={style.logo}>
          <img src="delivery-boy-logo.webp" alt="" /><span>FoodZilla</span>
        </Link>
      </div>
      <div className={style.headerRight}>
        <Link className="active" href="/">Home</Link>
   

       
        
        <Link href="/restaurant" >Add Restaurant</Link>

      </div>
    </div>

<h1>Your Favourite place to get delicious food !</h1>
<p>Go to restaurant section to check out your dishes and user details if you are registered , otherwise register yourself </p>

<h2>Search Restaurants</h2>
<input placeholder="Enter Dishes To Search" value={searchDish} id="search-bar" type="text" onChange={(e)=>setSearchDish(e.target.value)} />

<div className="userDishes">
  <h2>Search Results:---</h2>
{
 gotDishes? gotDishes.map(
    (dish)=>(
  <div className="" key = {dish._id}>
    <h3>{dish.name}</h3>
    <p>{dish.description}</p>
  </div>
    )
      
    
  ):<p>Loading...</p>
}

</div>

    </div>
  );
}
