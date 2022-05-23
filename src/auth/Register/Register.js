import React, { useState,useEffect } from 'react'
import axios from 'axios'
import {RegisterURL} from '../../config/api'
function Register() {
  const [username,setUsername]=useState("a")
  const [password,setPassword]=useState("b")
  const [email,setEmail]=useState("cd@xz.com")
  const [message,setMessage]=useState("")
  const [errorusername,setErrorUsername]=useState("")
  const [errorpassword,setErrorPassword]=useState("")
  const [erroremail,setErrorEmail]=useState("")

  useEffect(()=>
  {
    username==''?setErrorUsername("Required"):setErrorUsername("")
  },[username])

  useEffect(()=>
  {
    password==''?setErrorPassword("Required"):setErrorPassword("")
  },[password])

  useEffect(()=>
  {
    email==''?setErrorEmail("Required"):(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/).test(email)?setErrorEmail(""):setErrorEmail("Incorrect Email Format")
  },[email])

  const register=(e)=>
  {
    e.preventDefault()
    if(username.trim()!='' && password.trim()!='' && email.trim()!='')
    {
    axios.post(RegisterURL,{username,password,email})
    .then((res)=>{
      setMessage(res.data.message)
    }) .catch((err)  =>
    {
     console.log(err)
    })
    }
    else
    {
      setMessage("Please enter all fields")
    }
  }

  return (
    <div>
      
      <span className='loginlabel'>Registration Form</span>
       <div className="container">   
            <label>Username : </label>   
            <input type="text" placeholder="Enter Username" name="username" value={username} onChange={(e)=>setUsername(e.target.value)}/>  
            <h4 style={{color:"red"}}>{errorusername}</h4>
            <label>Password : </label>   
            <input type="password" placeholder="Enter Password" name="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
            <h4 style={{color:"red"}}>{errorpassword}</h4>
            <label>Email : </label> 
            <input type="text" placeholder="Enter Email Address" name="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>  
            <h4 style={{color:"red"}}>{erroremail}</h4>
            <button type="submit" onClick={register}>Register</button>   
            <button type="button" class="cancelbtn" onClick={(e)=>
            {
              setUsername("a")
              setPassword("b")
              setEmail("cd@xz.com")
              setMessage("")
            }}> Cancel</button>   
              <div style={{color:"red",fontSize:"2rem"}}>{message}</div>
        </div>
      
        </div>   
   
  )
}

export default Register