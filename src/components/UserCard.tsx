import React from 'react'

interface UserCardProps {
    data: {
        firstName: string;
        lastName: string;
        about: string;
        photoUrl: string;
        skills: string[];
        age?: number;
        gender?: string;
    };
}

const UserCard: React.FC<UserCardProps> = ({ data }) => {
    const { firstName, lastName, about, photoUrl, skills, age, gender } = data;
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
                    {skills.map((skill,index) => (
                        <div key={skill+index} className="badge badge-outline">{skill}</div>
                    ))}
                </div>
                <div className="card-actions justify-end">
                    <button className="btn btn-primary">Ignore</button>
                    <button className="btn btn-secondary">Interested</button>
                </div>

            </div>
        </div>
    )
}

export default UserCard
