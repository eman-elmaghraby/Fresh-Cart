import axios from 'axios';
import React from 'react';
import { useQuery } from 'react-query';
import { Link} from 'react-router-dom';

export default function Brands() {


  function getAllBrands() {
    return axios.get("https://route-ecommerce.onrender.com/api/v1/brands")
  }

const {data, isLoading} = useQuery('categoties', getAllBrands)
  return <>
   {isLoading ?
            <>
                <div className='d-flex align-items-center justify-content-center my-5 py-5'>
                    <i className='fas fa-spin fa-spinner fa-2x'></i>
                </div>
            </>
            :
    <>
    <div className="row my-5 g-4">
      {data?.data.data.map((brand)=>{
        return <div key={brand._id} className="col-md-3">
        <div className="category overflow-hidden px-2 py-3 cursor-pointer border border-1 rounded-2">
                <Link to={"/specificbrand/" + brand._id} className='a'>
                    <img className='w-100' src={brand.image} style={{height:200}} alt="" />
                    <h5 className='font-sm text-main text-center py-3'>{brand.name}</h5>
                  
                </Link>
                </div>
        </div>
      })}
    </div>
    </>
}

  </>
}
