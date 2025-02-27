"use client"


import React from 'react';
import { useState, useEffect } from 'react';




const Dashboard = () => {



  let [editmode, setEditmode] = useState(false);
  let [editDish, setEditDish] = useState(false);
  let [email, setEmail] = useState('');
  let [token, setToken] = useState('');
  let [name, setName] = useState('');
  let [city, setCity] = useState('');
  let [restaurant, setRestaurant] = useState('');


  const [dishes, setDishes] = useState([]);
  const [isNewDish, setIsNewDish] = useState(false);
  const [newdish, setNewDish] = useState();



  


  useEffect( () => {
    let data = localStorage.getItem("registeredUser");
    data = JSON.parse(data);

    console.log("dashboard data", data);


    if (data) {
      console.log("hello")
      setEmail(data.userData.email);
      setName(data.userData.name);
      setCity(data.userData.city);
      setToken(data.token);
      setRestaurant(data.userData.restaurant);

    }

    const fetchDishes = async () => {
      try {
        const response = await fetch("/api/crud/user/dishes"); // Call API
        const data = await response.json();
        console.log(data);
        setDishes(data); // Store in state
      } catch (error) {
        console.error("Error fetching dishes:", error);
      }
    };

    fetchDishes();



  }, []);





  // Update user details
  const updateUser = async () => {
    let res = await fetch("api/crud/user", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, name, email, city, restaurant }),
    });
   res = await res.json()
    console.log( "updateUserResponse", res);
    return res;
  };

  // Delete a user
  const deleteUser = async () => {
    console.log("deleteUser");
    const res = await fetch("api/crud/user", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    });
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

    return (
      <>
      
        <div className="dashboard-container">
        <h2> Welcome to your Restraunt Dashboard</h2>
        <h3>User Details</h3>
        <div className="userDetail">
          {false ? <input value={email} onChange={(e) => setEmail(e.target.value)} /> : <p>{email}</p>}
          {editmode ? <input value={name} onChange={(e) => setName(e.target.value)} /> : <p>{name}</p>}
          {editmode ? <input value={city} onChange={(e) => setCity(e.target.value)} /> : <p>{city}</p>}
          {editmode ? <input value={restaurant} onChange={
            (e) => setRestaurant(e.target.value)} /> : <p>{restaurant}</p>}

          <div />

          <button
            onClick={() => {

              setEditmode(!editmode);

            }}>

            Edit
          </button>
        
          <button onClick={async () => {
            try {
              const response = await updateUser();
              console.log("Update Response:", response);
              alert("User updated successfully!");
            } catch (error) {
              console.error("Error updating user:", error);
              alert("Failed to update user.");
            }


          }}>Update</button>
          <button onClick={async () => {
            let sure = confirm("do you really want to delete?");
            if (confirm) {
              try {
                await deleteUser();
              } catch (error) {
                console.log("error deleting user");
              }

            }


          }} >Delete</button>
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

              <div className="newDishContainer">
               
                {
                  isNewDish?<div className="newDish">
                      <label htmlFor="itemId">ItemId</label>
                <input id="itemId" type='number' value={newdish?.itemId} onChange={handleNewDishChange} />
                      <label htmlFor="itemId">Name</label>
                <input id="newName" type='text' value={newdish?.name} onChange={handleNewDishChange} />
                      <label htmlFor="newDescription">Description</label>
                <input id="description" type='text' value={newdish?.description} onChange={handleNewDishChange} />
                      <label htmlFor="">ItemId</label>
                <input id="" type='number' name='ingredients'  value={newdish?.ingredients} onChange={handleNewDishChange} />
                  </div>:<></>
                }

               

<button className='add-dish-button' onClick={()=>setIsNewDish(!isNewDish)} >{isNewDish?(<>Create</>):( <><img src="/plus.svg" alt="plus-sign" /> Add New Dish</>)}</button>
{isNewDish?<button>Cancel</button>:<></>}
              </div>
        </div>
      
        </div>
        
      </>

    )
  }

  export default Dashboard;