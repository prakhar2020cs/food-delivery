"use client"


import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';




const Dashboard = () => {

  const router = useRouter();

  const [render, setRender] = useState(false)

  const [dishValidateMessage, setDishValidateMessage] = useState();
  const [loading, setLoading] = useState(false);
  // const [createDishLoading, setCreateDishLoading ] = useState(false);
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
  const [newDish, setNewDish] = useState({
    email: "",
    name: "",
    description: "",
    itemId: ""
  });


  useEffect(() => {
    if (typeof window !== "undefined") {
      const userToken = Cookies.get("token");
      if (userToken) {
        setToken(userToken); // Set token
      }

    }
  }, []);

  useEffect(() => {
    // const token = Cookies.get("token");
    // setToken(token);
    if (!token) {
      return
    }


    const fetchUser = async () => {
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
      console.log("user details in dashboard page", userDetails);

      setEmail(userDetails.email || "");
      console.log("user email", userDetails.email)



      setName(userDetails.name || "");
      setCity(userDetails.city || "");
      // setToken(data.token);
      setRestaurant(userDetails.restaurant || "");
      setLoading(false)

      await fetchDishes(userDetails.email);


    }





    const fetchDishes = async (userEmail) => {
      console.log("user email--", userEmail)
      setEmail(userEmail)
      try {
        const response = await fetch("/api/crud/user/dishes",
          {
            method: "GET",
            headers: {
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




    fetchUser();
    // fetchDishes();

  }
    , [token, render])

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

    console.log("updateUserResponse", res);
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
      body: JSON.stringify({ _id: dish._id, itemId: dish.itemId, name: dish.name, description: dish.description }),
    });

    let updatedDish = await res.json();
    console.log("updated Dish", updatedDish);
    updatedDish.success ? alert("Dish updated") : alert("error updating dishes");

    return updatedDish;
  };

  function validateDish(d) {
    console.log("d", d)
    if (!d.itemId || !d.name) {
      setDishValidateMessage("must provide a name and unique ItemId to a dish")
      return false
    }

    setDishValidateMessage("dish validated")
    return true;
  }

  const createDish = async (dish) => {
    // setCreateDishLoading(true)
    console.log("email", email)
    console.log("dish", dish);
    if (!validateDish(dish)) {
      toast.info(dishValidateMessage)
      return
    }


    const res = await fetch("/api/crud/user/dishes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ itemId: dish.itemId, email: email, name: dish.name, description: dish.description }),
    });

    let newDish = await res.json();

    console.log("updated Dish", newDish);
    newDish.success ? toast.success("Dish updated") : toast.error("error updating dishes, try entering a unique ItemId");
    setRender(!render);
    // setCreateDishLoading(false)
    console.log("end")
  }

  const deleteDish = async (dish) => {
    console.log("deletedish-itemId" , dish.itemId)
    console.log("deleteUser");
    const res = await fetch("/api/crud/user/dishes", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ itemId: dish.itemId }),
    });

  //   setDishes((currentDishes) => 
  //     currentDishes.filter((D) => D.itemId !== dish.itemId)
  // );
    // console.log(Response, res.json());
   
    setRender(!render);

    console.log("render", render)
    return ;
  };


  useEffect(() => {
    console.log("newdish value", newDish)
  }, [newDish])


  return (
    <>
      <ToastContainer />
      <div className="dashboard-container">
        <h2> Welcome to your Restraunt Dashboard</h2>
        <h3>User Details</h3>
        <div className="userDetail">


          <div className="userDetailInner">
            {
              loading ? ("Loading user details...") : (<>{false ? (<div className="inputGroup">
                <label htmlFor="email"></label>
                <input id='email' value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>) : <p><b>Email: </b>{email}</p>
              }
                {editmode ? (
                  <div className="inputGroup">
                    <label htmlFor="name"><b>Name: </b></label>
                    <input id='name' placeholder='Edit Name' value={name} onChange={(e) => setName(e.target.value)} />
                  </div>

                ) : <p><b>Name: </b>{name}</p>}
                {editmode ? (
                  <div className="inputGroup">
                    <label htmlFor="city"><b>City: </b></label>
                    <input id='city' placeholder='Edit City' value={city} onChange={(e) => setCity(e.target.value)} />
                  </div>
                ) : <p>
                  <b>City: </b>{city}</p>}
                {editmode ?
                  (<div className="inputGroup">
                    <label htmlFor="restaurant"><b>Restaurant: </b></label>
                    <input id="restaurant" placeholder='Edit Restaurant' value={restaurant} onChange={
                      (e) => setRestaurant(e.target.value)} />
                  </div>)
                  : <p><b>Restaurant: </b> {restaurant}</p>}</>)
            }
          </div>



          <div />
          <div className="userEditButtons">
            <button className='edit'
              onClick={() => {

                setEditmode(!editmode);

              }}>

              Edit Details
            </button>

            <button className='update' onClick={async () => {
              try {
                setUpdated(!updated);
                const response = await updateUser();
                toast.success("user updated");
                // alert("User updated successfully!");
              } catch (error) {
                console.error("Error updating user:", error);
                // toast.success("error updating user");
              }


            }} disabled={loading} >Update Details</button>
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

        </div>
        <h3>Dishes In Your Menu</h3>
        <div className="userDishes">
          {/* dishes && dishes.length > 0 &&  */}

          {

            dishes.length === 0 ? (<p>Loading Dishes...</p>) : (dishes.map(

              (dish) => (
                <div className="dishes" key={dish._id}>
                  <h3>Already Looks Delicious😋</h3>
                  {editDish === dish._id ? (<>
                    <p>Item Id:{dish.itemId}</p>

                    {/* <label htmlFor="itemId">ItemId</label>
              <input id="itemId" type='number' name="itemId" value={dish.itemId} onChange={(e)=>setDishes(
                (currentDishes)=>
                  currentDishes.map(
                    (D)=>
                  D._id === dish._id ?{ ...D, itemId: e.target.value}:D
                    
                  )

              ) } /> */}
                    <label htmlFor="name">Name</label>
                    <input id="name" type='text' name="name" value={dish.name} onChange={(e) => setDishes(
                      (currentDishes) =>
                        currentDishes.map(
                          (D) =>
                            D._id === dish._id ? { ...D, name: e.target.value } : D

                        )

                    )} />
                    <label htmlFor="description" >Description</label>
                    <input id="description" type='text' name="description" value={dish.description} onChange={(e) => setDishes(
                      (currentDishes) =>
                        currentDishes.map(
                          (D) =>
                            D._id === dish._id ? { ...D, description: e.target.value } : D

                        )

                    )} />
                    {/* <input type='text' value={dish.ingredients} onChange={(e)=>setDishes(
                (currentDishes)=>{
                  currentDishes.map(
                    (D)=>
                  D._id === dish._id ?{ ...D, ingredients: e.target.value.split(", ")}:D
                    
                  )

              }) } /> */}

                  </>) : (<>

                    <p>Item Id:{dish.itemId}</p>
                    <p>Name: {dish.name}</p>
                    <p>Description: {dish.description}</p>
                    {/* <p>Ingredients: {dish.ingredients.join(', ')}</p> */}
                  </>)}

                  <button className='fit' onClick={() => {
                                      
                                        console.log("itemId",dish.itemId)

                                        if (dish.itemId) {
                                          deleteDish(dish)
                                          console.log("inside if")
                                        } 

                                        console.log("no dish matching item id");
                                       
                                     

                                  

                  }} >Delete</button>
                  <button className='edit fit' onClick={() => {
                   if (editDish === dish._id) {
                      updateDish(dish); // Save changes when exiting edit mode
                      setEditDish(null); // Exit edit mode
                    } else {
                      setEditDish(dish._id); // Enter edit mode
                    }
                  }} >{editDish === dish._id ? "Save" : "EditDish"}</button>
                  {editDish === dish._id ? <button className='fit' onClick={() => {
                    if (editDish === dish._id) {
                      setEditDish(null)
                    }
                  }}  >Cancel</button> : <></>}
                </div>


              )

            )
            )
          }


          <div className="newDishContainer">

            {
              isNewDish ? <div className="newDish">
                {/* <label htmlFor="itemId">ItemId</label>
               <input id="itemId" name="itemId" type='number' value={newdish?.itemId} onChange={handleNewDishChange} /> */}

                <label htmlFor="name">Name</label>
                <input id="newName" name="name" type='text' value={newDish?.name} onChange={handleNewDishChange} />
                <label htmlFor="newDescription">Description</label>
                <input name="description" id="description" type='text' value={newDish?.description} onChange={handleNewDishChange} />
                <label htmlFor="itemId"> ItemId</label>
                <p id='itemId-warningText'>(ItemId should be unique)</p>
                <input id="itemId" type='number' name='itemId' value={newDish?.ingredients} onChange={handleNewDishChange} />


              </div> : <></>
            }

            {console.log("description", newDish.description)}


            <div className="newDishEditButtons">
              <button className='add-dish-button' onClick={(e) => {
                //  createDish(newdish);

                if (isNewDish) {
                  if(newDish.itemId <=0 ){
                    toast.error("enter a valid itemId, itemId cannot be 0 or negative");
                    return
                  }
                  
                  
                  createDish(newDish)
                }

                setIsNewDish(!isNewDish)
                console.log(isNewDish)

                e.preventDefault();

                console.log("create dish", newDish)

              }}
              >{isNewDish ? (<>Create</>) : (<><img src="/plus.svg" alt="plus-sign" /> Add New Dish</>)}</button>
              {isNewDish ? <button onClick={() => setIsNewDish(!isNewDish)} >Cancel</button> : <></>}
            </div>

          </div>

        </div>

      </div>

    </>

  )
}


export default Dashboard;