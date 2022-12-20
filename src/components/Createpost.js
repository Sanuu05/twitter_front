import React from 'react'
import { useState,useEffect } from 'react'
import {  Row, Col } from 'react-bootstrap'
import { BsImageFill } from 'react-icons/bs'
import { IoSend } from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux'
import { postData } from '../action/main'
function Createpost({res}) {
  const dispatch = useDispatch()
  const [postdata, setpostdata] = useState()
  const [pic, setpic] = useState()
  const [displayimg, setdisplayimg] = useState()
  
  const user = useSelector(state => state.user.user)
  const createpost = () => {
    if (pic) {
      const data = new FormData()
      data.append("file", pic)
      data.append("upload_preset", "insta-clone")
      data.append("cloud_name", "sannu")
      fetch("https://api.cloudinary.com/v1_1/sannu/image/upload", {
        method: "post",
        body: data
      }).then(res =>
        res.json())
        .then(data => {
          dispatch(postData({ body: postdata, photo: data.url }))
        }).catch(err => console.log(err))

    } else {
      dispatch(postData({ body: postdata }))
    }

  }
  const choosepic = (e) => {
    console.log('sss', e.target.files[0]?.type)
    if (e.target.files[0]) {
      setpic(e.target.files[0])
      const render = new FileReader()
      render.onload = () => {
        if (render.readyState === 2) {
          setdisplayimg(render.result)
        }

      }
      render.readAsDataURL(e.target.files[0])
    } else {
      alert('choose suppoeted file')
    }
  }
  useEffect(() => {
    if (res) {
      setpostdata('')
      setdisplayimg('')
    }

  }, [res])


  return (
    <div className='create_post mt-2'>
      <Row>
        <Col sm={{ span: 10, offset: 1 }} md={{ span: 8, offset: 2 }} xl={{ span: 8, offset: 2 }}>
          <div className='create_post_card_main' >
            {
              displayimg? <img src={displayimg} className="img-fluid displayimg" alt='img' />:null
            }
           
            <div className='create_post_card'>
              <img src={user?.profilePic} className='img-fluid' alt='img'  />
              <div className='create_post_card_input'>
                <textarea placeholder='Share your story' value={postdata} maxLength={280} onChange={(e) => setpostdata(e.target.value)} />
                <div className='create_post_card_bottom'>
                  <label className='btn1' htmlFor='profilePicd'><BsImageFill/> Image</label>
                  <input type='file' id='profilePicd' onChange={choosepic}/>
                  <button className='btn2' onClick={createpost}><IoSend /> Send</button>

                </div>

              </div>
            </div>
          </div>

        </Col>
      </Row>
    </div>
  )
}

export default Createpost