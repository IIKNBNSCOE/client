import React from 'react'
import Modal from 'react-modal'
import {useDispatch,useSelector} from "react-redux"
import {useNavigate} from "react-router-dom"
import {useState} from "react"
import {logout} from '../services/userslice'
import {TicketURL} from '../config/api'
import './ticketstyle.css'
import axios from 'axios'
import ShowTicket from './ShowTicket'
function Ticket() {
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const [modelopen,setModelopen]=useState(false)
    const [ticketdesc,setTicketdesc]=useState("")
    const [flag,setFlag]=useState(false)
    const [flag1,setFlag1]=useState(true)
    const [cticket,setCticket]=useState(0)
    const {uname}=useSelector((state)=>state.user);
    const [ticketno,setTicketno]=useState(0)
    const mlogout=(e)=>
    {
        e.preventDefault()
        dispatch(logout())
        navigate("../login",{replace:true})

    }
    const TicketHandler=(e)=>
    {
        e.preventDefault()
        axios.post(TicketURL,{ticket_desc:ticketdesc}, {
            headers: {
              authorization: localStorage.getItem("token")
            }})
    .then((res)=>
    {
      //console.log(res.data.message)   
      setTicketno(res.data.Ticket_no)
      setFlag(true)   
    })
    .catch((err)=>
    {
      console.log("hi")
      console.log(err)
    }) 

    }
   
  return (
    
     <div className="content">
       {(uname != "" && uname != undefined)&&<>
     <h3 onClick={()=>setModelopen(true)} className="tic">Create Ticket</h3>
    <h3 onClick={mlogout} className="log">Logout</h3></>}
    <Modal
        isOpen={modelopen}
        onRequestClose={()=>setModelopen(false)}        
      >
          <h1>Ticket Description</h1>
          <input type="text" style={{fontSize:"2rem"}} value={ticketdesc} onChange={(e)=>setTicketdesc(e.target.value)}/>
          <div style={{display:"flex"}}>
          <button onClick={TicketHandler} style={{fontSize:"2rem"}}>Create Ticket</button>
          <button onClick={()=>setModelopen(false)} style={{fontSize:"2rem",marginLeft:"5rem"}}>Close</button>
          
          </div>

      </Modal>
      <Modal
        isOpen={flag}
        onRequestClose={()=>
            {setFlag(false)
            setModelopen(false)
            setFlag1(prev=>!prev)
            }}      
            style={{content: {
                top: '50%',
                left: '50%',
                right: 'auto',
                bottom: 'auto',
                marginRight: '-50%',
                transform: 'translate(-50%, -50%)',
              }}}  
      >
          
          <h2>Ticket is created with <strong>Ticket No.{ticketno}</strong></h2>

      </Modal>
      
       {(uname != "" && uname != undefined)&&<ShowTicket f={flag1}/>}
       
    </div>
    
  )
}

export default Ticket