"use client"

import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react'
import { toast, ToastContainer } from 'react-toastify';

const resetpassword = () => {
  const router = useRouter();
  let { token } = useParams();
  token = decodeURIComponent(token);
  console.log(token);

  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState("")

  useEffect(() => {
      if (!token) {
          router.push("/restaurant"); // Redirect if no token
      }
  }, [token, router]);

  async function handleResetPassword(e) {
    setIsLoading(true);
    e.preventDefault();
   if(!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(newPassword)) {
    toast.error("Password should contain at least one uppercase, one lowercase, one digit, one special char, and 8+ characters");
    setIsLoading(false)
    return
   }
   if(newPassword !== confirmNewPassword){
    toast.error("Password should match Confirm Password");
    setIsLoading(false)
    return
   }
    try {
      
        const response = await axios.post("/api/resetpassword", { token, newPassword });
        setMessage(response.data.message);
        toast.success("password reset successfull");
        if (response.status === 200) {
            setIsLoading(false)
            setTimeout(() => router.push("/restaurant"), 3000);
        }
    } catch (error) {
        setIsLoading(false);
        setMessage(error.response?.data?.error || "Something went wrong");
        toast.error(message);
    }
}




  return (
    <div className='forgot-password'>
       <ToastContainer/>
    <div className="forgot-form">
    <h2>Enter new password</h2>
        <label htmlFor="new">New Password</label>
     <input id='new' value={newPassword}  onChange={e=>setNewPassword(e.target.value)}  type="password" placeholder='Enter Your New Passsword' />
   
        <label htmlFor="new">Confirm New Password</label>
     <input id='new' value={confirmNewPassword} onChange={e=>setConfirmNewPassword(e.target.value)}  type="password" placeholder='Enter Your New Passsword' />
     <button type='submit' onClick={handleResetPassword} disabled={isLoading}  >{isLoading? "Submitting...":"Submit"}</button>
       
    </div>

    {message && <p>{message}</p>}
    
</div>
  )
}

export default resetpassword