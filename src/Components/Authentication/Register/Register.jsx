import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup  from "yup"

export default function Register() {
  
  const [errorMsg, setErrorMsg]= useState("")
  const[isLoading, setIsLoading]= useState(false)
  const navigate= useNavigate()

const validationSchema = Yup.object({
  name:Yup.string().required("Name is required").min(3, "Min length must be 3 characters").max(20,"Max length must be 20 characters" ),
  email:Yup.string().required("Email is required").matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, "Email is invalid"),
  password : Yup.string().required("Password is required").matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/, "Invalid password"),
  rePassword: Yup.string().required("rePassword is required").oneOf([Yup.ref("password")]),
  phone: Yup.string().required("Phone is required").matches(/^01[0125][0-9]{8}$/)
})

const {values, handleSubmit, handleChange, handleBlur, errors, touched, isValid} = useFormik({
  initialValues: {
    name:"",
    email:"",
    password:"",
    rePassword:"",
    phone:""
  }, 
  onSubmit:async ()=>{
    setErrorMsg("")
    try {
      setIsLoading(true)
      const {data} = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup", values)
     if(data.message== 'success'){
      navigate("/login")
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
      <h1>Register Now :</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name" className='my-1'>Name:</label>
        <input value={values.name} onChange={handleChange} onBlur={handleBlur} type="text" className='form-control mb-3' id='name' name='name' />
        {errors.name && touched.name && <p className='alert alert-danger'>{errors.name}</p>}
          
        <label htmlFor="email" className='my-1'>Email:</label>
        <input value={values.email} onChange={handleChange} onBlur={handleBlur} type="email" className='form-control mb-3' id='email' name='email' />
        {errors.email && touched.email && <p className='alert alert-danger'>{errors.email}</p>}
 
        <label htmlFor="password" className='my-1'>Password:</label>
        <input value={values.password} onChange={handleChange} onBlur={handleBlur} type="password" className='form-control mb-3' id='password' name='password' />
        {errors.password && touched.password && <p className='alert alert-danger'>{errors.password}</p>}

        <label htmlFor="rePassword" className='my-1'>RePassword:</label>
        <input value={values.rePassword} onChange={handleChange} onBlur={handleBlur} type="password" className='form-control mb-3' id='rePassword' name='rePassword' />
        {errors.rePassword && touched.rePassword && <p className='alert alert-danger'>{errors.rePassword}</p>}

        <label htmlFor="phone" className='my-1'>phone:</label>
        <input value={values.phone} onChange={handleChange} onBlur={handleBlur} type="tel" className='form-control mb-3' id='phone' name='phone' />
        {errors.phone && touched.phone && <p className='alert alert-danger'>{errors.phone}</p>}

        {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}
        
        {isLoading ? 
          <button disabled type='button' className='btn bg-main px-4 text-white ms-auto d-block'> <i className='fas fa-spin fa-spinner px-4'></i> </button>
         :
          <button type='submit' disabled={!isValid || isLoading} className='btn bg-main px-3 text-white ms-auto d-block'>Register</button>

        }
        
        </form>
        
    </div>
  </>
}
