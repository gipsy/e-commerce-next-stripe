"use client"

import Image from 'next/image'
import { useState } from "react"
import useCartStore from "../cartStore"

const Details = ({product}: any) => {
  const addToCart = useCartStore((state) => state.addToCart)
  const [quantity, setQuantity] = useState(1)

  const handleAddToCart = () => {
    console.log('handleAddToCart', product, quantity)
    addToCart({product, quantity})
  }

  return (
    <div className="max-w-7xl mx-auto mt-20">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="shadow-md relative h-96 overflow-hidden aspect-ratio-1">
          <Image src={product?.image} alt={product?.name} layout="fill" objectFit="cover" />
        </div>
        <div className="">
          <div className="flex flex-col p-6 justify-between">
            <h1 className="text-[#5B20B6] text-3xl font-semibold">{ product?.name }</h1>
            <p className="text-lg mt-4 text-gray-500">{ product?.description }</p>

            <div className="mt-5">
              <span className="text-2xl font-semibold text-[#5B20B6]">${product?.price}</span>
            </div>

            <div className="mt-6 flex flex-col text-gray-500">
              <label htmlFor="">Qty</label>
              <input 
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                type="text" defaultValue={1} className="w-20 px-4 h-10 border border-gray-300 rounded-md" />
            </div>

            <div className="mt-6">
              <button 
                className="w-full h-10 bg-[#5B20B6] text-white font-semibold rounded-md px-6"
                onClick={handleAddToCart}
              >Add to Cart</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Details