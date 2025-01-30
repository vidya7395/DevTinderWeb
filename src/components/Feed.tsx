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
   } catch (error) {
    console.log(error);
    
   }
  }
  useEffect(()=>{ 
    getFeed();
  },[feed]);
  if(feed && feed.length <=0) return <h1 className='text-center'>No new users found !</h1>;
  return (
    <div className='flex justify-center '>
      {feed && feed.map((data:any,index)=>(
          
          <UserCard type="feed" key={data._id}  data={data} />
          
        )
      )}
    </div>
  )
}

export default Feed
