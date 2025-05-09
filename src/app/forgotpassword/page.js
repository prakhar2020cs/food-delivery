"use client"

import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import {useState } from "react";
import { useRouter } from "next/navigation";
// import "react-toastify/dist/ReactToastify.css"; 





const ForgotPassword = () => {
  const router =  useRouter();
  const [isLoading, setIsLoading] = useState(false); 
    const [email, setEmail] = useState('');
const [message, setMessage] = useState('');

const handleCancel = () =>{
router.push("/restaurant");
}

const handleSubmit = async ()=>{
    console.log("handleSubmit")
    setIsLoading(true);
   
   try {
    const response = await axios.post("/api/forgotpassword", {email});
    setMessage( response?.data?.message);
    toast.success(response?.data?.message);
    setIsLoading(false);
  
   } catch (error) {
    console.log(error)
    const errorMsg =error.response?.data?.message || "something went wrong";
    setMessage(errorMsg);
    toast.error(errorMsg);
    setIsLoading(false);
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

         <button type='submit' onClick={handleSubmit}  disabled={isLoading} >{isLoading?"Submitting...":"Submit"}</button>
 
         
        </div>
        
    </div>
    
    </>
    
  )
}

export default ForgotPassword