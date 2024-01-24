import React ,{useState,useEffect}from 'react'
import { useNavigate ,  useParams} from 'react-router-dom';
import axiosInstance from '../Help/AxiosInstance';
import { toast } from 'react-toastify';


const UpdateCourse = () => {
    let token = localStorage.getItem("token");
    let navigate = useNavigate();
    let { id } = useParams();

    let [data,setData]=useState({
      courseDurationInMonths:"",
      fee:"",
      image:"",
      type:"",
      Name:""
    })
    let {courseDurationInMonths,fee,image,type,Name}=data;



    useEffect(() => {
        let fetchData = async () => {
            let { data } = await axiosInstance.get(`./dancecourses/get/${id}`,
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
            courseDurationInMonths,
            fee,    
            image,
            type,
            Name,
            id
          };
          let finalData = await axiosInstance.put(`/dancecourses/update/${id}`,payload,{
            headers: { Authorization: `Bearer ${token}` },
          });
          console.log(finalData);
          
          toast.success(`Course Updated successfully`);
          navigate("/admindashboard/viewcourse");
        } catch {
          console("Failed to update the branch");
        }
      };




  return (
    <>
       
       <div className="Main" >
   <form action="" onSubmit={handleSubmit}>
 <div className="Sub"  >
   <h2>Update Course </h2>  <br />
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

export default UpdateCourse
