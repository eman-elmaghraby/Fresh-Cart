import React, { useContext, useState } from 'react';
import logo from '../../Assets/images/freshcart-logo.svg'
import { Link, useNavigate } from 'react-router-dom';
import { authContext } from '../../contexts/AuthContext';
import { CartContext } from '../../contexts/CartContext';
import { WishListContext } from '../../contexts/WishContext';
import WishListItem from './../WishList/WishListItem';

export default function Navbar() {
  const [pathName, setPathName]= useState(window.location.pathname)
  const {userIsLoggedIn, setUserIsLoggedIn} = useContext(authContext)
  const{cart}= useContext(CartContext)
  const navigate = useNavigate()
  const { wishListItem } = useContext(WishListContext);

function logOut(){
  setUserIsLoggedIn(false)
  localStorage.removeItem("token")
navigate("/login")
}

  return <>
    <nav className="navbar navbar navbar-expand-lg position-fixed">
      <div className="container">
        <Link to={""} className="navbar-brand ">
          <img src={logo} alt="fresh cart logo" />
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
        { userIsLoggedIn && <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link  onClick={()=>{setPathName("/home")}} className={pathName=="/home"?"active rounded-3 nav-link text-white fw-bold":" nav-link text-white fw-bold"} aria-current="page" to={""} >Home</Link>
            </li>
        
            <li className="nav-item">
              <Link to={"products"} onClick={()=>{setPathName("/products")}} className={pathName=="/products"?"active rounded-3 nav-link text-white fw-bold":" nav-link text-white fw-bold"}>Products</Link>
            </li>
            <li className="nav-item">
              <Link to={"categories"} onClick={()=>{setPathName("/categories")}} className={pathName=="/categories"?"active rounded-3 nav-link text-white fw-bold":" nav-link text-white fw-bold"}>Categories</Link>
            </li>
            <li className="nav-item">
              <Link to={"brands"} onClick={()=>{setPathName("/brands")}} className={pathName=="/brands"?"active rounded-3 nav-link text-white fw-bold":" nav-link text-white fw-bold"}>Brands</Link>
            </li>

            <li className="nav-item">
              <Link to={"allorders"} onClick={()=>{setPathName("/allorders")}} className={pathName=="/allorders"?"active rounded-3 nav-link text-white fw-bold":" nav-link text-white fw-bold"}>Orders</Link>
            </li>
          </ul>}

          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
           
           {userIsLoggedIn &&
            <li className="nav-item d-flex align-items-center">
            <i class="fa-solid fa-heart fa-xl position-relative mx-2 text-main">
            <Link to={"wishist"} onClick={()=>{setPathName("/wishist")}} >
            <span className='position-absolute top-0 start-50 text-white  font-sm translate-middle'>{wishListItem ? wishListItem.count || 0 : 0}</span>
            </Link>
            </i>
            <i className='fa-solid fa-cart-shopping fa-xl position-relative mx-2 text-main'>
            <Link to={"cart"} onClick={()=>{setPathName("/cart")}} >
            <span className='position-absolute top-0 start-50 text-white  font-sm translate-middle'>{cart?.numOfCartItems || 0}</span>
            </Link>
             </i>
           
            </li>
            }
            
            
           
            {userIsLoggedIn ? 
              <li className="nav-item">
              <span onClick={logOut} className="nav-link cursor-pointer fw-bold text-white">Logout</span>
            </li>
            :
            <>
            <li className="nav-item">
                <Link to={"login"} onClick={()=>{setPathName("/login")}} className={pathName=="/login"?"active rounded-3 nav-link text-white fw-bold":" nav-link text-white fw-bold"} >Login</Link>
              </li>
              <li className="nav-item">
                <Link to={"register"} onClick={()=>{setPathName("/register")}} className={pathName=="/register"?"active rounded-3 nav-link text-white fw-bold":" nav-link text-white fw-bold"}>Register</Link>
              </li>
              </>
            }
              
            
           
          </ul>
        </div>
      </div>
    </nav>
  </>
}
