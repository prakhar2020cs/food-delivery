"use client"
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import style from "./DashboardHeader.module.css";






const DashboardHeader = () => {
 
let [userDetails, setUserDetails] = useState();
  const router = useRouter();
  const pathName = usePathname();
  let data = localStorage.getItem("registeredUser");



  // useEffect(() => {


  //   if (data && pathName == "/restaurant") {
  //     router.push("/dashboard")


  //   } else {
  //     setUserDetails(JSON.parse(data));
  //     console.log("userDetails:", userDetails);
  //     console.log("setUserDetails:", setUserDetails);
  //   }
  // }, []);

  // useEffect(() => {
  //   if (!data && pathName == "/dashboard") {  //if user tries to jump to dashboard without registeing
  //     router.push("/restaurant");
  //   }


  // }, [userDetails])



  const logout = () => {
    localStorage.removeItem("registeredUser");

    setUserDetails('');
    console.log("logout")
    router.push("/restaurant");

  }
  return (<>
    {console.log("restaurant header2")}
    <div className={style.header}>
      <Link href="#default" className={style.logo}>
        <img src="delivery-boy-logo.webp" alt="" /><span>FoodZilla</span>
      </Link>
      <div className={style.headerRight}>
        <Link href="/restaurant">Home</Link>


        <Link href="#about">Profile</Link>
        <Link href="#logout" onClick={logout} >Logout</Link>





      </div>
    </div>

  </>)

}

export default DashboardHeader;