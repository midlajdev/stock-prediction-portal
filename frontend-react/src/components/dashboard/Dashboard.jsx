import React,{useEffect} from 'react'
import axios from 'axios'
import axiosInstance from '../../axiosinstance'

export const Dashboard = () => {
    useEffect(() =>{
        const fetchProtectedData = async () =>{
            try{
                const response = await axiosInstance.get('/protected-view/')
                console.log('success:', response.data)
            }catch(error){
                console.error('Error Fetching Data:', error)
            }
        }
        fetchProtectedData();
    }, [])
  return (
    <div className='text-light'>Dashboard</div>
  )
}
