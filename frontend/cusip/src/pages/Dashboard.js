import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
    const navigate = useNavigate()
    const {user} = useSelector((state) => state.auth)

    if  (!user){
        return navigate('/pages/login')
    }
  return (
    <div>Dashboard</div>
  )
}

export default Dashboard