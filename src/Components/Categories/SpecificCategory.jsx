import axios from 'axios';
import React from 'react'
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';

export default function SpecificCategory() {
  const {categoryId}= useParams()


function getSpecificCategory(){
  return axios.get("https://route-ecommerce.onrender.com/api/v1/categories/" + categoryId)
}

const {data , isLoading} = useQuery("category", getSpecificCategory)

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
    <div className='row my-5'>

      <div className="category d-flex align-items-center justify-content-around overflow-hidden px-2 py-3 cursor-pointer border border-1 rounded-2">
    
                    <img className='w-25' src={data?.data.data.image} alt="" />
                          
                  
                    <h1 className='text-main text-center py-3'>{data?.data.data.name}</h1>
                   
                 
    
      </div>
      </div>
    </>
    }
    </>
  )
}
