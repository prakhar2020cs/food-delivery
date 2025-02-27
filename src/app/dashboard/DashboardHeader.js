"use client"
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import style from "./DashboardHeader.module.css";






const DashboardHeader = () => {
 
let [userDetails, setUserDetails] = useState();

  const router = useRouter();
  const pathName = usePathname();
 

let tokenToVerify = null;

useEffect(
  ()=>{

    let token = JSON.parse(localStorage.getItem("registeredUser"))?.token;
    console.log("dashboard header token useeffect", token)
   tokenToVerify = token;

    async function checkToken () {
      if(!tokenToVerify){
        router.push("/restaurant");
      }

      console.log("check token-dashboarHeader", tokenToVerify)
     
     let tokenVerify = await fetch("/api/login",
      {
        method: "GET",
      headers: { "Content-Type": "application/json", "auth-token": `${tokenToVerify}` },
     
      
      }
     );

      const res = await tokenVerify.json();
console.log("dashboard-header use effect",res)
      if (res.success) {
        console.log("user token is valid");

       
      }else{
        router.push("/restaurant")
      }

    }

    checkToken()
  }
,[])



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