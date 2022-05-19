import {createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios"
import {TokenVerifyURL} from '../config/api'
const initialState={
    uname:""
}
export const getUser=createAsyncThunk(
    "user/getUser",async()=>
    {
       const res=await axios.get(TokenVerifyURL, {
        headers: {
          authorization: localStorage.getItem("token")
        }})
        console.log(res.data.username);
    return( {username:res.data.username});
    })

const userSlice=createSlice({
    name:"user",
    initialState,
    reducers:
    {
        loggedin:(state,action)=>{
                                    state.uname=action.payload.username
                                    localStorage.setItem("token",action.payload.token)                                   
                                 },
        logout:(state)=>{
                          state.uname=""
                          localStorage.removeItem("token")                         
                        },  
        welcome:()=>
        {
            console.log("rtk")
        }
        
    },
    
extraReducers:(builder)=>
{
    builder
    .addCase(getUser.pending,(state,action)=>{
        console.log("pending ")
    })
    .addCase(getUser.fulfilled,(state,action)=>{
        //console.log("payload="+action.payload.data.username)
        state.uname=action.payload.username
    })
    .addCase(getUser.rejected,(state,action)=>{
        console.log("rejected")
    })
}
 
})

export default userSlice.reducer;
export const {loggedin,logout,welcome}=userSlice.actions;