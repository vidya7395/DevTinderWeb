import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constant'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addRequestReceived } from '../utils/slice/requestReceivedSlice';
import RequestReceivedCard from './RequestReceivedCard';

const RequestReceived = () => {
  const dispatch = useDispatch();
    const requests = useSelector((store:any) => store.receivedRequest);
  const fetchRequest = async () => {
    try {
       const res = await axios.get(BASE_URL+"/user/requests/received",{
        withCredentials:true
       });
      dispatch(addRequestReceived(res.data.data))
    } catch (error) {
      console.log("ERROR",error);
      
    }
  }
  useEffect(()=>{
    fetchRequest()
  },[])
  if(requests && requests.length === 0 ) return <h1>No data</h1>
  return (
    <div className='flex flex-wrap gap-10'>
      {requests && requests.map((request:any)=>{
        return <RequestReceivedCard key ={request._id} requestId={request._id} data={request.fromUserId}></RequestReceivedCard>
      })}
    </div>
  )
}

export default RequestReceived
