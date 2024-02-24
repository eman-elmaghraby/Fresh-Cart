import React, { useEffect, useState } from 'react';
import Product from '../Product/Product';
import axios from 'axios';
import img1 from "../../Assets/images/1.jpg";
import img2 from "../../Assets/images/2.jpg";
import img3 from "../../Assets/images/grocery-banner.png";
import img4 from "../../Assets/images/grocery-banner-2.jpeg";
import Slider from "react-slick";
import CategoriesSlider from '../CategoriesSlider/CategoriesSlider';


export default function Home() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    
  };

  const [products, setProducts] = useState([])
  const [isLoading , setIsLoading ] = useState(false)

async function getAllProducts(){
  setIsLoading(true)
  const {data} = await axios.get("https://route-ecommerce.onrender.com/api/v1/products")
  setProducts(data.data)
  setIsLoading(false)
}

useEffect(() =>{
  getAllProducts()
},[])

  return <>

{isLoading ?
            <>
                <div className='d-flex align-items-center justify-content-center my-5 py-5'>
                    <i className='fas fa-spin fa-spinner fa-2x'></i>
                </div>
            </>
            :
    <>
    <header className='mt-4'>
<div className='row g-0'>
  <div className="col-md-10">
        <Slider arrows={false} {...settings}>
             <img  src={img3} className='w-100' />
             <img  src={img4} className='w-100' />
                  
        </Slider>
  </div>
  <div className='col-md-2'>
    <img src={img1} className='w-100'/>
    <img src={img2} className='w-100'/>
  </div>
</div>
    </header>

<div className='my-5'>
<CategoriesSlider/>
</div>

        <div className='row my-4'>
        {products.map((product) => {
          return <div key={product.id} className='col-md-3'>
              <Product product={product} />
          </div>
        })}
        </div>
      
    </>
}
  </>
}
