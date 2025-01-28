import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar'

const Body = () => {
  return (
    <>
      <Navbar />
      <div className='p-5'>
        <Outlet/>
      </div>
    </>
    //Now we will create children routes
  )
}

export default Body
