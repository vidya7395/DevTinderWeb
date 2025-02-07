import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/slice/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constant";
// filepath: /c:/Users/VidyaSatpute/Desktop/New folder/Project/Full-Stack/devTinder-web/src/components/YourComponent.tsx
import Joyride, { CallBackProps, STATUS, Step } from 'react-joyride';
const Login = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [emailId, setEmailId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [showToaster, setShowToaster] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [run, setRun] = useState(true);

  // filepath: /c:/Users/VidyaSatpute/Desktop/New folder/Project/Full-Stack/devTinder-web/src/components/YourComponent.tsx
  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status } = data;
    const finishedStatuses: string[] = [STATUS.FINISHED, STATUS.SKIPPED];

    if (finishedStatuses.includes(status)) {
      setRun(false);
    }
  };
  const steps: Step[] = isLoginForm ? [
    {
      target: '.my-first-step',
      content: 'Enter your email address to login.',
    },
    {
      target: '.my-first-step',
      content: 'Enter your password to login.',
    },
    {
      target: '.my-second-step',
      content: 'Click here to submit your login information.',
    },
    {
      target: '.alert-success',
      content: 'This message will appear upon successful login.',
    },
    {
      target: '.cursor-pointer',
      content: 'Click here to switch to the signup form.',
    },
  ] : [
    {
      target: '.my-first-step',
      content: 'Enter your first name to sign up.',
    },
    {
      target: '.my-first-step',
      content: 'Enter your last name to sign up.',
    },
    {
      target: '.my-first-step',
      content: 'Enter your email address to sign up.',
    },
    {
      target: '.my-first-step',
      content: 'Enter your password to sign up.',
    },
    {
      target: '.my-second-step',
      content: 'Click here to submit your signup information.',
    },
    {
      target: '.alert-success',
      content: 'This message will appear upon successful signup.',
    },
    {
      target: '.cursor-pointer',
      content: 'Click here to switch to the login form.',
    },
  ];
  const handleLogin = async () => {
    try {
      const res = await axios.post(`${BASE_URL}/login`, {
        emailId,
        password
      }, {
        withCredentials: true
      });
      setShowToaster(true);
      // why i am getting promise in return
      console.log("RES", res.data);

      dispatch(addUser(res.data))
      setTimeout(() => {
        setShowToaster(false);
        navigate("/");
      }, 2000);

    } catch (error) {
      setError(error?.response?.data || "Something went wrong");
    }
  }
  const handleSignup = async () => {
    try {
      const res = await axios.post(`${BASE_URL}/signup`, {
        firstName,
        lastName,
        emailId,
        password
      }, {
        withCredentials: true
      });
      setShowToaster(true);
      // why i am getting promise in return
      dispatch(addUser(res.data.data))
      setTimeout(() => {
        setShowToaster(false);
      }, 1000);
      navigate("/profile");
    } catch (error) {
      setError(error?.response?.data || "Something went wrong");
    }
  }
  return (
    <>
      <Joyride
        steps={steps}
        run={run}
        continuous
        showSkipButton
        callback={handleJoyrideCallback}
      />
      <div className="flex justify-end">
        <div className="alert alert-success fixed end-[30px]" style={{ display: showToaster ? 'block' : 'none' }}>
          <span>{isLoginForm ? "Login successfully." : "Sing Up Successfully"}</span>
        </div>
      </div>
      <div className='flex justify-center items-center mt-16'>
        <div className="card bg-neutral text-neutral-content w-96">
          <div className="card-body items-center text-center my-first-step">
            <h2 className="card-title mb-4 text-2xl">{isLoginForm ? "Login" : "SignUp"}</h2>
            {!isLoginForm &&
              <>
                <input type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="input input-bordered w-full max-w-xs mt-3" />
                <input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} className="input input-bordered w-full max-w-xs mt-3" />
              </>
            }
            <input type="text" placeholder="Email" value={emailId} onChange={(e) => setEmailId(e.target.value)} className="input input-bordered w-full max-w-xs mt-3" />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="input input-bordered w-full max-w-x mt-3" />
            {error && <p className="text-red-500 my-3">{error}</p>}
            <div className="card-actions justify-end mt-4 my-second-step ">
              <button className="btn btn-primary" onClick={() => { isLoginForm ? handleLogin() : handleSignup() }} type="submit">{isLoginForm ? "Login" : "Sing Up"}</button>
            </div>
            <p className="text-center cursor-pointer mt-4" onClick={() => setIsLoginForm(!isLoginForm)}> {isLoginForm ? "New User ? Sign up here" : "Existing User ?  Login here"}</p>
          </div>
        </div>
      </div>
    </>

  )
}

export default Login
