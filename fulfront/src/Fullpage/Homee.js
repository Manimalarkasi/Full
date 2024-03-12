import { Button } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';


function Homee() {
    const navigate = useNavigate()
  const logout =() =>{
    localStorage.removeItem("loggedin")
    navigate('/')
  }
  const username = JSON.parse( localStorage.getItem("user"));
  return (
    <div className='home'>Homee
        <h4>welcome - {username.name}</h4>
        <Button variant='contained' onClick={logout}>logout</Button>
    </div>
  )
}

export default Homee