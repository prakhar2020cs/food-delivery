"use client"
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import style from "./DashboardHeader.module.css";
import Cookies from 'js-cookie';







const DashboardHeader = () => {
 
let [userDetails, setUserDetails] = useState("");

  const router = useRouter();
  const pathName = usePathname();
 

let tokenToVerify = null;

useEffect(
  ()=>{

    let token = Cookies.get("token");
    if (!token) {
      router.push("/restaurant");
      return;
    }
   token = JSON.parse(token).token;
   tokenToVerify = token;
   console.log("dashboard header token useeffect----", token)

    async function checkToken () {
      if(!tokenToVerify){
        router.push("/restaurant");
      }

      console.log("check token-dashboarHeader", tokenToVerify)
     
     let tokenVerify = await fetch("/api/login",
      {
        method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": `Bearer ${tokenToVerify}`,},
     
      
      }
     );
    
      let res = await tokenVerify.json();
      console.log("dashboard-header use effect",res)
  
// console.log("dashboard-header use effect",res)
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
    Cookies.remove("token",  { path: "/" });
    console.log("logout");
    setTimeout(() => {
      router.push("/restaurant");
  }, 100);


    // router.push("/restaurant");

  }
  return (<>
    {console.log("restaurant header2")}
    <div className={style.header}>
      <Link href="#" className={style.logo}>
        <img src="delivery-boy-logo.webp" alt="" /><span>FoodZilla</span>
      </Link>
      <div className={style.headerRight}>
        {/* <Link href="/restaurant">Home</Link> */}


        {/* <Link  href="#" >Profile</Link> */}
        <Link href="#" onClick={logout} >Logout</Link>





      </div>
    </div>

  </>)

}

export default DashboardHeader;