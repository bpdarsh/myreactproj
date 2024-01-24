import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import axiosInstance from '../Help/AxiosInstance';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const ViewAcademy = () => {

  let token=localStorage.getItem('token');
  console.log(token);
  let {id}=useParams()
  console.log(id);

  let handleDelete=async(x)=>{
     let result=await axiosInstance.delete(`/academies/delete/${x}`,{
     headers:{
    Authorization:`Bearer ${token}`,
  }
})
window.location.assign("/admindashboard/viewacademy")
  }


    let [state , setSate]=useState([])

    useEffect(()=>{
    let featchData=async()=>{
    try{
         let {data}=await axiosInstance.get(`/academies/getall`,{headers: {Authorization:`Bearer ${token}`}})
         let finalData=data.data
         console.log(finalData);
         setSate(finalData)
    }
    catch{
          console.log("Unable to get Data from Academy");
    }
  }
  featchData();
})


  return (
    <>
    <h2 className='viewAcademyHed' style={{textAlign:'center', marginTop:'20px'}}>Total Number of Academy are : <span id="countNum">{state.length}</span></h2>
    <div className='ViewAcademy_main'>
      {state.map((x)=>{
        return(
          <div className="ViewAcademy_sub">
            <h3>AcademyName : <span>{x.academyName}</span></h3>
            <h3>description : <span>{x.description}</span></h3>
            <h3>Phone : <span>{x.contact}</span></h3>
            <h3>Email ID : <span>{x.email}</span></h3>

            <button className="view_btn"> <Link className="view_btnL" to={`/admindashboard/viewacademy/updateAcademy/${x.id}`}>Update</Link> </button>
            <button className="view_btn"> <Link className="view_btnL" to={`/admindashboard/viewacademy/addBranch/${x.id}`}>Add Branch</Link></button>
            <button className="view_btn" onClick={()=>{ handleDelete(x.id) }}>DELETE</button>
          </div>
        )
      })}
    </div>
    </>
  )
}

export default ViewAcademy
