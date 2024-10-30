import React from 'react'
import { useState } from 'react';
import { useNavigate  } from 'react-router-dom';

const Login = (props) => {

    const host = "https://inote-backend-9y88.onrender.com";
    const [credentials,setCredentials]= useState({email:"",password:""})
    let navigate=useNavigate ();
    const handleSubmit=async (e)=>{
         e.preventDefault();
         const response = await fetch(`${host}/api/auth/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
             
            },
            body: JSON.stringify({ email:credentials.email,password:credentials.password }),
          });
        const json=await response.json()
        
       if(json.success){
     localStorage.setItem('token',json.authToken);
     navigate("/")
     props.showAlert("Logged in successfully","success")
       }
       else
       {
        props.showAlert("invalid details","danger")
       }
    }

    const onchange=(e)=>{
        setCredentials({...credentials,[e.target.name]:e.target.value})
        }
  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
    <h1 className="text-2xl font-bold text-center mb-4">Login to Continue</h1>
    <form onSubmit={handleSubmit}>
        <div className="mb-4">
            <label htmlFor="email" className="form-label">Email Address</label>
            <input 
                type="email" 
                className="form-control" 
                id="email" 
                name="email" 
                value={credentials.email} 
                onChange={onchange} 
                aria-describedby="emailHelp" 
                required 
                placeholder="Enter your email"
            />
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-4">
            <label htmlFor="password" className="form-label">Password</label>
            <input 
                type="password" 
                className="form-control" 
                id="password" 
                name="password" 
                onChange={onchange} 
                value={credentials.password} 
                required 
                placeholder="Enter your password"
            />
        </div>
        <button type="submit" className="btn btn-primary w-full">Submit</button>
      
    </form>
</div>

  )
}

export default Login
