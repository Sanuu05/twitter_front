import React from 'react'
import { useState } from 'react'
import { Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { IoMdSend } from "react-icons/io"
import { Comment, like,unlike } from '../action/main'
import { useEffect } from 'react'
import { AiFillLike,AiOutlineLike } from 'react-icons/ai'
import { MdOutlineModeComment, MdModeComment,MdCalendarToday } from 'react-icons/md'
import { NavLink } from 'react-router-dom'
function Posts({ val, res }) {
  const dispatch = useDispatch()
  const [comment, setcomment] = useState()
  const [showcomment, setshowcomment] = useState(false)
  useEffect(() => {
    if (res) {
      setcomment('')
    }

  }, [res])
  const user = useSelector(state => state.user.user)
  console.log('vv',val)
  return (
    <Col sm={{ span: 10, offset: 1 }} md={{ span: 8, offset: 2 }} xl={{ span: 8, offset: 2 }} className="my-3">
      <div className='post_card'>
        <div className='post_card_img'>
          {
            val?.photo ? <img src={val?.photo} className='img-fluid' alt='img' /> : null
          }

        </div>
        <div className='post_card_profile'>
          <img src={val?.postedBy?.profilePic} className='img-fluid' alt='img' />
          <NavLink style={{color:'black',textDecoration:'none'}} to={`/user/${val?.postedBy?.email}`} >
          <h4 className='m-0'>{val?.postedBy?.name}</h4>
          </NavLink>
          <p className='m-0'><MdCalendarToday /> {val?.date}</p>
        </div>
        <div className='post_card_text'>
          <p>{val?.body}</p>
        </div>
        <div className='likebtnx'>
        
          <span>{
            
            val?.likes?.includes(user?._id)?<AiFillLike color='#009DF2' onClick={()=>dispatch(unlike({postId:val?._id}))} />:
            <AiOutlineLike onClick={()=>dispatch(like({postId:val?._id}))} />
            
            } 
            {
              val?.likes?.length
            }
            </span>
          
          <span>
          {
            showcomment ? <MdModeComment onClick={() => setshowcomment(false)} />
              :
              <MdOutlineModeComment onClick={() => setshowcomment(true)} />
          }
          {
            val?.comments?.length
          }
          </span>
      

        </div>
        {
          showcomment ?

            <div className='post_card_comment'>
              {
                val?.comments?.map((com, index) => {
                  return <div className='comment'>
                    <img src={com?.postedBy?.profilePic} className='img-fluid' alt='img'/>
                    <div className='comment_main' >
                      <div className='comment_profile'>

                        <h4 className='m-0'>{com?.postedBy?.name}</h4>
                        <p className='m-0'>{com?.date}</p>
                      </div>
                      <p>{com?.text}</p>


                    </div>

                  </div>
                })
              }

              <div className='comment_post'>
                <img src={user?.profilePic} alt='img' className='img-fluid' />
                <input type='text' placeholder='Comment' value={comment} onChange={(e) => setcomment(e.target.value)} />
                <IoMdSend onClick={() => dispatch(Comment({ text: comment, postId: val?._id }))} />
              </div>

            </div> : null}
      </div>
    </Col>
  )
}

export default Posts