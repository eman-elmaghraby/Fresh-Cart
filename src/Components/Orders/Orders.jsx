import axios from 'axios';
import { jwtDecode } from 'jwt-decode'
import React, { useEffect, useState } from 'react'

function Orders() {
  const {id}= jwtDecode(localStorage.getItem('token'))
  const [orders, setOrders]= useState([])
  const[isLoading, setIsLoading]= useState(false)
  

  async function getAllOrders(){
    setIsLoading(true)
    const {data}= await axios.get("https://route-ecommerce.onrender.com/api/v1/orders/user/" + id)
    setOrders(data)
    setIsLoading(false)
  }

  useEffect(()=>{
    getAllOrders()
  },[])
  return (
    <>
    {isLoading ?
            <>
                <div className='d-flex align-items-center justify-content-center my-5 py-5'>
                    <i className='fas fa-spin fa-spinner fa-2x'></i>
                </div>
            </>
            :
    <>
      <h1 className='text-center my-5'>Your Orders</h1>
      {orders.map((order)=>{
        return <div key={order.id}>
          <div className='order shadow rounded p-4 my-5'>
<div className='d-flex align-items-center'>
<h2 className='fw-bolder h1'>#{order.id}</h2>
<h4 className='fw-bold text-primary mx-4'>Processing</h4>
</div>
<p>You have orderded {order.cartItems.length} items</p>
<div className='d-flex'>
  {order.cartItems.map((item)=>{
    return <img key={item.id} src={item.product.imageCover} style={{width:150}} className='img-thumnnail mx-1'/>
  })}
</div>
<hr/>
<p><strong>Total amount: </strong>{order.totalOrderPrice} EGP</p>
          </div>
        </div>
      })}
      </>}
    </>
  )
}

export default Orders