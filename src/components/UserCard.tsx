import axios from 'axios';
import React from 'react'
import { BASE_URL } from '../utils/constant';
import { useDispatch } from 'react-redux';
import { removeUserFromFeed } from '../utils/slice/feedSlice';

interface UserCardProps {
    data: {
        _id?:any;
        firstName: string;
        lastName: string;
        about: string;
        photoUrl: string;
        skills: string[];
        age?: number;
        gender?: string;
    };
    type?:string
}

const UserCard: React.FC<UserCardProps> = ({ data,type }) => {
    const { _id,firstName, lastName, about, photoUrl, skills, age, gender } = data;
    const dispatch = useDispatch()
    const handleSendRequest = async (status,userId)=>{
        try {
            const res = await axios.post(BASE_URL+"/request/send/"+status+"/"+userId,{},{withCredentials:true});
            dispatch(removeUserFromFeed(userId));
        } catch (error) {
            console.log("ERROR",error);
            
        }
    } 
  
    return (
        <div className={`card bg-base-300 w-96 shadow-xl mx-4 ${type === "feed" ? "absolute" : ""}`}>
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
                    {skills.map((skill,index) => (
                        <div key={skill+index} className="badge badge-outline">{skill}</div>
                    ))}
                </div>
               { type === "feed" &&
                 <div className="card-actions justify-end">
                    <button className="btn btn-primary" onClick={()=>handleSendRequest("ignored", _id)}>Ignore</button>
                    <button className="btn btn-secondary" onClick={()=>handleSendRequest("interested", _id)}>Interested</button>
                </div>
               }

            </div>
        </div>
    )
}

export default UserCard
