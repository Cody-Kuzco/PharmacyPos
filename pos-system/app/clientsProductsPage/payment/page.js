import { fetchProducts } from '@/app/api/fetchProduct/route'
import Payment from '@/components/Payment'
import React from 'react'
const page = async () => {
  
  // const products = await fetchProducts();
 
  return (
    <div>
     <Payment/>
    </div>
  )
}

export default page
