"use client"


import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';




const Dashboard = () => {

const router = useRouter();

const [loading , setLoading] = useState(false);

  const [editmode, setEditmode] = useState(false);
  const [editDish, setEditDish] = useState(false);
  const [email, setEmail] = useState('');
 const [token, setToken] = useState('');
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [restaurant, setRestaurant] = useState('');
const [updated, setUpdated] = useState(false);

  const [dishes, setDishes] = useState([]);
  const [isNewDish, setIsNewDish] = useState(false);
  const [newdish, setNewDish] = useState({
    itemId:"",
    name:"",
    description:""
  });


  useEffect(() => {
    if (typeof window !== "undefined") {
      const userToken = Cookies.get("token");
      if (userToken) {
        setToken(userToken); // Set token
      }
    }
  }, []);

  useEffect(()=>{
      // const token = Cookies.get("token");
      // setToken(token);
if(!token){
  return
}
      const fetchDishes = async (userEmail) => {
     console.log("user email--" ,userEmail)
        try {
          const response = await fetch("/api/crud/user/dishes",
            {
              method:"GET",
              headers:{
                "Content-Type": "application/json",
                "email": userEmail  
              }
            }
          ); // Call API
          const data = await response.json();
          console.log(data);
          setDishes(data); // Store in state
        } catch (error) {
          console.error("Error fetching dishes:", error);
        }
      };
      
     

      const fetchUser = async () =>{
        setLoading(true);
        let res = await fetch("/api/crud/user", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          }
        });
   res = await res.json();
   let userDetails = res.user;
  console.log(userDetails);
  
  setEmail(userDetails.email || "");
  setName(userDetails.name || "");
  setCity(userDetails.city || "");
  // setToken(data.token);
  setRestaurant(userDetails.restaurant || "");
  setLoading(false)

  await fetchDishes(userDetails.email);

  
      }

      fetchUser();
      // fetchDishes();
      
    }
  ,[token])

  // 












// Update user details
const updateUser = async () => {
  setEditmode(false)
  setLoading(true)
  console.log("update user")
let res = await fetch("api/crud/user", {
  method: "PUT",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ token, name, email, city, restaurant }),
});
res = await res.json();

console.log( "updateUserResponse", res);
setLoading(false)

return res;
};

  

  const deleteUser = async () => {
    console.log("deleteUser");
    const res = await fetch("api/crud/user", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    });
    setEmail(null);
    setName(null);
    setCity(null);
    setToken(null);
    setRestaurant(null);
    setDishes([])
 Cookies.remove("token");
    router.push("/restaurant");
  }


  const handleNewDishChange = (e) => {
    const { name, value } = e.target; // Get input name & value
    setNewDish((prevDish) => ({
      ...prevDish,
      [name]: value,  // Update the correct property dynamically
    }));
  };


    // Update Dish
    const updateDish = async (dish) => {
      const res = await fetch("api/crud/user/dishes", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({   _id:dish._id , itemId:dish.itemId, name: dish.name, description: dish.description }),
      });

let updatedDish =  await res.json();
console.log("updated Dish", updatedDish);
updatedDish.success? alert("Dish updated"): alert("error updating dishes");

      return updatedDish;
    };


    return (
      <>
      <ToastContainer/>
        <div className="dashboard-container">
        <h2> Welcome to your Restraunt Dashboard</h2>
        <h3>User Details</h3>
        <div className="userDetail">



     {
loading ? ("Loading user details..." ):(<>{false ? <input value={email} onChange={(e) => setEmail(e.target.value)}  /> : <p>{email}</p>
}
  {editmode ? <input value={name} onChange={(e) => setName(e.target.value)}  /> : <p>{name}</p>}
  {editmode ? <input value={city} onChange={(e) => setCity(e.target.value)}   /> : <p>{city}</p>}
  {editmode ? <input value={restaurant} onChange={
    (e) => setRestaurant(e.target.value)} /> : <p>{restaurant}</p>}</>   )
     } 
      

          <div />

          <button
            onClick={() => {

              setEditmode(!editmode);

            }}>

            Edit Details
          </button>
        
          <button onClick={async () => {
            try {
              setUpdated(!updated);
              const response = await updateUser();
            toast.success("user updated");
              // alert("User updated successfully!");
            } catch (error) {
              console.error("Error updating user:", error);
              // toast.success("error updating user");
            }


          }}   disabled={loading} >Update Details</button>
          <button onClick={async () => {
            let sure = confirm("do you really want to delete?");
            console.log(sure);
            if (sure) {
              try {
                await deleteUser();
                toast.success("user deleted")
              } catch (error) {
               toast.error("error deleting user")
              }

            }


          }} >Delete User</button>
        </div>
        <h3>Dishes In Your Menu</h3>
        <div className="userDishes">
    
         { 
       
        dishes.length===0 ? ( <p>Loading Dishes...</p> ): (dishes && dishes.length > 0 && dishes.map(
            
          (dish)=>(
              <div className="dishes" key = {dish._id}>
              {editDish===dish._id ?( <> 
              <label htmlFor="itemId">ItemId</label>
              <input id="itemId" type='number' name="itemId" value={dish.itemId} onChange={(e)=>setDishes(
                (currentDishes)=>
                  currentDishes.map(
                    (D)=>
                  D._id === dish._id ?{ ...D, itemId: e.target.value}:D
                    
                  )

              ) } />
              <label htmlFor="name">Name</label>
              <input id="name" type='text' name="name" value={dish.name} onChange={(e)=>setDishes(
                (currentDishes)=>
                  currentDishes.map(
                    (D)=>
                  D._id === dish._id ?{ ...D, name: e.target.value}:D
                    
                  )

              ) } />
              <label htmlFor="description" >Description</label>
              <input id="description" type='text' name="description"   value={dish.description} onChange={(e)=>setDishes(
                (currentDishes)=>
                  currentDishes.map(
                    (D)=>
                  D._id === dish._id ?{ ...D, description: e.target.value}:D
                    
                  )

              ) } />
              {/* <input type='text' value={dish.ingredients} onChange={(e)=>setDishes(
                (currentDishes)=>{
                  currentDishes.map(
                    (D)=>
                  D._id === dish._id ?{ ...D, ingredients: e.target.value.split(", ")}:D
                    
                  )

              }) } /> */}
             
              </>) :(<>
              
                <p>Item Id:{dish.itemId}</p>
              <p>Name: {dish.name}</p>
              <p>Description: {dish.description}</p>
              <p>Ingredients: {dish.ingredients.join(', ')}</p>
              </> )}
             
            <button onClick={()=>{
               if (editDish === dish._id) {
                updateDish(dish); // Save changes when exiting edit mode
                setEditDish(null); // Exit edit mode
              } else {
                setEditDish(dish._id); // Enter edit mode
              }
            }} >{editDish===dish._id ?  "Save":"EditDish"}</button>
          
              </div>
              

            )

          )
            ) 
              }

        </div>
      
        </div>
        
      </>

    )
  }


  export default Dashboard;