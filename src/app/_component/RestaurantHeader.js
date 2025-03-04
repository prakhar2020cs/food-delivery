"use client"
import Link from "next/link";
import style from "./restaurant.module.css"

// import { useRouter } from "next/navigation";




const RestaurantHeader = ({setLogin, login}) => {

  

  








  return (<>
    {console.log("restaurant header2")}
    <div className={style.header}>
      <div className="logoContainer">
        <Link href="#" className={style.logo}>
          <img src="delivery-boy-logo.webp" alt="" /><span>FoodZilla</span>
        </Link>
      </div>
      <div className={style.headerRight}>
        <Link className="active" href="/">Home</Link>
   

        <button onClick={()=>setLogin(!login)}  >Login/SignUp</button>
        


      </div>
    </div>

  </>)

}

export default RestaurantHeader;