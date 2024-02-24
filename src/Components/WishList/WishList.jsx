import axios from 'axios'
import React, { useContext } from 'react'
import { useQuery } from 'react-query'
import WishListItem from './WishListItem'
import { WishListContext } from '../../contexts/WishContext'
import Swal from 'sweetalert2'
import { CartContext } from '../../contexts/CartContext'

export default function WishList() {
  const {wishListItem , setWishListItem}= useContext(WishListContext)
  const{setCart}= useContext(CartContext)

function getAllWishList(){
  return axios.get("https://route-ecommerce.onrender.com/api/v1/wishlist",{
    headers:{
      token: localStorage.getItem("token")
    }
  })
  setWishListItem(data)
}
const {data, isLoading} = useQuery("Wishlist", getAllWishList)
console.log(data);


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
      Swal.fire({
        title: "Deleted!",
        text: "Your product has been deleted.",
        icon: "success"
      });
    }
  });
}



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
    <div className="row my-5">
      {data?.data.data.map((item, index)=>{
        return <div key={index} className="col-md-3">
          <WishListItem item={item} removeWishListItem={removeWishListItem}/>
        </div>
      })}
    </div>
    </>
}
      
    </>
  )
}
