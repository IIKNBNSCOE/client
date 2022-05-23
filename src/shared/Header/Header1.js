import React,{useState} from 'react'
import "./Head.css"
import {Link} from "react-router-dom"
import {useSelector} from 'react-redux'
function Header1() {
  const {uname}=useSelector(state=>state.user)
  const [isclick,setIsclick]=useState(false);
  return (
    <div >
        <ul className={`list ${isclick?"show":"hide"}`}>
           {uname==="" &&<>
            <li><Link  style={{textDecoration: 'none',color:"white"}} to="/" className='link'>Home</Link></li>
            <li><Link  style={{textDecoration: 'none' ,color:"white"}} to="/login" className='link'>Login</Link></li>
            <li><Link  style={{textDecoration: 'none' ,color:"white"}} to="/register" className='link'>Register</Link></li>
            
           </>}   
           {uname===undefined &&<>
            <li><Link style={{textDecoration: 'none',color:"blue"}} to="/" className='link'>Home</Link></li>
            <li><Link style={{textDecoration: 'none',color:"blue"}} to="/login" className='link'>Login</Link></li>
            <li><Link style={{textDecoration: 'none',color:"blue"}} to="/register" className='link'>Register</Link></li>
                     
           </>}    

         
             
        </ul>
        <div className="hamburger" onClick={()=>setIsclick(prev=>!prev)}>
        <div style={{width:"35px",height:"5px",backgroundColor:"brown",margin: "6px 0"}}></div>
        <div style={{width:"35px",height:"5px",backgroundColor:"brown",margin: "6px 0"}}></div>
        <div style={{width:"35px",height:"5px",backgroundColor:"brown",margin: "6px 0"}}></div>
        </div>
    </div>
  )
}

export default Header1