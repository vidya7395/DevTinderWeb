import axios from 'axios';
import React from 'react'
import { BASE_URL } from '../utils/constant';
import { useDispatch } from 'react-redux';
import { removeRequestReceived } from '../utils/slice/requestReceivedSlice';

const RequestReceivedCard = ({data,requestId}) => {
    console.log("DATA", data);
    const dispatch = useDispatch();
    const reviewRequest = async(status)=>{
        // /request/review/accepted/67933c8289485ca7f6bdc142
        try {
            await axios.post(`${BASE_URL}/request/review/${status}/${requestId}`,{},{withCredentials:true});
            dispatch(removeRequestReceived(requestId));
        } catch (error) {
            console.log("Error", error);
            
        }
    }
    const {photoUrl,firstName,lastName,age,gender,about}= data;
  return (
    <div className={`card bg-base-300 w-96 shadow-xl mx-4   `}>
    <figure className='h-[300px] object-cover w-full'>
        <img
            src={photoUrl}
            className='h-full w-full object-cover'
            alt={firstName +"Photo"} />
    </figure>
    <div className="card-body">
        <h2 className="card-title">
            {firstName} {lastName}
            {/* <div className="badge badge-secondary">NEW</div> */}
        </h2>
        {age && gender && <p>age: {age}  gender : {gender}</p>}

        <p>{about}</p>
       
        <div className="card-actions justify-end">
            <button className="btn btn-primary" onClick={()=>reviewRequest("rejected")}>Reject</button>
            <button className="btn btn-secondary" onClick={()=>reviewRequest("accepted")}>Accept</button>
        </div>

    </div>
</div>
  )
}

export default RequestReceivedCard
