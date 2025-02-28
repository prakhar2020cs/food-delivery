"use client"

import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import {useState } from "react";
import { useRouter } from "next/navigation";
// import "react-toastify/dist/ReactToastify.css"; 





const ForgotPassword = () => {
  const router =  useRouter();

    const [email, setEmail] = useState('');
const [message, setMessage] = useState('');
const handleCancel = () =>{
router.push("/restaurant");
}

const handleSubmit = async ()=>{
    console.log("handleSubmit")
   
   try {
    const response = await axios.post("/api/forgotpassword", {email});
    setMessage( response?.data?.message);
    toast.success(response?.data?.message);
  
   } catch (error) {
    console.log(error)
    const errorMsg =error.response?.data?.message || "something went wrong";
    setMessage(errorMsg);
    toast.error(errorMsg);
   }

}
  return (
    <>
    <ToastContainer/>
    <div className='forgot-password'>
       
        <div className="forgot-form">
        <h2>Forgot Password</h2>
            <label htmlFor="email">Email</label>
         <input id='email' onChange={(e)=>{ setEmail( e.target.value) }} value={email} type="email" name="email" placeholder='Enter Your Email' />

         <button type='submit' onClick={handleSubmit}>Submit</button>
         <button type='submit' onClick={handleCancel}>Cancel</button>
         
        </div>
        
    </div>
    
    </>
    
  )
}

export default ForgotPassword