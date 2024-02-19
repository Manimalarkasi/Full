import { Stack, TextField,Button } from '@mui/material'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import React from 'react';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function Login() {
    const navigate = useNavigate()
    const initialvalue ={
        mail:'',
        password:'',
    }
    const validationSchema = Yup.object().shape({
        mail:Yup.string().email('Invalid Email Format').matches(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/,'Invalid Email Format').required('!Requied'),
        password:Yup.string().matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,18}$/,'must be start with caps,the password is include uppercase,lowercase,secial case charactor,numbers').required('!Requied'),
    });
    const onsubmit =async(values)=>{
        console.log('form values:',values);
        navigate('/home')
        try{
            const resp= await axios.post('http://localhost:8000/login',values);
            console.log(resp.data);
            console.log(values);
           }catch(error){
             console.error('error is dedected',error);
           }  
        // const loggeduser = JSON.parse(localStorage.getItem("user"));
        //       if(values.mail ===loggeduser.mail && values.password === loggeduser.password){
        //         localStorage.setItem("loggedin: ",true);
        //         navigate("/home");
        //       }else{
        //         alert("wrong Email (or) Password")
        //       }
    }
  return (
    <div>
        <Formik initialValues={initialvalue} validationSchema={validationSchema} onSubmit={onsubmit} validateOnMount>
            {formik =>{
                return(
                    <Form className='form'>
                        <Stack spacing={2} direction={'column'}>
                        <Field as={TextField} label='email' name='mail' required autoFocus className='input'/>
                        <ErrorMessage name='mail'>
                            {err => <span style={{color:'red'}}>{err}</span>}
                        </ErrorMessage>
                        <Field as={TextField} label='password' type='password' name='password' required className='input'/>
                        <ErrorMessage name='password'>
                            {err => <span style={{color:'red'}}>{err}</span>}
                        </ErrorMessage>
                        <Button variant='contained' type='submit' disabled={!formik.isValid}  className='input' >Submit</Button>
                        
                        </Stack>
                    </Form>
                )
            }}
        </Formik>
    </div>
  )
}

export default Login