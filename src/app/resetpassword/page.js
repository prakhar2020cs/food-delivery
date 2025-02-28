import React from 'react'

const resetpassword = () => {
  return (
    <div className='forgot-password'>
       
    <div className="forgot-form">
    <h2>Enter new password</h2>
        <label htmlFor="email">New Password</label>
     <input id='email' type="email" placeholder='Enter Your New Passsword' />
     <button type='submit'>Submit</button>
       
    </div>
    
</div>
  )
}

export default resetpassword