"use client"
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";



const RestaurantHeader = () => {
  const [detail, setDetail] = useState();
  const router = useRouter();
  const pathName = usePathname();

  let data = localStorage.getItem("registeredUser");
  useEffect(() => {
    


  if (data && pathName =="/restaurant") {
      router.push("/restaurant/dashboard")
      

    } else {
      setDetail(JSON.parse(data));
    }
  },[]);

  useEffect(()=>{
    if (!data && pathName == "/restaurant/dashboard") {  //if user tries to jump to dashboard without registeing
      router.push("/restaurant");
    } 


  },[detail])



  const logout =()=>{
    localStorage.removeItem("registeredUser");
    setDetail('');
    
  }
  return (<>
    {console.log("restaurant header2")}
    <div className="header">
      <Link href="#default" className="logo">
        <img src="delivery-boy-logo.webp" alt="" /><span>FoodZilla</span>
      </Link>
      <div className="header-right">
        <Link className="active" href="#home">Home</Link>
        {
          detail ? <>
          <Link href="#about">Profile</Link> 
          <Link href="#logout" onClick={logout} >Logout</Link> 

          </> : <button>Login/SignUp</button>
        }


      </div>
    </div>

  </>)

}

export default RestaurantHeader;