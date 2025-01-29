import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import UserCard from './UserCard';
import { BASE_URL } from '../utils/constant';
import axios from 'axios';
import { addUser } from '../utils/slice/userSlice';

const EditProfile = ({ user }) => {
    console.log("USER", user);

    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [age, setAge] = useState(user.age);
    const [gender, setGender] = useState(user.gender);
    const [about, setAbout] = useState(user.about);
    const [photoURL, setPhotoURL] = useState(user.photoUrl);
    const [skills, setSkills] = useState(user.skills);
    const [error, setError] = useState("");
    const [showToast, setShowToast] = useState(false)
    const dispatch = useDispatch();
    const saveProfile = async () => {
        setError("");
        try {
            const response = await axios.patch(BASE_URL + '/profile/edit', {
                firstName,
                lastName,
                age,
                gender,
                about,
                photoUrl: photoURL,
                skills,
            }, { withCredentials: true });
            dispatch(addUser(response.data.data));
            setShowToast(true);
            setTimeout(() => {
                    setShowToast(false);
            }, 3000);
        }
        catch (error) {
            setError(error?.response?.data || "Something went wrong");
        }
    };
    return (
        <>
            <div className='flex justify-center '>
                <div className="flex justify-end">
                    <div className='flex justify-center items-center mt-16'>
                        <div className="card bg-neutral text-neutral-content w-96">
                            <div className="card-body items-center text-center">
                                <h2 className="card-title mb-4 text-2xl">Edit Profile</h2>
                                <input type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="input input-bordered w-full max-w-xs" />
                                <input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} className="input input-bordered w-full max-w-xs" />
                                <input type="text" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} className="input input-bordered w-full max-w-xs" />
                                <select defaultValue={gender} onChange={(e) => setGender(e.target.value)} className="select">
                                    <option>male</option>
                                    <option>female</option>
                                </select>
                                <input type="text" placeholder="About" value={about} onChange={(e) => setAbout(e.target.value)} className="input input-bordered w-full max-w-xs" />
                                <input type="text" placeholder="photoURL" value={photoURL} onChange={(e) => setPhotoURL(e.target.value)} className="input input-bordered w-full max-w-xs" />

                                {error && <p className="text-red-500 my-3">{error}</p>}
                                <div className="card-actions justify-end mt-4">
                                    <button className="btn btn-primary" onClick={() => saveProfile()} >Save Profile</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <UserCard data={{ firstName, lastName, about, photoUrl: photoURL, age, skills, gender }} />
            </div>
            {showToast && <div className="toast toast-top toast-end">
                <div className="alert alert-success">
                    <span>Profile save successfully.</span>
                </div>
            </div>
            }

        </>

    )
}

export default EditProfile
