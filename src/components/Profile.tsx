import { useSelector } from "react-redux";
import EditProfile from "./EditProfile"


const Profile = () => {
  const user = useSelector((store:any)=> store.user);
  return (
    <>
      {user && <EditProfile user={user} />}
    </>
  )
}

export default Profile
