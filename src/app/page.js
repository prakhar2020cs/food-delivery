import Image from "next/image";
import style from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <div >

<div className={style.header}>
      <div className="logoContainer">
        <Link href="#" className={style.logo}>
          <img src="delivery-boy-logo.webp" alt="" /><span>FoodZilla</span>
        </Link>
      </div>
      <div className={style.headerRight}>
        <Link className="active" href="/">Home</Link>
   

       
        
        <Link href="/restaurant">Restaurant Section</Link>

      </div>
    </div>

<h1>Your Favourite place to get delicious food !</h1>

    </div>
  );
}
