import React, { useEffect, useState } from 'react'
import axiosInstance from '../Help/AxiosInstance'
import "../Admins/Admins.css"
import { Link } from 'react-router-dom'
const ViewAcademyManager = () => {
  let token=localStorage.getItem('token');
  let [state, setState]=useState([])
  useEffect(()=>{
    let fetchData=async()=>{
      try{
        let{data}=await axiosInstance.get("/academymanagers/getall",
        {headers:{Authorization:`Bearer ${token}`}})
        let finalData=data.data
        console.log(finalData);
        setState(finalData)
      }
      catch{
    console.log("unacble to fetch the data")
      }
    }
    fetchData();
  },[])


  return (
    <div  className='card-box-main' >
      
        {
          state.map((x)=>{
            return(
              <div key={x.id} className="card-box-sub">
             <h2> Username: <span>{x.userName}</span> </h2>
             <h2> EmailID :<span>{x.email}</span></h2> 
             <h2> DOB :<span>{x.dob}</span>  </h2>
            <h2> Phone No :<span>{x.phone}</span></h2> 
             <h2>Role :<span>{x.role}</span></h2>
             <h2>Gender :<span>{x.gender}</span></h2> 
             <Link  to={`/admindashboard/viewacademymanager/viewacademyEachManager/${x.id}`}><button className='View-mgr-btn'>View</button></Link>
              </div>
              
            )
          })
        }
    </div>
    
  )
}

export default ViewAcademyManager
