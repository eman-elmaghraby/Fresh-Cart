import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from "yup"




export default function ForgetPassword() {
  
  const [successMsg, setSuccessMsg]= useState("")
  const[isLoading, setIsLoading]= useState(false)
  const navigate= useNavigate()


async function forgetPassword() {
    setIsLoading(true);
    const { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords", values);
    setSuccessMsg(data.message);
    navigate("/verifyresetcode")
    setIsLoading(false);
 
  }
  
 
const validationSchema = Yup.object({
  email:Yup.string().required("Email is required").matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, "Email is invalid"),



})

const {values, handleSubmit, handleChange, handleBlur, errors, touched, isValid} = useFormik({
  initialValues: {
    email:"",
  
  }, 
  onSubmit: forgetPassword, 
  validationSchema : validationSchema
})


  return <>
   
   <div className="w-75 m-auto my-5">
      <h1 className='text-center my-5'>Forget Password</h1>
   

      <div>
      <form className='row form-control py-4' onSubmit={handleSubmit}> 
      <div>
       <label htmlFor="email" className='my-3 inputs fw-bold'>Email:</label>
        <input value={values.email} onChange={handleChange} onBlur={handleBlur} type="email" className='form-control mb-3 inputs fw-bold' id='email' name='email' />
        {errors.email && touched.email && <p className='alert alert-danger inputs fw-bold'>{errors.email}</p>}
 
        {isLoading ? 
          <button disabled type='button' className='btn bg-main px-4 text-white ms-auto d-block'> <i className='fas fa-spin fa-spinner'></i> </button>
         :
          <button type='submit'  className='btn  bg-main px-3 text-white ms-auto d-block fw-bold'>Next</button>

        }
      
       </div>
    
        
       
        
        </form>
        </div>
     
      </div>
        
   
  </>
}
