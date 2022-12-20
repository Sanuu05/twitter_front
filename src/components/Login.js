import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { reset, userLogin, userSignup } from '../action/main'
import img1 from './images/login.png'
import img2 from './images/signup.png'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Login() {
    const [data, setdata] = useState({
        name: '', email: '', password: '', cpassword: ''
    })
    const [resets, setreset] = useState(false)
    const [login, setlogin] = useState(true)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const usertoken = useSelector(state => state.user.token)
    const error = useSelector(state => state.user.error)
    const signin = useSelector(state => state.user.signin)
    const resetres = useSelector(state => state.response.reset)

  
    const loginpost = (e) => {
        e.preventDefault()
        dispatch(userLogin(data))
    }
    useEffect(() => {
        if (usertoken) {
            navigate('/')
        }

    }, [usertoken,navigate])

    useEffect(() => {
        if (signin) {
            toast.success('Registration Sucessfully')
            setlogin(true)
        }
        if (resetres) {
            toast.success('Reset link has been send to your email id')
            setreset(false)
        }

    }, [signin,resetres])
    const signup = (e) => {
        e.preventDefault()
        dispatch(userSignup(data))
    }
    const resetfun = (e) => {
        e.preventDefault()
        dispatch(reset({ email: data.email }))
    }
    useEffect(() => {
        if (error) {
            toast.error(error)
        }

    }, [error])
    return (
        <div className='signup'>
            <Container >

                <Row className='signcard'>

                    <Col md={{ span: 8, offset: 2 }} sm={{ span: 10, offset: 1 }} xl={{ span: 8, offset: 2 }}>
                        <div className='signcardmain'>
                            {
                                login ? <Row>
                                    <Col sm={12} md={6} xl={6}>
                                        <img src={img1} className='img-fluid' alt='img' />

                                    </Col>
                                    <Col sm={12} md={6} xl={6}>
                                        <h3 className='text-center'>Login</h3>
                                        <form onSubmit={resets ? resetfun : loginpost} autoComplete='OFF'>

                                            <input type='email' placeholder='Email' value={data.email} onChange={(e) => setdata({ ...data, email: e.target.value })} />
                                            {
                                                resets ? null : <input type='password' placeholder='Password' value={data.password} onChange={(e) => setdata({ ...data, password: e.target.value })} />
                                            }

                                            <button type='submit'>{resets ? "Reset" : "Login"}</button>

                                            {
                                                resets?<p>Want to go back to login?<span onClick={() => setreset(false)}>Login</span></p>:
                                                <>
                                                 <p>Forgot Password?<span onClick={() => setreset(true)}>Reset</span></p>
                                            <p>If you have no sign up yet!<span onClick={() => setlogin(false)}>Sign Up</span></p>
                                                </>

                                            }
                                           
                                        </form>

                                    </Col>
                                </Row> :
                                    <Row>
                                        <Col sm={12} md={6} xl={6}>
                                            <img src={img2} className='img-fluid' alt='img' />

                                        </Col>
                                        <Col sm={12} md={6} xl={6}>
                                            <h3 className='text-center'>Signup</h3>
                                            <form onSubmit={signup} autoComplete='OFF'>
                                                <input type='text' placeholder='Name' value={data.name} onChange={(e) => setdata({ ...data, name: e.target.value })} />
                                                <input type='email' placeholder='Email' value={data.email} onChange={(e) => setdata({ ...data, email: e.target.value })} />
                                                <input type='password' placeholder='Password' value={data.password} onChange={(e) => setdata({ ...data, password: e.target.value })} />
                                                <input type='password' placeholder='Confirm Password' value={data.cpassword} onChange={(e) => setdata({ ...data, cpassword: e.target.value })} />
                                                <button type='submit'>SignUp</button>
                                                <p>If you have already sign in!<span onClick={() => setlogin(true)}>Sign In</span></p>

                                            </form>

                                        </Col>
                                    </Row>
                            }



                        </div>

                    </Col>



                </Row>

            </Container>
            <ToastContainer />
        </div>

    )
}

export default Login