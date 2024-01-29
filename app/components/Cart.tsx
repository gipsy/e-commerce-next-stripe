"use client"

import Image from "next/image"
import { FaTrashAlt } from "react-icons/fa"
import useCartStore from "../cartStore"
import { CardElement, CartElement, useElements, useStripe } from "@stripe/react-stripe-js"
import axios from "axios"
import { createOrder } from "@/sanity/sanity-utils"
import { useUser } from "@clerk/nextjs"
import { useRouter } from "next/navigation"

const Cart = () => {
  const cart = useCartStore((state) => state.cart)
  const removeFromCart = useCartStore(state => state.removeFromCart)
  const totalItems = useCartStore(state => state.totalItems)
  const cartTotal = useCartStore(state => state.cartTotal)
  const { user } = useUser()
  const router = useRouter()

  // const handleRemoveFromCart = (productId) => {
  //   removeFromCart(productId)
  // }

  const stripe = useStripe()
  const elements = useElements()

  const onSubmit = async () => {
    const cardElement = elements?.getElement("card")

    try {
      if (!stripe || !cardElement) return

      const data = await axios.post('/api/stripe', {
        data: {amount: cartTotal}
      })

      console.log('data', data)
      const res = await stripe.confirmCardPayment(data.data.intent, {
        payment_method: {
          card: cardElement
        }
      })

      console.log('RES', res)
      const status = res?.paymentIntent?.status

      console.log('status', status)
      if (status ==='succeeded') {
        const email = user?.emailAddresses[0]?.emailAddress

        if (!email) return null
        const res = await createOrder({email, cart})
        if (res) {
          router.push('/order')
        }
      }
    } catch (error) {
      console.log(error)
      alert("payment failed")
    }
  }

  return (
    <div className="max-w-3xl mx-auto mt-20">
      <h1 className="text-center text-3xl font-semibold text-[#5B20B6] mb-6">Your Cart</h1>

      <table className="w-full border-collapse">
        <thead>
          <tr className="border border-gray-300">
            <th className="py-3 px-4">Product</th>
            <th className="py-3 px-4">Price</th>
            <th className="py-3 px-4">Qty</th>
            <th className="py-3 px-4">Remove</th>
          </tr>
        </thead>
        <tbody>
          {
            cart.map(product => (
              <tr key={product?._id} className="border border-gray-300 hover:bg-gray-50 text-center boder-b text-[#5B20B6]">
                <td className="py-3 px-4 flex items-center">
                  <Image className="mr-2" src={product?.image} width="50" height="30" alt={product?.name} />
                  {product?.name}
                </td>
                <td className="py-2 px-4">${product?.price}</td>
                <td className="py-2 px-4">{product?.qty}</td>
                <td className="py-2 px-4">
                  <FaTrashAlt 
                    className="text-2xl text-[#5B20B6] mx-auto cursor-pointer" 
                    onClick={() => removeFromCart(product?._id)}
                  />
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>  

      <div>
        <div className="space-x-4 mt-10">
          <span className="text-lg font-semibold text-[#5B20B6]">Total: ${cartTotal}</span>
        </div>

        <div className="mt-6 mb-6">
          <label className="text-lg mb-2 font-semibold text-[#5B20B6]">Payment Method</label>
          <CardElement className="border border-gray-200 rounded-md p-4" />
        </div>
        <div className="mt-6 max-w-sm mx-auto space-y-4">
          <button 
            onClick={onSubmit}
            className="bg-[#5B20B6] text-white text-lg font-semibold rounded-md px-6 py-3 w-full"
          >Checkout</button>
        </div>
      </div>
    </div>
  )
}
export default Cart