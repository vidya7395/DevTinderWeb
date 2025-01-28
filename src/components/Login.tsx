import axios from "axios";
import { useState } from "react";

const Login = () => {
  const [emailId, setEmailId] = useState('Trump@gmail.com');
  const [password, setPassword] = useState('Trump@123');
  const [showToaster, setShowToaster] = useState(false);
  const loginHandler = async () => {
    try {
      const res= axios.post('http://localhost:3000/login', {
        emailId,
        password
      },{
        withCredentials: true
      });
      setShowToaster(true);
      setTimeout(() => {
        setShowToaster(false);
      }, 3000);
      console.log("RES", res);
      
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
