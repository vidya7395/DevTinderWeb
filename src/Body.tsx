import { Outlet, useNavigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import { BASE_URL } from './utils/constant';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from './utils/slice/userSlice';
import { useEffect } from 'react';

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((state: { user: any }) => state.user);
  const fetchUser = async () => {
    console.log("User Data", !userData);
    
    if(userData) return;
    try {
      const res = await axios.get(`${BASE_URL}/profile/view`, {
        withCredentials: true
      });
      dispatch(addUser(res.data))
    } catch (error:any) {
      if(error.status === 401){
        navigate("/login");
      }
      console.log("ERROR", error);
        
    }
  };
  useEffect(()=>{
    console.log("Caleed");
    
     fetchUser();
  },[])
  return (
    <>
      <Navbar />
      <div className='p-5'>
        <Outlet/>
      </div>
    </>
    //Now we will create children routes
  )
}

export default Body
