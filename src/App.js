import React from "react";
import { Route, Routes, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from "react";
import { getallUser, loadUser } from "./action/main";
import { useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Myaccount from "./components/Myaccount";
import Useraccount from "./components/Useraccount";
import Login from "./components/Login";
import Pusher from 'pusher-js'
import Allposts from "./components/Allposts";
function App() {
  const dispatch = useDispatch()
  const [update, setupdate] = useState()
  const [updateProfile, setupdateProfile] = useState()
  const navigate = useNavigate()
  const usertoken = useSelector(state => state.user.token)
  const updateresponse = useSelector(state => state.response.updated)
  
  useEffect(() => {
    dispatch(loadUser())
    dispatch(getallUser())
    if (usertoken) {

    } else {
      navigate('/login')
    }

  }, [usertoken,dispatch,navigate,updateresponse,updateProfile])




  useEffect(() => {
      const pusher = new Pusher('335b9707e790a4d59bbe', {
          cluster: 'ap2'
      });

      const channel = pusher.subscribe('messages');
      channel.bind('updated', function (data) {
          setupdate((data))



      });
      const channeln = pusher.subscribe('username');
      channeln.bind('posted', function (data) {
          setupdate((data))



      });
      const channeluser = pusher.subscribe('usernames');
      channeluser.bind('userposted', function (data) {
          setupdateProfile((data))



      });
      const channelnew = pusher.subscribe('usermessages');
      channelnew.bind('userupdated', function (data) {
          setupdateProfile((data))



      });

  }, [])
console.log('update',update)
  return (
    <div>
    
      <Routes>
      <Route path='/' element={<>
        <Navbar />
        <Home update={update}  />
      </>} />
      <Route path='/allposts' element={<>
        <Navbar />
        <Allposts update={update}  />
      </>} />
      <Route path='/myaccount' element={<>
        <Navbar />
        <Myaccount update={update} updateProfile={updateProfile}  />
      </>} />
      <Route path='/user/:id' element={
        <>
          <Navbar />
          <Useraccount update={update} updateProfile={updateProfile}  />
        </>
      } />
      <Route path='/login' element={<Login />} />
 

      </Routes>
    </div>
  )
}


export default App;
