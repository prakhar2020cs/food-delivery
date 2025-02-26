"use client"
import Link from "next/link";
import style from "./restaurant.module.css"

import { useRouter } from "next/navigation";




const RestaurantHeader = () => {

  

  








  return (<>
    {console.log("restaurant header2")}
    <div className={style.header}>
      <div className="logoContainer">
        <Link href="#default" className={style.logo}>
          <img src="delivery-boy-logo.webp" alt="" /><span>FoodZilla</span>
        </Link>
      </div>
      <div className={style.headerRight}>
        <Link className="active" href="/restaurant">Home</Link>
   

        <button>Login/SignUp</button>
        


      </div>
    </div>

  </>)

}

export default RestaurantHeader;