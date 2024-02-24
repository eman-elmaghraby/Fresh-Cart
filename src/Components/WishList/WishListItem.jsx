import axios from 'axios'
import React, { useContext } from 'react'
import { Link, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { CartContext } from '../../contexts/CartContext'
import { WishListContext } from '../../contexts/WishContext'

export default function WishListItem({item, removeWishListItem}) {
    const{setCart}= useContext(CartContext)
    const {wishListItem , setWishListItem}= useContext(WishListContext)

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
        setWishListItem(data)
    }





    

  return (
    <>
      

      <div className="product overflow-hidden px-2 py-3 cursor-pointer position-relative">
             <button  onClick={() => {removeWishListItem(item.id)}} className='btn position-absolute top-0 end-0 mt-4 me-1'>
                <i class="fa-solid fa-heart-crack fa-2xl position-relative mx-2 text-main"></i>
                </button>
                <Link to={"/productdetails/"+ item.id} className='a '>
                    <img className='w-100' src={item.imageCover} alt="" />
                    <h5 className='font-sm text-main my-3'>{item.category.name}</h5>
                    <h4 className='text-white'>{item.title.split(" ").slice(0, 2).join(" ")}</h4>
                    <p className='d-flex  justify-content-between'>
                        <span >{item.price} EGP</span>
                        <span>
                            <i className='fas fa-star rating-color me-1'></i>
                            {item.ratingsAverage}
                        </span>
                    </p>
                </Link>
                <button onClick={() => {addProductToCart(item.id)}} className='btn bg-main text-white w-100 '>+Add To Cart</button>
            </div>

    </>
  )
}
