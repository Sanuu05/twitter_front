import React from 'react'
import { useEffect } from 'react'
import { Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getpostData } from '../action/main'
import Posts from './Posts'
function Allposts({update}) {
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getpostData())

    },[update])
    const posts = useSelector(state => state.getposts.user)
  return (
    <div className='mtop'>
      <Container>
      {
            posts?.map((val,i)=>{
              return  <Posts val={val} res={update} />
            })
          }
      </Container>
        
        
    </div>
  )
}

export default Allposts