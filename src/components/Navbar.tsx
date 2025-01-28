/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDispatch, useSelector } from "react-redux"
import { removeUser } from "../utils/slice/userSlice";
import { Link, useNavigate } from "react-router-dom";

const Navbar  = () => {
  const user = useSelector((state: { user: any }) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
const logoutHandler = () => {
  dispatch(removeUser());
  // clear cookies or token
  document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  navigate("/login");
}  
  return (
    <div className="navbar bg-base-300">
    <div className="flex-1">
      <Link to={"/"} className="btn btn-ghost text-xl">👨🏻‍💻</Link>
    </div>
    {user && <div className="flex items-center justify-center">
    <p className="mx-3">Welcome, {user.firstName}</p>
     {  <div className="dropdown dropdown-end me-4 hidden">
        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
           {/* {/* I want the theme icon  */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 10l7-7m0 0l7 7M5 10h14M5 14h14M5 18h14" />
          </svg>
         
        </div>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content bg-base-300 rounded-box z-[1] mt-3 w-52 p-2 shadow">
          <div className="form-control">
        <label className="label cursor-pointer gap-4">
          <span className="label-text">Default</span>
          <input type="radio" name="theme-radios" className="radio theme-controller" value="default" />
        </label>
      </div>
      <div className="form-control">
        <label className="label cursor-pointer gap-4">
          <span className="label-text">Light</span>
          <input type="radio" name="theme-radios" className="radio theme-controller" value="light" />
        </label>
      </div>
      <div className="form-control">
        <label className="label cursor-pointer gap-4">
          <span className="label-text">Aqua</span>
          <input type="radio" name="theme-radios" className="radio theme-controller" value="aqua" />
        </label>
      </div>
        </ul>
      </div>}
    <div className="dropdown dropdown-end me-4">
     
        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle  bg-amber-400">
          <div className="w-10 rounded-full flex items-center justify-center">
          <div className="text-xl font-bold">{user.firstName[0]}</div>
          </div>
        </div>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content bg-base-300 rounded-box z-[1] mt-3 w-52 p-2 shadow">
          <li>
            <Link className="justify-between" to={"/profile"}>
              Profile
              <span className="badge">New</span>
            </Link>
          </li>
          <li><a>Settings</a></li>
          <li onClick={()=>logoutHandler()}><a>Logout</a></li>
        </ul>
      </div>
   
    </div>
}
  </div>
  )
}

export default Navbar
