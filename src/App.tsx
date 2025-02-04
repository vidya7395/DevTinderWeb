import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Body from './Body';
import Login from './components/Login';
import Profile from './components/Profile';
import Feed from './components/Feed';
import Connections from './components/Connections';
import RequestReceived from './components/RequestReceived';
import Premium from './components/Premium';
function App() {
  return (
    <>

      <BrowserRouter basename='/'>
        <Routes>
          <Route path='/' element={<Body/>} >
          <Route path='/' element={<Feed/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/profile' element={<Profile/>}></Route>
          <Route path='/connections' element={<Connections/>}></Route>
          <Route path='/request-received' element={<RequestReceived/>}></Route>
          <Route path='/premium' element={<Premium/>}></Route>
          </Route>
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
