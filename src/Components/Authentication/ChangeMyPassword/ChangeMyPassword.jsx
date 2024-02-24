import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from "yup"




export default function ChangeMyPassword() {
  
  const [successMsg, setSuccessMsg]= useState("")
  const[isLoading, setIsLoading]= useState(false)
  const navigate= useNavigate()


async function changeMyPassword() {
    setIsLoading(true);
    const { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/users/changeMyPassword", values,
    {
      headers:{
        token: localStorage.getItem("token")
      }
    });
    setSuccessMsg(data.message);
    navigate("/login")
    setIsLoading(false);
 
  }
  
 
const validationSchema = Yup.object({
  currentPassword:Yup.string().required("Your Password is required").matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/, "Invalid password"),
  password : Yup.string().required("Password is required").matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/, "Invalid password"),
  rePassword: Yup.string().required("rePassword is required").oneOf([Yup.ref("password")]),
 

})

const {values, handleSubmit, handleChange, handleBlur, errors, touched, isValid} = useFormik({
  initialValues: {
    currentPassword:"",
  password:"",
  rePassword:""
  }, 
  onSubmit: changeMyPassword, 
  validationSchema : validationSchema
})


  return <>
   
   <div className="w-75 m-auto my-5">
      <h1 className='text-center my-5'>Forget Password</h1>
   

      <div>
      <form className='row form-control py-4' onSubmit={handleSubmit}> 
      <div>

      <label htmlFor="currentPassword" className='my-2 inputs fw-bold'>Current Password:</label>
        <input value={values.currentPassword} onChange={handleChange} onBlur={handleBlur} type="password" className='form-control mb-3 inputs fw-bold' id='currentPassword' name='currentPassword' />
        {errors.currentPassword && touched.currentPassword && <p className='alert alert-danger'>{errors.currentPassword}</p>}
      
      <label htmlFor="password" className='my-2 inputs fw-bold'>Password:</label>
        <input value={values.password} onChange={handleChange} onBlur={handleBlur} type="password" className='form-control mb-3 inputs fw-bold' id='password' name='password' />
        {errors.password && touched.password && <p className='alert alert-danger'>{errors.password}</p>}

        <label htmlFor="rePassword" className='my-2 inputs fw-bold'>RePassword:</label>
        <input value={values.rePassword} onChange={handleChange} onBlur={handleBlur} type="password" className='form-control mb-3 inputs fw-bold' id='rePassword' name='rePassword' />
        {errors.rePassword && touched.rePassword && <p className='alert alert-danger'>{errors.rePassword}</p>}

        {isLoading ? 
          <button disabled type='button' className='btn bg-main px-4 text-white ms-auto d-block'> <i className='fas fa-spin fa-spinner'></i> </button>
         :
          <button type='submit'  className='btn  bg-main px-3 text-white ms-auto d-block fw-bold'>Confirm</button>

        }
      
       </div>
    
        
       
        
        </form>
        </div>
     
      </div>
        
   
  </>
}
