"use client"
import { useParams } from 'next/navigation';
import {useEffect, useState} from 'react'
import {useRouter} from 'next/navigation'
import axios from 'axios';



function page() {


  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  const [dishes, setDishes] = useState([]);
  const [isNewDish, setIsNewDish] = useState(false);
  const [newdish, setNewDish] = useState();


    let {restaurantId} = useParams();
restaurantId =  decodeURIComponent(restaurantId);
console.log(restaurantId)

  useEffect(() => {
    const storedEmail = JSON.parse(localStorage.getItem("registeredUser"))?.userData.email;


    if (!storedEmail) {
      router.replace("/login"); // Redirect if no email is stored
    } else if (storedEmail !== restaurantId) {
      router.replace("/dashboard"); // Redirect if email does not match
    } else {
      setIsAuthorized(true);
    }

    setIsChecking(false); // Mark check as complete

    const fetchDishes = async () => {
      try {
        const response = await axios.post("/api/crud/user/dishes",{email:restaurantId}); // Call API
    
        // console.log(data);
        const responseDishes = response.data.dishes;
     
        console.log("response dishes", responseDishes);
        setDishes(responseDishes); // Store in state
      } catch (error) {
        console.error("Error fetching dishes:", error);
      }
    };

    fetchDishes();

  }, [restaurantId, router]);


    // const fetchDishes = async () => {
    //   try {
    //     const response = await fetch("/api/crud/user/dishes"); // Call API
    //     const data = await response.json();
    //     console.log(data);
    //     setDishes(data); // Store in state
    //   } catch (error) {
    //     console.error("Error fetching dishes:", error);
    //   }
    // };

    // fetchDishes();



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

    const createDish = async (dish) =>{
      const res = await fetch("api/crud/user/dishes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({   _id:dish._id , itemId:dish.itemId, name: dish.name, description: dish.description }),
      });

      let newDish =  await res.json();
console.log("updated Dish",newDish);
newDish.success? alert("Dish updated"): alert("error updating dishes");
    }


    // Delete a Dish
    const deleteDish = async () => {
      console.log("deleteUser");
      const res = await fetch("api/crud/user", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });

      console.log(Response, res.json());
      setEmail("");
      setName("");
      setCity("");
      setToken("");
      setRestaurant("");
      return await res.json();
    };


    if (isChecking) {
    return <p>Checking authorization...</p>;
  }

  if (!isAuthorized) {
    return null; // Prevent rendering unauthorized content
  }

  return (

    <>
      <div>Welcome to your dashboard, {restaurantId}!</div>

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

              <div className="newDishContainer">
               
                {
                  isNewDish?<div className="newDish">
                      <label htmlFor="itemId">ItemId</label>
                <input id="itemId" type='number' value={newdish?.itemId} onChange={handleNewDishChange} />
                      <label htmlFor="itemId">Name</label>
                <input id="newName" type='text' value={newdish?.name} onChange={handleNewDishChange} />
                      <label htmlFor="newDescription">Description</label>
                <input id="description" type='text' value={newdish?.description} onChange={handleNewDishChange} />
                      {/* <label htmlFor="">ItemId</label>
                <input id="" type='number' name='i'  value={newdish?.ingredients} onChange={handleNewDishChange} /> */}
                  </div>:<></>
                }

               

<button className='add-dish-button' onClick={()=>{
  createDish(newdish);
  console.log("create dish")
  setIsNewDish(!isNewDish)}} >{isNewDish?(<>Create</>):( <><img src="/plus.svg" alt="plus-sign" /> Add New Dish</>)}</button>
{isNewDish?<button>Cancel</button>:<></>}
              </div>
        </div>
      
    
    </>

  
     
        )
  
}

export default page