import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { Col, Container, Row, Modal } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { NavLink, useParams } from 'react-router-dom'
import { followUser, getUser, unfollowUser, GetPostByUser } from '../action/main'
import Posts from './Posts'
function Useraccount({updateProfile,update}) {

    const [heading, setheading] = useState()
    const [follower,setfollower] =useState(false)
    const [show, setShow] = useState(false);
    const { id } = useParams()
    const dispatch = useDispatch()
    const handleClose = () => setShow(false);
    const userdarta = useSelector(state => state.getuser.user)
    const user = useSelector(state => state.user.user)
   
    useEffect(() => {
        dispatch(getUser(id))
        dispatch(GetPostByUser(id))
        
    }, [id,dispatch,updateProfile,update])

    const myposts = useSelector(state => state.getposts.peruser)
   



    return (
        <div className='myaccount mtop'>

            <Container>
                <Row>
                    <Col sm={{ span: 12, offset: 0 }} md={{ span: 8, offset: 2 }}>
                        <div className='top_part'>

                            <div className='top_part_left'>
                                <div>
                                <img src={userdarta?.profilePic} className='img-fluid' alt='profile'/>
                                </div>
                                <p>{userdarta?.bio}</p>
                                

                            </div>
                            <div className='top_part_right'>
                                <div className='top_part_right_top'>
                                    <h2>{userdarta?.name}</h2>
                                    <p>{userdarta?.email}</p>
                                </div>
                                <div className='top_part_right_bottom'>
                                    <div>
                                        <h4 className='m-0'>{myposts?.length}</h4>
                                        <p className='m-0'>Posts</p>

                                    </div>
                                    <div onClick={() => {
                                        setfollower(true)
                                        setShow(true)
                                        setheading('Followers')
                                    }}>
                                        <h4 className='m-0'>{userdarta?.followers?.length}</h4>
                                        <p className='m-0'>Followers</p>

                                    </div>
                                    <div onClick={() => {
                                         setfollower(false)
                                        setShow(true)
                                        setheading('Following')
                                    }}>
                                        <h4 className='m-0'>{userdarta?.following?.length}</h4>
                                        <p className='m-0'>Following</p>

                                    </div>
                                </div>
                                <div>
                                    {userdarta._id===user?._id?null:
                                        userdarta?.followers?.find(p => p._id === user._id) ?
                                            <button onClick={() => dispatch(unfollowUser({ followId: userdarta?._id }))} className='follow'>Unfollow</button> :
                                            <button onClick={() => dispatch(followUser({ followId: userdarta?._id }))} className='follow'>Follow</button>
                                    }

                                </div>

                            </div>
                        </div>

                    </Col>
                </Row>
                <Row>
                    {
                        myposts.map((val, i) => {
                            return <Posts val={val} />
                        })
                    }
                </Row>

            </Container>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{heading}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {follower?
                        userdarta.followers?.map((val, index) => {
                            
                            return <div className='modal_list'>
                                <NavLink to={`/user/${val?.email}`} style={{ color: 'black', textDecoration: 'none' }} onClick={() => setShow(false)}>
                                    <div className='modal_list_main'>
                                        <div>
                                            <img src={val?.profilePic} className='img-fluid' alt='profile'/>
                                        </div>
                                        <div className='modal_list_right'>
                                            <h4 className='m-0'>{val?.name}</h4>
                                            <p className='m-0'>{val?.followers?.length} Followers</p>

                                        </div>


                                    </div>
                                </NavLink>
                                
                               
                                { val?._id===user?._id?null:
                                    val?.followers?.includes(user?._id) ? <button onClick={() => dispatch(unfollowUser({ followId: val?._id }))}>Following</button> : <button onClick={() => dispatch(followUser({ followId: val?._id }))}>Follow</button>
                                }



                            </div>
                            

                        }): userdarta.following?.map((val, index) => {
                            
                            return <div className='modal_list'>
                                <NavLink to={`/user/${val?.email}`} style={{ color: 'black', textDecoration: 'none' }} onClick={() => setShow(false)}>
                                    <div className='modal_list_main'>
                                        <div>
                                            <img src={val?.profilePic} className='img-fluid' alt='profile'/>
                                        </div>
                                        <div className='modal_list_right'>
                                            <h4 className='m-0'>{val?.name}</h4>
                                            <p className='m-0'>{val?.followers?.length} Followers</p>

                                        </div>


                                    </div>
                                </NavLink>
                                
                               
                                { val?._id===user?._id?null:
                                    val?.followers?.includes(user?._id) ? <button onClick={() => dispatch(unfollowUser({ followId: val?._id }))}>Following</button> : <button onClick={() => dispatch(followUser({ followId: val?._id }))}>Follow</button>
                                }



                            </div>
                            

                        })
                    }
                
                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
            </Modal>

        </div>
    )
}

export default Useraccount