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
  const userData = useSelector((store: any) => store.user);
  const fetchUser = async () => {
    if (userData) return;
    try {
      console.log("The fetch user api");

      const res = await axios.get(`${BASE_URL}/profile/view`, {
        withCredentials: true
      });
      dispatch(addUser(res.data))
    } catch (error: any) {
      if (error.status === 401) {
        navigate("/login");
      }
      console.log("ERROR", error);

    }
  };
  useEffect(() => {
    fetchUser();
  }, [])
  return (
    <>
      <Navbar />
      <div className='p-5'>
        <Outlet />
      </div>
    </>
    //Now we will create children routes
  )
}

export default Body
