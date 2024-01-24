import React from 'react'
import "../Components/Register.css"
import { useState } from 'react';
import axiosInstance from "../Help/AxiosInstance"
import{toast} from  'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams } from 'react-router-dom';


const AddBranch = () => {


  let navigate=useNavigate()

  let token=localStorage.getItem("token")
  let bi=localStorage.setItem("token", token);

  let {id}=useParams()

  let [data,setData]=useState({
    address:"",
    city:"",
    phone:"",
    pincode:""

  })

  let {address,city,phone,pincode}=data
  
       let handleData=(e)=>
       {
            e.preventDefault()
            let name=e.target.name
            let value=e.target.value
            setData({...data,[name]:value})
       }

        let handleSubmit= async (e)=> {
           e.preventDefault();
           console.log(data);
     try{
                   let payload={
                      address,
                      city,
                      phone,
                      pincode
                     }
                    console.log(payload);
             await axiosInstance.post(`/branches/save?aid=${id}`,payload,
            {headers:{Authorization:`Bearer ${token}`}});
            alert("Succefully Added Branch")
            toast.success("Successfully Added Branch")
            navigate("/admindashboard/viewbranch")
         }
 catch{
    alert("Server issues");
    toast.error("Server issues");
  }

}




  return (
  <>
  <div className="Main" >
    <form action="" onSubmit={handleSubmit}>
  <div className="Sub"  >
    <h2>Add Branch </h2>  <br />
                <label htmlFor="address">Address :</label>
                <input type="text" placeholder='Address'  id="address" name="address"  value={address} onChange={ handleData} /> <br /> <br />

                <label htmlFor="city">City :</label>
                <input type="text" placeholder='City' id="description_" name="city" value={city} onChange={ handleData}/> <br /> <br />
                <label htmlFor="phone">Phone No :</label>
                <input type="text" placeholder='phone No' id="phone" name="phone" value={phone} onChange={ handleData}/> <br /> <br />
                <label htmlFor="pincode">Pincode :</label>
                <input type="text" placeholder='Pincode'  id="pincode" name="pincode" value={pincode} onChange={ handleData}/> <br /> <br />

                <button id= "btn1" >Submit</button>
                <button className='btn'>Cancel</button>
  </div>
  </form>
  </div>
  </>
  )
}

export default AddBranch
