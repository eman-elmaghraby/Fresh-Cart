import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import * as Yup from "yup"

function Address() {
    const [errorMsg, setErrorMsg]= useState("")
    const[isLoading, setIsLoading]= useState(false)
const {cartId}= useParams()

const validationSchema= Yup.object({
    details: Yup.string().required("Details is required"),
    city: Yup.string().required("City is required"),
    phone: Yup.string().required("Phone is required").matches(/^01[0125][0-9]{8}$/, "Enter valid Egyptian phone number")
})

async function onSubmit() {
    setErrorMsg("")
    try {
      setIsLoading(true)
      const {data} = await axios.post(`https://route-ecommerce.onrender.com/api/v1/orders/checkout-session/${cartId}`, {
        shippingAddress: values
      },{
        headers:{
            token: localStorage.getItem("token")
        },
        params: {
         url: "http://localhost:3000"
        }
      })
    window.open(data.session.url, "_self")
     } catch (error) {
      setErrorMsg(error.response.data.message)
     
     }
     setIsLoading(false)
}

const{values, handleSubmit, handleChange, handleBlur,errors, touched}= useFormik({
    initialValues:{
        details:"",
        city:"",
        phone:""
    },
    onSubmit,
    validationSchema
})


    return (<>
        {isLoading ?
            <>
                <div className='d-flex align-items-center justify-content-center my-5 py-5'>
                    <i className='fas fa-spin fa-spinner fa-2x'></i>
                </div>
            </>
            :
    <>

        <form onSubmit={handleSubmit} className='w-75 m-4 p-5'>
            <label htmlFor="details"  className='my-1'>Details:</label>
            <input type="text" onChange={handleChange} onBlur={handleBlur} value={values.details}  className='form-control mb-3' id='details' name='details' />
            {errors.details && touched.details && <p className='alert alert-danger'>{errors.details}</p>}

            <label htmlFor="phone" className='my-1'>Phone:</label>
            <input type="tel" onChange={handleChange} onBlur={handleBlur} value={values.phone} className='form-control mb-3' id='phone' name='phone' />
            {errors.phone && touched.phone && <p className='alert alert-danger'>{errors.phone}</p>}

            <label htmlFor="city" className='my-1'>City:</label>
            <input type="text" onChange={handleChange} onBlur={handleBlur} value={values.city} className='form-control mb-3' id='city' name='city' />
            {errors.city && touched.city && <p className='alert alert-danger'>{errors.city}</p>}

            <button type='submit' className='btn bg-main px-3 text-white ms-auto d-block '>Order</button>
        </form>
        </>}
    </>)
}

export default Address