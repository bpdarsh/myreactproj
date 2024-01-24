import React ,{useState,useEffect}from 'react'
import { useNavigate ,  useParams} from 'react-router-dom';
import axiosInstance from '../Help/AxiosInstance';
import { toast } from 'react-toastify';

const UpdateAcademy = () => {
    let token = localStorage.getItem("token");
    let navigate = useNavigate();
    let { id } = useParams();
    let [data, setData] = useState({
      academyName: "",
      contact: "",
      description: "",
      email: ""
    });
    let {academyName, contact, description,email} = data;

    useEffect(() => {
        let fetchData = async () => {
            let { data } = await axiosInstance.get(`./academies/get/${id}`,
              { headers: { Authorization: `Bearer ${token}` } });
            console.log(data)
            setData(data.data)
        }
        fetchData();
      }, []);


      let handleChange=(e)=>{
        e.preventDefault()
        let name=e.target.name
        let value=e.target.value
        setData({...data,[name]:value})
      }

      let handleSubmit = async (e) => {
        e.preventDefault();
        try {
          let payload = {
            academyName,
            contact,    
            description,
            email,
            id
          };
          let finalData = await axiosInstance.put(`/academies/update`,payload,{
            headers: { Authorization: `Bearer ${token}` },
          });
          console.log(finalData);
          
          toast.success(` Academy Updated successfully`);
          navigate("/admindashboard/viewacademy");
        } catch {
          console("Failed to update");
        }
      };



  return (
    <>
    <div className="Main" >
  <form action="" onSubmit={handleSubmit}>
<div className="Sub"  >
  <h2>Update Academy </h2>  <br />
              <label htmlFor="academy_name">Academy name  :</label>
              <input type="text" placeholder='Academy name'  id="academy_name" name="academyName"  value={academyName} onChange={ handleChange} /> <br /> <br />
              <label htmlFor="description_">Description  :</label>
              <input type="description" placeholder='Description' id="description_" name="description" value={description} onChange={handleChange}/> <br /> <br />
              <label htmlFor="email_">Email  :</label>
              <input type="text" placeholder='E-mail' id="email_" name="email" value={email} onChange={handleChange}/> <br /> <br />
              <label htmlFor="phone_">Phone No  :</label>
              <input type="number" placeholder='Phone No'  id="phone_" name="contact" value={contact} onChange={handleChange}/> <br /> <br />
              <button id= "btn1" >Submit</button>
              <button className='btn'>Cancel</button>
</div>
</form>
</div>
</>
  )
}

export default UpdateAcademy
