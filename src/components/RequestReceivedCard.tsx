import React from 'react'

const RequestReceivedCard = ({data}) => {
    console.log("DATA", data);
    
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
            <button className="btn btn-primary">Reject</button>
            <button className="btn btn-secondary">Accept</button>
        </div>

    </div>
</div>
  )
}

export default RequestReceivedCard
