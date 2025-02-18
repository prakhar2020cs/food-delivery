import Link from "next/link";


console.log("restaurant header");
const RestaurantHeader = () =>{
return(<>
    {console.log("restaurant header2")}
    <div className="header">
  <Link  href="#default" className= "logo">
  
<img src="delivery-boy-logo.webp" alt="" />
    <span>FoodZilla</span></Link>
  <div className="header-right">
    <Link className="active" href="#home">Home</Link>
    <Link href="#contact">Login/SignUp</Link>
    <Link href="#about">Profile</Link>
  </div>
</div>

    </>)
    
}

export default RestaurantHeader;