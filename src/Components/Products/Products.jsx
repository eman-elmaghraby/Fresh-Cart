import React from 'react';
import Product from './../Product/Product';
import  axios  from 'axios';
import { useQuery } from 'react-query';

export default function Products() {

  function getAllProducts() {
    return axios.get("https://route-ecommerce.onrender.com/api/v1/products")
  }

const {data, isLoading} = useQuery('products', getAllProducts)

return <>

{isLoading ?
            <>
                <div className='d-flex align-items-center justify-content-center my-5 py-5'>
                    <i className='fas fa-spin fa-spinner fa-2x'></i>
                </div>
            </>
            :
    <>
    <div className="row my-5">
      {data?.data.data.map((product, index)=>{
        return <div key={index} className="col-md-3">
          <Product product={product}/>
        </div>
      })}
    </div>
    </>
}
  </>
}
