import React from 'react'
import "../Components/Register.css"
import { useState } from 'react';
import axiosInstance from "../Help/AxiosInstance"
import{toast} from  'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const AcademymanegerRegister = () => {
let token=localStorage.getItem('token');
  let [data,setData]=useState({
    userName:"",
    email:"",
    password:"",
    phone: "",
    dob:"",
    gender:""

  });

  let {userName,email,password,dob,phone,gender} =data

 let handledata=(e)=>{
  let name=e.target.name
  let value=e.target.value
  setData({...data,[name]:value})
 }

let handlesubmit= async (e)=>{
  e.preventDefault();
  console.log(data);
try{
  let payload={
    userName,
    email,
    password,
    phone,
    dob,
    gender
  }
  let final_data=await axiosInstance.post("/academymanagers/save",payload,
  {
    headers : {
        Authorization : `Bearer ${token}`
    }
  }
  
  )
  console.log(final_data);
  toast.success("Successfully registered with email")

}
 catch{
    alert("not able to register");
  }

}






  return (
  <>
  <div className="Main" >
    <form action="" onSubmit={handlesubmit}>
  <div className="Sub"  >
    <h2>Academy Manager Register form </h2>  <br />
                <label htmlFor="proname">Username  :</label>
                <input type="text"  id="proname" name="userName" value={userName} onChange={handledata} /> <br /> <br />
                <label htmlFor="proprice">Email  :</label>
                <input type="email"  id="proprice" name="email" value={email} onChange={handledata}/> <br /> <br />
                <label htmlFor="propclr">Password  :</label>
                <input type="password"  name="password" value={password} onChange={handledata}/> <br /> <br />
                <label htmlFor="proqty">Phone   :</label>
                <input type="number"  id="proqty" name="phone" value={phone} onChange={handledata}/> <br /> <br />
                <label htmlFor="dob">DOB :</label>
                <input type="date" id="dob" name="dob" value={dob} onChange={handledata}/> <br /> <br />
                <label htmlFor="">Gender :</label>
                <input type="radio" className='rbtn' name="gender" value="male" id="radio1" onChange={handledata}/>
                <label htmlFor="radio1">Male</label>
                <input type="radio" className='rbtn' name="gender" value="female" id="radio2" onChange={handledata}/>
                <label htmlFor="radio2">Female</label><br /> <br />
                 <button id= "btn1" >Submit</button>
                <button className='btn'>Cancel</button>
  </div>
  </form>
  </div>
  </>
  )
}

export default AcademymanegerRegister
