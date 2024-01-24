import React from 'react'
import "../Components/Register.css"
import { useState } from 'react';
import axiosInstance from "../Help/AxiosInstance"
import{toast} from  'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams } from 'react-router-dom';

const AddAcademyName = () => {


  let navigate=useNavigate()

  let token=localStorage.getItem("token")

  let {id}=useParams()

  let [data,setData]=useState({
    academyName:"",
    description:"",
    phone:"",
    email:""

  })

  let {academyName,description,contact,email}=data
  
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
                      academyName,
                      description,
                      contact,
                      email
                     }
                    console.log(payload);
             await axiosInstance.post(`/academies/saveacademy?managerId=${id}`,payload,
            {headers:{Authorization:`Bearer ${token}`}});
            alert("Succefully Added")
            toast.success("Successfully Added")
            navigate("/admindashboard/viewacademy")
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
    <h2>ACADEMY REGISTER </h2>  <br />
                <label htmlFor="academy_name">Academy name  :</label>
                <input type="text" placeholder='Academy name'  id="academy_name" name="academyName"  value={academyName} onChange={ handleData} /> <br /> <br />

                <label htmlFor="description_">Description  :</label>
                <input type="description" placeholder='Description' id="description_" name="description" value={description} onChange={ handleData}/> <br /> <br />
                <label htmlFor="email_">Email  :</label>
                <input type="text" placeholder='E-mail' id="email_" name="email" value={email} onChange={ handleData}/> <br /> <br />
                <label htmlFor="phone_">Phone No  :</label>
                <input type="number" placeholder='Phone No'  id="phone_" name="contact" value={contact} onChange={ handleData}/> <br /> <br />

                <button id= "btn1" >Submit</button>
                <button className='btn'>Cancel</button>
  </div>
  </form>
  </div>
  </>
  )
}

export default AddAcademyName
