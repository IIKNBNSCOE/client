import React from 'react'
import "./Head.css"
import {Link} from "react-router-dom"
import {useSelector} from 'react-redux'
function Header1() {
  const {uname}=useSelector(state=>state.user)
  return (
    <div >
        <ul>
           {uname==="" &&<>
            <li><Link  style={{textDecoration: 'none',color:"white"}} to="/" className='link'>Home</Link></li>
            <li><Link  style={{textDecoration: 'none' ,color:"white"}} to="/login" className='link'>Login</Link></li>
            <li><Link  style={{textDecoration: 'none' ,color:"white"}} to="/register" className='link'>Register</Link></li>
           </>}   
           {uname===undefined &&<>
            <li><Link style={{textDecoration: 'none',color:"white"}} to="/" className='link'>Home</Link></li>
            <li><Link style={{textDecoration: 'none',color:"white"}} to="/login" className='link'>Login</Link></li>
            <li><Link style={{textDecoration: 'none',color:"white"}} to="/register" className='link'>Register</Link></li>
           </>}          
        </ul>
    </div>
  )
}

export default Header1