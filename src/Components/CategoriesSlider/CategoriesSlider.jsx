import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Slider from 'react-slick';


export default function CategoriesSlider() {

    const [categories, setCategories]= useState([])

    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 7,
        slidesToScroll: 7,
        
      };

      async function getAllCategories(){
        const {data} = await axios.get("https://route-ecommerce.onrender.com/api/v1/categories")
        setCategories(data.data)
      }

      useEffect(() =>{
        getAllCategories()
      },[])
    
  return (
    <>
    <Slider arrows={false} {...settings}>
           {categories.map((category, index) =>{
            return <div key={index}>
                <img src={category.image} className='w-100' style={{height:200}}/>
                <h5 className='text-center mt-3'>{category.name}</h5>
            </div>
           })}
                  
        </Slider>
      
    </>
  )
}
