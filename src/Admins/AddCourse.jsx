import React from 'react'
import "../Components/Register.css"
import { useState } from 'react';
import axiosInstance from "../Help/AxiosInstance"
import{toast} from  'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams } from 'react-router-dom';


const AddCourse = () => {


  let navigate=useNavigate()

  let token=localStorage.getItem("token")

  let {id}=useParams()

  let [data,setData]=useState({
    courseDurationInMonths:"",
    fee:"",
    image:"",
    type:"",
    Name:""

  })

  let {courseDurationInMonths,fee,image,type,Name}=data;
  
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
                    courseDurationInMonths,
                    fee,
                    image,
                    type,
                    Name
                     }
                    console.log(payload);
             await axiosInstance.post(`/dancecourses/save?branchid=${id}`,payload,
            {headers:{Authorization:`Bearer ${token}`}});
            alert("Succefully Added Branch")
            toast.success("Successfully Added Branch")
            navigate("/admindashboard/viewCourse")
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
    <h2>Add Course </h2>  <br />
                <label htmlFor="address">Course Duration :</label>
                <input type="integer" placeholder='duration in months'  id="address" name="courseDurationInMonths"  value={courseDurationInMonths} onChange={handleData} /> <br /> <br />

                <label htmlFor="fees">Fees :</label>
                <input type="number" placeholder='Enter fees' id="fees" name="fee" value={fee} onChange={handleData}/> <br /> <br />
                <label htmlFor="imgdata">Img data :</label>
                <input type="text" placeholder='Img Data' id="imgdata" name="image" value={image} onChange={handleData}/> <br /> <br />
                <label htmlFor="type">Course Type :</label>
                <input type="string" placeholder='course type'  id="type" name="type" value={type} onChange={handleData}/> <br /> <br />
                <label htmlFor="type">Name:</label>
                <input type="text" placeholder='Name'  id="type" name="Name" value={Name} onChange={handleData}/> <br /> <br />


                <button id= "btn1" >Submit</button>
                <button className='btn'>Cancel</button>
  </div>
  </form>
  </div>
  </>
  )
}

export default AddCourse
