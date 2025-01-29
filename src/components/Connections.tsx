import axios from 'axios';
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import { addConnection } from '../utils/slice/connectionSlice';

const Connections = () => {
    const dispatch = useDispatch();
    const connections = useSelector((store:any) => store.connection);
    const fetchConnections = async () => {
        try {
            const res = await axios.get(BASE_URL + "/user/connections", {
                withCredentials: true
            });
            console.log("RES", res.data.data);
            dispatch(addConnection(res.data.data))

        } catch (error) {
            console.log("ERROR", error);

        }
    }
    useEffect(() => {
        fetchConnections();
    }, []);
    if (connections && connections.length === 0) return <h1 className='text-bold text-2xl'>No Connections found</h1>
    return (
        <div className=' flex  justify-center my-10'>
          <div>
          <h1 className='text-bold text-2xl mb-4'>Connections</h1>
            {connections && connections.map((connection) => {
                    const { firstName, lastName, photoUrl, age, gender, about } = connection;
                    return (
                        <div key={connection._id} className='bg-gray-950 rounded-sm flex flex-wrap mb-4 p-4 w-95'>
                           <div className='rounded-full h-[50px] w-[50px]'>
                           <img alt="photo" src={photoUrl} className='w-full h-full object-cover rounded-full' />
                           </div>
                            <div className='px-4'>
                                <h2>{firstName} {lastName}</h2>
                                <p className='my-1'>{age && "Age: " +{age}+"|"} {gender &&  `Gender : ${gender}`}</p>
                                <p className='my-1'>{about}</p>
                            </div>

                        </div>
                    )
                })
            }
          </div>
        </div>
    )
}

export default Connections
