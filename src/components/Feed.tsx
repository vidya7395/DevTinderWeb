import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addFeed } from '../utils/slice/feedSlice';
import { BASE_URL } from '../utils/constant';
import UserCard from './UserCard';

const Feed = () => {
  const feed = useSelector((store:any)=> store.feed);
  const dispatch = useDispatch();
  const getFeed = async()=>{
    if(feed) return;
   try {
     const response = await axios(BASE_URL+'/user/feed', {withCredentials:true});
     const {data} = response.data;
     dispatch(addFeed(data));
     console.log(data)
   } catch (error) {
    console.log(error);
    
   }
  }
  useEffect(()=>{ 
    getFeed();
  },[]);
  return (
    <div className='flex justify-center '>
      {feed && feed.map((data:any,index)=>(
          
          <UserCard key={data._id}  data={data} />
          
        )
      )}
    </div>
  )
}

export default Feed
