import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import * as Yup from "yup"
import { useFormik } from 'formik';

export default function VerifyResetCode() {


  const [successMsg, setSuccessMsg]= useState("")
  const[isLoading, setIsLoading]= useState(false)
  const navigate= useNavigate()

  
  async function resetCode() {
    setIsLoading(true);
    const { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",values);
    setSuccessMsg(data.message);
    console.log(data);
    navigate("/changemypassword")
    setIsLoading(false);
  
 
  }

 
  const validationSchema = Yup.object({
    resetCode:Yup.string().required("Reset Cod is required")
  
  
  })
  
  const {values, handleSubmit, handleChange, handleBlur, errors, touched, isValid} = useFormik({
    initialValues: {
      resetCode:'',
    
    }, 
    onSubmit: resetCode, 
    validationSchema : validationSchema
  })
  






  return (
    <>
    <div className="w-75 m-auto my-5">
      <h1 className='text-center my-5'>Forget Password</h1>
     
      <form className='row form-control py-4' onSubmit={handleSubmit}> 
     
      <label htmlFor="email" className='my-3 inputs fw-bold'>Reset Code:</label>
      <input value={values.resetCode} onChange={handleChange} onBlur={handleBlur} type="email" className='form-control mb-3 inputs fw-bold' id='email' name='email' />
        {errors.resetCode && touched.resetCode && <p className='alert alert-danger inputs fw-bold'>{errors.resetCode}</p>}

{isLoading ? 
  <button disabled type='button' className='btn bg-main px-4 text-white ms-auto d-block'> <i className='fas fa-spin fa-spinner'></i> </button>
 :
  <button type='submit'  className='btn  bg-main mt-4 px-3 text-white ms-auto d-block'>Confirm</button>
 }
 

</form>

 </div>

 {/* <div className="w-75 m-auto my-5">
      <h1 className='text-center my-5'>Forget Password</h1>
   

      <div>
      <form className='row form-control py-4' onSubmit={handleSubmit}> 
      <div>
       <label htmlFor="email" className='my-3 inputs fw-bold'>Email:</label>
        <input value={values.resetCode} onChange={handleChange} onBlur={handleBlur} type="email" className='form-control mb-3 inputs fw-bold' id='email' name='email' />
        {errors.resetCode && touched.resetCode && <p className='alert alert-danger inputs fw-bold'>{errors.resetCode}</p>}
 
        {isLoading ? 
          <button disabled type='button' className='btn bg-main px-4 text-white ms-auto d-block'> <i className='fas fa-spin fa-spinner'></i> </button>
         :
          <button type='submit'  className='btn  bg-main px-3 text-white ms-auto d-block fw-bold'>Confirm</button>

        }
      
       </div>
    
        
       
        
        </form>
        </div>
     
      </div> */}
        

    </>
  )
}









