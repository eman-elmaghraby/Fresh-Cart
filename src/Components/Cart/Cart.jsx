import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import CartProducts from '../CartProducts/CartProducts';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import { CartContext } from '../../contexts/CartContext';


export default function Cart() {
const [cart , setCart] = useState({})
const[isLoading, setIsloading]= useState(false)
const [timeOutId, setTimeOutId]= useState()
const[cartId, setCartId]= useState()
const{setCart : contextSetCart}= useContext(CartContext)

async function getLoggedInCart(){
 try {
  setIsloading(true)
  const {data} = await axios.get("https://route-ecommerce.onrender.com/api/v1/cart", {
    headers: {
      token: localStorage.getItem("token")
    }
  })
 
 setCart(data);
 setCartId(data.data._id);
 
 } catch (error) {
  console.log(error);
 }
 setIsloading(false)
}

 function removeProductFromCart(productId){
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!"
  }).then(async(result) => {
    if (result.isConfirmed) {
      const {data}= await axios.delete("https://route-ecommerce.onrender.com/api/v1/cart/" + productId, {
        headers: {
          token: localStorage.getItem("token")
        }
       })
       setCart(data)
       contextSetCart(data)
      Swal.fire({
        title: "Deleted!",
        text: "Your product has been deleted.",
        icon: "success"
      });
    }
  });
}

 function clearCart(){
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!"
  }).then(async(result) => {
    if (result.isConfirmed) {
      const {data}= await axios.delete("https://route-ecommerce.onrender.com/api/v1/cart/", {
        headers: {
          token: localStorage.getItem("token")
        }
       })
       setCart(data)
       contextSetCart({})
      Swal.fire({
        title: "Deleted!",
        text: "Your products has been deleted.",
        icon: "success"
      });
    }
  });
 
 }
 

useEffect(() => {
getLoggedInCart()
}, [])


 function updateProductCount(productId, count){
clearTimeout(timeOutId)
  
setTimeOutId(
  setTimeout(async ()=> {
    if(count == 0){
      removeProductFromCart(productId)
    }else{
      const {data} = await axios.put("https://route-ecommerce.onrender.com/api/v1/cart/" + productId, {
        count
      },{
        headers:{
          token: localStorage.getItem("token")
        }
      })
      setCart(data)
    }
  },500)
)
}

return <>

{isLoading ?
            <>
                <div className='d-flex align-items-center justify-content-center my-5 py-5'>
                    <i className='fas fa-spin fa-spinner fa-2x'></i>
                </div>
            </>
            :
    <>

{cart.data?.products.length > 0 ?
  <div className='my-5'>
      <button onClick={clearCart} className='btn btn-outline-danger d-block ms-auto'>Clear Cart</button>

      {cart.data?.products.map((cartProduct, index)=>{
        return <CartProducts key={index} updateProductCount={updateProductCount} removeProductFromCart={removeProductFromCart} cartProduct={cartProduct}/>
      })}

      <div className='d-flex justify-content-between'>
        <Link to={'/adress/' + cartId} className='btn bg-main text-white'>CheckOut</Link>
        <p>Total cart Price: {cart.data.totalCartPrice} EGP</p>
      </div>
</div>
   :   
   
   <h2 className='alert alert-warning text-center my-5'>No products in your cart</h2>

  }



</>

}
</>
}
