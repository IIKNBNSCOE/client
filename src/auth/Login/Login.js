import React, { useState,useEffect } from 'react'
import { useDispatch} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {loggedin,welcome} from "../../services/userslice"
import axios from 'axios'
import './loginstyle.css'
import {LoginURL} from '../../config/api'
export function Login() {
  const [username,setUsername]=useState("a")
  const [password,setPassword]=useState("b")
  const [message,setMessage]=useState("")
  const [errorusername,setErrorUsername]=useState("")
  const [errorpassword,setErrorPassword]=useState("")
  
  const dispatch=useDispatch()
  const navigate=useNavigate();

  useEffect(()=>
  {
    username==''?setErrorUsername("Required"):setErrorUsername("")
  },[username])

  useEffect(()=>
  {
    password==''?setErrorPassword("Required"):setErrorPassword("")
  },[password])
  const loginHandler=(e)=>
  {
    e.preventDefault()
    if(username.trim()!='' && password.trim()!='')
    {
    axios.post(LoginURL,{username,password})
    .then((res)=>
    {
      if(res.data.message === "Valid User")
      {
        dispatch(loggedin({username:username,token:res.data.token}))
        navigate("../ticket",{ replace: true })
      }
      else
      {
        setMessage(res.data.message)        
      }      
    })
    .catch((err)=>
    {
     setMessage(err)
    })  
  } 
  else{
    setMessage("Please fill Username,Password")
  }
  
}
    return (
    <div>
      
      <span className='loginlabel' style={{fontsize:"2.5rem", color:"blueviolet"}}>Login Form</span>
       <div className="container">   
            <label>Username : </label>   
            <input type="text" placeholder="Enter Username" name="username"  value={username} onChange={(e)=>{
              setUsername(e.target.value) }}/>  
            <h2 style={{color:"red"}}>{errorusername}</h2>
            <label>Password : </label>   
            <input type="password" placeholder="Enter Password" name="password"  value={password} onChange={(e)=>{
              setPassword(e.target.value)}}/>  
            <h2 style={{color:"red"}}>{errorpassword}</h2>
            <button type="submit" onClick={loginHandler}>Login</button>   
            <button type="button" className="cancelbtn" onClick={(e)=>
            {
              setUsername("a")
              setPassword("b")
              setMessage("")
            }} > Cancel</button>   
            <h2 style={{color:"red",fontSize:"2rem"}}>{message}</h2>
        </div>
        </div>   
   
  )
}
