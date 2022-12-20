import React, { useEffect, useState } from 'react'
import $ from 'jquery'
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {  Logout } from '../action/main';
import { IoSearch } from 'react-icons/io5'
import img1 from '../components/images/logo.png'



function Navbar() {
    const [change, setchange] = useState(false)
    const [menu, setmenu] = useState(false)

    const dispatch = useDispatch()
    const [searchdata, setsearchdata] = useState([])
    const [searchval,setsearchval] =useState()

    const alluser = useSelector(state => state?.getuser?.alluser)
    const user = useSelector(state => state.user.user)
    const search = (e) => {
        setsearchdata(e.target.value)
        if(e.target.value){
            const newlist = alluser.filter((con) => {
                return Object.values(con).join(" ").toLowerCase().includes(e.target.value.toLowerCase())
            })
            setsearchdata(newlist)
        }else{
            setsearchdata([])
        }
      

    }
  
    useEffect(() => {

        $('.menu-btn').click(function () {

            if (menu === true) {
                $('.menu-btn').addClass('open')
                $('.right_nav').addClass('cmenu')

            } else {
                $('.menu-btn').removeClass('open')
                $('.right_nav').removeClass('cmenu')

            }

        })



        $('.mbtn').click(function () {
            $('.right_nav').addClass('cmenu')
            $('.mbtn').addClass('mbtn2')
        })
        $('.xbtm').click(function () {
            $('.right_nav').removeClass('cmenu')
            $('.mbtn').addClass('mbtn2')
        })
        $('ul li').click(function () {
            $('.right_nav').removeClass('cmenu')
            $('.menu-btn').removeClass('open')

        })
        const sections = document.querySelectorAll('section')
        const navli = document.querySelectorAll('nav ul li')
        window.addEventListener('scroll', () => {
            let current = "";
            sections.forEach(section => {
                const sectop = section.offsetTop;
                if (window.pageYOffset > sectop) {
                    current = section.getAttribute('id')
                }
            })
            navli.forEach(li => {
                li.classList.remove('active');
                if (li.classList.contains(current)) {
                    li.classList.add('active')
                }
            })



        })
        const changenav = () => {
            if (window.scrollY > 100) {
                setchange(true)

            }
            else {
                setchange(false)
            }
        }
        window.addEventListener('scroll', changenav)

    })

  








    // console.log("kk", change)
    return (
        <nav>
            <div className={change ? "nav shadow navbar  act fixed-top " : "nav  navbar fixed-top"}>
                <div className="navbarr">

                    <div className="left_nav">
                        <NavLink to="/">
                       
                            <img src={img1} className='img-fluid' style={{width:70}} />
                        </NavLink>
                    </div>

                    <div className='search'>
                        <div className='search_main'>
                            <input type='text' value={searchval} placeholder='Search User' onChange={search} />
                            <IoSearch />

                        </div>
                        {searchdata.length>0?
                        <div className='search_data'>
                            {
                                searchdata?.map((val, i) => {
                                    if(val?._id!==user?._id){
                                    return <div className='modal_list'>
                                        <NavLink to={`/user/${val?.email}`} onClick={()=>{
                                            setsearchdata([])
                                            setsearchval('')
                                            }}  style={{textDecoration:'none',color:'black'}}>
                                    <div className='modal_list_main'>
                                    <div>
                                        <img src={val?.profilePic} className='img-fluid' alt='profile' />
                                    </div>
                                    <div className='modal_list_right'>
                                        <h4 className='m-0'>{val?.name}</h4>
                                        <p className='m-0' style={{color:'grey'}}>{val?.email}</p>
    
                                    </div>
                                    
    
                                    </div>
                                    </NavLink>
                                   
                                    
                                  
    
                                </div>
                                    }
                                })
                            }

                        </div>:null
}
                    </div>


                    <div className="right_nav">

                        <div className="snav">
                            <ul>
                                <li className="homee active navitem"><NavLink to="/">Home</NavLink></li>
                                <li className="services navitem"><NavLink to="/allposts">ALL-POSTS</NavLink></li>
                                <li className="services navitem"><NavLink to="/Myaccount">My-Account</NavLink></li>
                                <li className="skill navitem"><a style={{color:'red'}} onClick={() => dispatch(Logout())}>Logout</a></li>


                            </ul>
                        </div>



                        <div class="menu-btn" onClick={() => setmenu(!menu)}>
                            <div class={change ? "menu-btn__burgerone" : "menu-btn__burger"} ></div>
                        </div>

                    </div>
                </div>

            </div>

        </nav>

    )
}


export default Navbar
