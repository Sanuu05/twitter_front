import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Col, Container, Row, Modal } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getmytData, followUser, unfollowUser } from '../action/main'
import Createpost from './Createpost'
import Posts from './Posts'
import { NavLink } from 'react-router-dom'
import { AiFillEdit } from 'react-icons/ai'
import { Updatedp } from '../action/main'

function Myaccount({ update, updateProfile }) {

    const [heading, setheading] = useState()
    const [show, setShow] = useState(false);
    const [follower, setfollower] = useState(false)
    const dispatch = useDispatch()
    const handleClose = () => setShow(false);
    const userdarta = useSelector(state => state.user.user)

    useEffect(() => {
        dispatch(getmytData())

    }, [update, dispatch, updateProfile])
    const myposts = useSelector(state => state.getmyposts.user)

    const updatedp = (e) => {
        if (e.target.files[0]) {
            const data = new FormData()
            data.append("file", e.target.files[0])
            data.append("upload_preset", "insta-clone")
            data.append("cloud_name", "sannu")
            fetch("https://api.cloudinary.com/v1_1/sannu/image/upload", {
                method: "post",
                body: data
            }).then(res =>
                res.json())
                .then(data => {
                    dispatch(Updatedp({ profilePic: data.url }))
                }).catch(err => console.log(err))

        }

    }

    const Editdiv = () => {
        const [show, setShow] = useState(false);
        const [user,setuser] = useState({
            name:"",bio:""
        })
        const [pic,setpic] = useState()
        const [displayimg,setdisplayimg] = useState()
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
        useEffect(()=>{
            setuser({...user,name:userdarta?.name,bio:userdarta?.bio})
            setdisplayimg(userdarta?.profilePic)
            
        },[updateProfile])

        const dispatch = useDispatch()
        const handleClose = () => setShow(false);
        const savedata = () =>{
            
            if(pic){
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
                        dispatch(Updatedp({ profilePic: data.url,name:user?.name,bio:user?.bio }))
                    }).catch(err => console.log(err))

            }else{
                dispatch(Updatedp({name:user?.name,bio:user?.bio }))
            }
        }
        return (
            <>
                <AiFillEdit style={{ fontSize: 25 }} onClick={() => setShow(true)} />
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                <img src={displayimg} className='img-fluid' alt='img' style={{ width: 150, height: 150, objectFit: 'contain' }} />
                                <label htmlFor='profilePicd1' style={{ fontSize: 18, cursor: 'pointer' }}>Change Profile Pic</label>
                                <input type='file' id='profilePicd1' onChange={choosepic}/>
                            </div>
                            <div style={{display:'flex',flexDirection:'column'}}>

                                <label>Name</label>
                                <input type="text" placeholder='Name' value={user.name} onChange={(e)=>setuser({...user,name:e.target.value})} />
                                <label>Bio</label>
                                <textarea placeholder='Bio' value={user.bio} onChange={(e)=>setuser({...user,bio:e.target.value})} />
                                <button style={{border:'none',backgroundColor:'orangered',color:'white',margin:"10px 0"}} onClick={savedata}>Save</button>
                            </div>
                        </div>

                    </Modal.Body>
                    <Modal.Footer>
                    </Modal.Footer>
                </Modal>
            </>
        )
    }

    return (
        <div className='myaccount mtop'>
            <Container>
                <Row>
                    <Col sm={{ span: 12, offset: 0 }} md={{ span: 8, offset: 2 }}>
                        <div className='top_part'>

                            <div className='top_part_left'>
                                <div>

                                    {/* <label htmlFor='profilePic'> <AiFillEdit /></label>
                                    <input type='file' id='profilePic' onChange={updatedp} /> */}
                                    <img src={userdarta?.profilePic} className='img-fluid' alt='img' />
                                    

                                </div>
                                <p>{userdarta?.bio}</p>


                            </div>
                            <div className='top_part_right'>
                                <div className='top_part_right_top'>

                                    <h2>{userdarta?.name} <Editdiv /></h2>
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

                            </div>
                        </div>

                    </Col>
                </Row>
                <Row className='mt-5'>
                    <Createpost res={update} />
                </Row>
                <Row>
                    {
                        myposts?.map((val, i) => {
                            return <Posts val={val} res={update} />
                        })
                    }
                </Row>

            </Container>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{heading}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {follower ?
                        userdarta.followers?.map((val, index) => {

                            return <div className='modal_list'>
                                <NavLink to={`/user/${val?.email}`} style={{ color: 'black', textDecoration: 'none' }} onClick={() => setShow(false)}>
                                    <div className='modal_list_main'>
                                        <div>
                                            <img src={val?.profilePic} className='img-fluid' alt='profile' />
                                        </div>
                                        <div className='modal_list_right'>
                                            <h4 className='m-0'>{val?.name}</h4>
                                            <p className='m-0'>{val?.followers?.length} Followers</p>

                                        </div>


                                    </div>
                                </NavLink>


                                {val?._id === userdarta?._id ? null :
                                    val?.followers?.includes(userdarta?._id) ? <button onClick={() => dispatch(unfollowUser({ followId: val?._id }))}>Following</button> : <button onClick={() => dispatch(followUser({ followId: val?._id }))}>Follow</button>
                                }



                            </div>


                        }) : userdarta.following?.map((val, index) => {

                            return <div className='modal_list'>
                                <NavLink to={`/user/${val?.email}`} style={{ color: 'black', textDecoration: 'none' }} onClick={() => setShow(false)}>
                                    <div className='modal_list_main'>
                                        <div>
                                            <img src={val?.profilePic} className='img-fluid' alt='profile' />
                                        </div>
                                        <div className='modal_list_right'>
                                            <h4 className='m-0'>{val?.name}</h4>
                                            <p className='m-0'>{val?.followers?.length} Followers</p>

                                        </div>


                                    </div>
                                </NavLink>


                                {val?._id === userdarta?._id ? null :
                                    val?.followers?.includes(userdarta?._id) ? <button onClick={() => dispatch(unfollowUser({ followId: val?._id }))}>Following</button> : <button onClick={() => dispatch(followUser({ followId: val?._id }))}>Follow</button>
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

export default Myaccount