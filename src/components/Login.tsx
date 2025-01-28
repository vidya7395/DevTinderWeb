import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/slice/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constant";

const Login = () => {
  const [emailId, setEmailId] = useState('Trump@gmail.com');
  const [password, setPassword] = useState('Trump@123');
  const [showToaster, setShowToaster] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginHandler = async () => {
    try {
      const res= await axios.post(`${BASE_URL}/login`, {
        emailId,
        password
      },{
        withCredentials: true
      });
      setShowToaster(true);
      // why i am getting promise in return
      console.log("RES", res.data);
       
      dispatch(addUser(res.data))
      setTimeout(() => {
        setShowToaster(false);
      }, 2000);
      navigate("/");      
    } catch (error) {
      console.log("ERROR", error);

    }
  }
  return (
    <>
      <div className="flex justify-end">
        <div className="alert alert-success fixed end-[30px]" style={{ display: showToaster ? 'block' : 'none' }}>
          <span>Login successfully.</span>
        </div>
      </div>
      <div className='flex justify-center items-center mt-16'>
        <div className="card bg-neutral text-neutral-content w-96">
          <div className="card-body items-center text-center">
            <h2 className="card-title mb-4 text-2xl">Login</h2>
            <input type="text" placeholder="Email" value={emailId} onChange={(e) => setEmailId(e.target.value)} className="input input-bordered w-full max-w-xs" />
            <input type="text" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="input input-bordered w-full max-w-x mt-3" />
            <div className="card-actions justify-end mt-4">
              <button className="btn btn-primary" onClick={() => loginHandler()}>Login</button>
            </div>
          </div>
        </div>
      </div>
    </>

  )
}

export default Login
