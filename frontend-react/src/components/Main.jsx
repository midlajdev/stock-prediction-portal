import React, {useContext} from 'react'
import '../assets/css/style.css'
import { Header } from './header'
import { Footer } from './footer'
import { Button } from './Button'
import {AuthContext} from '../AuthProvider' 

export const Main = () => {
  const {isLoggedIn, setIsLoggedIn} = useContext(AuthContext)

  return (
    <>
        <div className='container'>
            <div className='p-5 text-center bg-light-dark rounded'>
              <h1 className='text-light'>Stock Prediction Portal</h1>
              <p className='text-light lead'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages.</p>
              {isLoggedIn ? (
                <Button text='Explore Now' class='btn-info' url='/dashboard' />
              ):(
                <Button text='Explore Now' class='btn-info' url='/login' />
              )
              }
			</div>
        </div>
    </>
  )
}
