import React,{useEffect} from 'react'
import { useSelector,useDispatch } from 'react-redux'
import {BrowserRouter,Routes, Route} from "react-router-dom"
import Header from '../Header/Header1'
import Footer from '../Footer/Footer1'
import Header1 from '../Header/Header1'
import Footer1 from '../Footer/Footer1'
import {Login} from '../../auth/Login/Login'
import Register from '../../auth/Register/Register'
import Ticket from '../../components/Ticket'
import Home from '../../components/Home'
import {getUser} from '../../services/userslice'

function Navigation() {
const dispatch=useDispatch();
  useEffect(()=>{
    dispatch(getUser())
  },[])
  const {uname}=useSelector((state)=>state.user);
  return(
      <div>
          <BrowserRouter>
          <Header1/>
           <Routes>
               {uname!==""&&<Route exact path="/" element={<Ticket/>}/>}
               <Route exact path="/" element={<Home/>}/>
               <Route exact path="/login" element={<Login/>}/>
               <Route exact path="/register" element={<Register/>}/>
               {uname!==""&&<Route exact path="/ticket" element={<Ticket/>}/>}
               
               
              
           </Routes>           
          {/*<Footer1/>*/}
          </BrowserRouter>
      </div>
  )
}

export default Navigation