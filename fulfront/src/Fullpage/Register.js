import { Button, Stack, TextField, Typography } from '@mui/material'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import React from 'react';
import './register.css';
import * as Yup from 'yup';
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';


function Register() {
  const navigate = useNavigate();
  const initialvalue ={
    name:'',
    empid:'',
    mail:'',
    password:'',
    cpassword:'',
    phoneno:'',
  }
  const validationshema = Yup.object().shape({
    name:Yup.string().max(20,'it exeed charactors').matches(/^[a-zA-Z ]*$/,'only Charactors').required('!Requied'),
    empid:Yup.mixed().required('!Requied'),
    mail:Yup.string().email('Invalid Email Format').matches(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/,'Invalid Email Format').required('!Requied'),
    password:Yup.string().matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,18}$/,
    'must be start with caps,the password is include uppercase,lowercase,secial case charactor,numbers').required('!Requied'),
    cpassword:Yup.string().oneOf([Yup.ref("password")],'this password is not match').required('!Requied'),
    phoneno:Yup.string('only numbers').matches(/^[0-9]{10}$/)
  })
  const onsubmit = async (values,onsubmitprops)=>{
    console.log("form values:",values);
    onsubmitprops.resetForm();
    try{
      const resp= await axios.post('http://localhost:8000/regi',values);
      console.log(resp.data);
      console.log(values);
     }catch(error){
       console.error('error is dedected',error);
     }  
    localStorage.setItem("user",JSON.stringify(values));
    navigate('/login');
  }
  return (
    <div className='regi'>
      <Formik initialValues={initialvalue} validationSchema={validationshema} onSubmit={onsubmit} validateOnMount >
      {formik =>{
        return(
          <Form className='form'>
         <Stack spacing={2} direction={'column'} >
          <h2>REGISTRATION :</h2>
          <Field as={TextField} type='text' label='name' name='name' required autoFocus className='input' />
          <ErrorMessage name='name'>
            {err => <span style={{color:'red'}}>{err} </span>}
          </ErrorMessage>

          <Field as={TextField} type='text' label='empid' name='empid' required className='input' />
          <ErrorMessage name='empid'>
            {err => <span style={{color:'red'}}>{err} </span>}
          </ErrorMessage>

          <Field as={TextField} type='emali' label='mail' name='mail' required className='input' />
          <ErrorMessage name='mail'>
            {err => <span style={{color:'red'}}>{err} </span>}
          </ErrorMessage>

          <Field as={TextField} type='password' label='password' name='password' required className='input' />
          <ErrorMessage name='password'>
            {err => <span style={{color:'red'}}>{err} </span>}
          </ErrorMessage>

          <Field as={TextField} type='password' label='cpassword' name='cpassword' required className='input' />
          <ErrorMessage name='cpassword'>
            {err => <span style={{color:'red'}}>{err} </span>}
          </ErrorMessage>

          <Field as={TextField} type='tel' label='phoneno' name='phoneno' required className='input' />
          <ErrorMessage name='phoneno'>
            {err => <span style={{color:'red'}}>{err} </span>}
          </ErrorMessage>
          <Button variant='contained' type='submit' disabled={!formik.isValid} className='input' >Submit</Button>
          <Typography style={{marginLeft:'160px'}}>
            <NavLink to={'/login'}>Login</NavLink>
          </Typography>
         </Stack>
         </Form>
        )
      }}
      </Formik>
    </div>
  )
}

export default Register