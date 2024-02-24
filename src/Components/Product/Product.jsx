import axios from 'axios'
import React, { useContext, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { CartContext } from '../../contexts/CartContext'
import { WishListContext } from '../../contexts/WishContext'
import Swal from 'sweetalert2'



function Product({ product }) {
const {id} =useParams()
const{setCart}= useContext(CartContext)
const {wishListItem , setWishListItem}= useContext(WishListContext)
const [addItemToWishList, setAddItemToWishList] = useState(true)

async function addProductToCart(productId){
    const {data} = await axios.post("https://route-ecommerce.onrender.com/api/v1/cart" , {
        productId
    },
    {
        headers: {
            token: localStorage.getItem("token")
        }
    })
    toast(data.message,{
        className:"bg-info !important"
    })
    setCart(data)
}


async function addToWishList(productId){

    const {data} = await axios.post("https://route-ecommerce.onrender.com/api/v1/wishlist" , {
        productId
    },
    {
        headers: {
            token: localStorage.getItem("token")
        }
    })
    toast(data.message,{
        className:"bg-info !important"
    })
    
    setCart(data)
    setWishListItem(data)
    setAddItemToWishList(false)
    
}



function removeWishListItem(productId){
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
        const {data}= await axios.delete("https://route-ecommerce.onrender.com/api/v1/wishlist/" + productId, {
          headers: {
            token: localStorage.getItem("token")
          }
         })
        
         setCart(data)
        setWishListItem(data)
        setAddItemToWishList(true)
        Swal.fire({
          title: "Deleted!",
          text: "Your product has been deleted.",
          icon: "success"
        });
      }
    });
  }
  

    return (
       
            <div className="product overflow-hidden px-2 py-3 cursor-pointer position-relative">
            {addItemToWishList ? 
                <button  onClick={() => {addToWishList(product.id)}} className='btn position-absolute top-0 end-0 mt-4 me-1'>
                <i class="fa-solid fa-heart fa-2xl position-relative mx-2 text-main"></i>
                </button>
                
                :
                <button  onClick={() => {removeWishListItem(product.id)}} className='btn position-absolute top-0 end-0 mt-4 me-1'>
                <i class="fa-solid fa-heart-crack fa-2xl position-relative mx-2 text-main"></i>
                </button>
               
                }
                <Link to={"/productdetails/"+ product.id} className='a '>
                    <img className='w-100' src={product.imageCover} alt="" />
                    <h5 className='font-sm text-main my-3'>{product.category.name}</h5>
                    <h4 className='text-white'>{product.title.split(" ").slice(0, 2).join(" ")}</h4>
                    <p className='d-flex  justify-content-between'>
                        <span >{product.price} EGP</span>
                        <span>
                            <i className='fas fa-star rating-color me-1'></i>
                            {product.ratingsAverage}
                        </span>
                    </p>
                </Link>
                <button onClick={() => {addProductToCart(product.id)}} className='btn bg-main text-white w-100 '>+Add To Cart</button>
            </div>
       
    )
}

export default Product