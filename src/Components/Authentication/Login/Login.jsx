import axios from 'axios';
import { useFormik } from 'formik';
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup  from "yup"
import { authContext } from '../../../contexts/AuthContext';



export default function Login() {
  
  const [errorMsg, setErrorMsg]= useState("")
  const[isLoading, setIsLoading]= useState(false)
  const navigate= useNavigate()
  const {userIsLoggedIn, setUserIsLoggedIn} = useContext(authContext)

const validationSchema = Yup.object({
  email:Yup.string().required("Email is required").matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, "Email is invalid"),
  password : Yup.string().required("Password is required").matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/, "Invalid password"),
 
})

const {values, handleSubmit, handleChange, handleBlur, errors, touched, isValid} = useFormik({
  initialValues: {
    email:"",
    password:"",

  }, 
  onSubmit:async ()=>{
    setErrorMsg("")
    try {
      setIsLoading(true)
      const {data} = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin", values)
     if(data.message== 'success'){
      setUserIsLoggedIn(true)
      localStorage.setItem('token', data.token)
    if(window.location.pathname == "/login"){
      navigate("/home")
    }else{
      navigate(window.location.pathname)
    }
     }
     } catch (error) {
      setErrorMsg(error.response.data.message)
     
     }
     setIsLoading(false)
  }, 
  validationSchema : validationSchema
})

  return <>
    <div className="w-75 m-auto my-5">
      <h1>Login Now :</h1>
      <form onSubmit={handleSubmit}>
        
        <label htmlFor="email" className='my-1'>Email:</label>
        <input value={values.email} onChange={handleChange} onBlur={handleBlur} type="email" className='form-control mb-3' id='email' name='email' />
        {errors.email && touched.email && <p className='alert alert-danger'>{errors.email}</p>}
 
        <label htmlFor="password" className='my-1'>Password:</label>
        <input value={values.password} onChange={handleChange} onBlur={handleBlur} type="password" className='form-control mb-3' id='password' name='password' />
        {errors.password && touched.password && <p className='alert alert-danger'>{errors.password}</p>}
       <div className='d-flex justify-content-between'>
    
       <div>
       {isLoading ? 
          <button disabled type='button' className='btn bg-main px-4 text-white ms-auto d-block'> <i className='fas fa-spin fa-spinner'></i> </button>
         :
          <button type='submit' disabled={!isValid || isLoading} className='btn bg-main px-3 text-white ms-auto d-block'>Login</button>

        }
       </div>
        <div>
        <Link to={"/forgetpassword"}  className='text-white'>Forget Password</Link>
        </div>
       </div>
       
        
        </form>
        
    </div>
  </>
}
