import React ,{useState,useEffect}from 'react'
import { useNavigate ,  useParams} from 'react-router-dom';
import axiosInstance from '../Help/AxiosInstance';
import { toast } from 'react-toastify';

const UpdateBranch = () => {
    let token = localStorage.getItem("token");
    let navigate = useNavigate();
    let { id } = useParams();
    let [data, setData] = useState({
      address: "",
      city: "",
      phone: "",
      pincode: ""
    });
    let {address,city,phone,pincode} = data;

    useEffect(() => {
        let fetchData = async () => {
            let { data } = await axiosInstance.get(`./branches/get/${id}`,
              { headers: { Authorization: `Bearer ${token}` } });
            console.log(data)
            setData(data.data)
        }
        fetchData();
      }, []);


      let handleData=(e)=>{
        e.preventDefault()
        let name=e.target.name
        let value=e.target.value
        setData({...data,[name]:value})
      }

      let handleSubmit = async (e) => {
        e.preventDefault();
        try {
          let payload = {
            address,
            city,    
            phone,
            pincode,
            id
          };
          let finalData = await axiosInstance.put(`/branches/update/${id}`,payload,{
            headers: { Authorization: `Bearer ${token}` },
          });
          console.log(finalData);
          
          toast.success(`Branch Updated successfully`);
          navigate("/admindashboard/viewbranch");
        } catch {
          console("Failed to update the branch");
        }
      };



  return (
    <>
    <div className="Main" >
  <form action="" onSubmit={handleSubmit}>
<div className="Sub"  >
  <h2>Update Branch </h2>  <br />
 <label htmlFor="address">Address :</label>
 <input type="text" placeholder='Address'  id="address" name="address"  value={address} onChange={ handleData} /> <br /> <br />
 <label htmlFor="city">City :</label>
 <input type="text" placeholder='City' id="description_" name="city" value={city} onChange={ handleData}/> <br /> <br />
 <label htmlFor="phone">Phone No :</label>
 <input type="text" placeholder='phone No' id="phone" name="phone" value={phone} onChange={ handleData}/> <br /> <br />
 <label htmlFor="pincode">Phone No  :</label>
 <input type="text" placeholder='Pincode'  id="pincode" name="pincode" value={pincode} onChange={ handleData}/> <br /> <br />
 <button id= "btn1" >Submit</button>
 <button className='btn'>Cancel</button>
</div>
</form>
</div>
</>
  )
}

export default UpdateBranch
